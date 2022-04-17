import React, { memo, useState, useMemo, useEffect, useCallback } from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';
import '../css/tabela.css';
import { useRowSelect, useTable, useSortBy, useGlobalFilter } from 'react-table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';
import TableViewIcon from '@mui/icons-material/TableView';

//
import {format, parseISO } from 'date-fns';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useDebounce } from 'react-use';
import { Badge, Menu, IconButton, Stack, TextField, Paper, CircularProgress, Typography, Checkbox, FormControlLabel } from '@mui/material';

// FUncao para converter para numero de telefone
function converterTelefone(valor){
    // Se o valor for menor que 8 nao faca nada
    if(valor.length < 8) return valor;
    // Pegue os 5 primeiros digitos e depois os 4 ultimos e concatene com '-'
    if(valor.length === 8){
        return `${valor.substring(0, 4)}-${valor.substring(4)}`;
    }
    // Celular tradicional
    return `${valor.substring(0, 5)}-${valor.substring(5, 9)}`;
    
}

// Funcao para converter valores monetarios
function  converter(valor){
    const valorReverso = parseFloat(valor).toFixed(2).toString().replace('.',',').split("").reverse(); // Reverte a string
    let recebeConvertido = '';
    let x = 0;// Contado a cada 3 vai incluir ponto
    for(let i =0;i< valorReverso.length;i++){
        // Se o x for inferior a 4 entao vamos incrementar x e colocar o caractere
        if(x < 4){
            x += 1
            recebeConvertido += valorReverso[i];
        } else if(x % 3 === 0){ // X nao tem resto na divisao por tres, entao incluiremos o ponto e incrementamos x
            recebeConvertido += '.' + valorReverso[i];
            x += 1
        // X já e maior que 4 e nao e divisivel por 3, entao vamos incrementar x e adicionar o caractere a d
        } else {
            recebeConvertido += valorReverso[i];
            x += 1
        }
    }
    //# Reverte novamente a string para o formato de ordem original
    let valor2 = recebeConvertido.split("").reverse();
    if(valor2[0] === '.'){valor2[0] = '';}
    else if(valor2[0] === '-' && valor2[1] === '.'){ valor2[1] = '';}

    valor2 = 'R$ '+valor2.join("");
    return valor2;

};
// Funcao que recebe o cabecalho e formata ele para o padrao esperado pelo react-table
function formatarCabe(cabe, opt){
    
    return [
        {
            Header: 'ID',
            accessor: 'id',
            disableGlobalFilter: true,
        },
        ...cabe.map((ele,idx)=> ({
        Header: ele,
        accessor: idx.toString(),
        
        Cell: ({ value, row })=>{
            // E o valor padrao quando nao se tem dados
            if(value === '--') return value;

            // Se for o campo data e ele ser esta coluna
            if(opt?.data && opt.data?.includes(idx) && value?.length > 7 ){
                return format(parseISO(value), 'dd/MM/yyyy')
            }
            // Se for o campo dataCustom entao eu devo customizar  com a datastring enviada
            if(opt?.dataCustom && Object.keys(opt.dataCustom).includes( idx.toString() ) ){
                return format(parseISO(value), opt.dataCustom[idx] );
            }
            // Se o indice for monetario
            if(opt?.monetario && opt?.monetario.includes(idx)){
                return converter(value);
            }
            // Se a formatacao for data/hora pode aplicar
            if(opt?.dataHora && opt?.dataHora.includes(idx) && value?.length > 8){
                return format(parseISO(value), 'dd/MM/yyyy HH:mm')
            }
            /** Veja se opt tem envolver, se sim executa a funcao de callback passando value */
            if(opt?.envolver && opt.envolver?.hasOwnProperty(idx) ){
                return opt.envolver[idx](value, row.id, row);
            }
            // Veja se o campo e um telefone e converta-o
            if(opt?.telefone && opt.telefone.includes(idx) ){
                return converterTelefone(value);
            }
            // Senao so retorna o valor
            return value;
        },
        Footer: ({rows, column})=>{
            
            // // E o campo monetario vamos somar a coluna e retornar o valor
            if(opt?.monetario && opt.monetario.includes(idx)){
                const valor = _.sum(_.map(rows, r=> r.values[idx] ));        
                 return converter(valor);
            }
            // Se o indice da soma for acionado
            if(opt?.soma && opt.soma.includes(idx)){
                const valor = _.sum(_.map(rows, r=> r.values[idx] ));        
                return valor;
            }
            // // Nao precisa de calculo retorne o valor da coluna
            return column.Header;
            
            
        } 
        
        })
        )
    ]
}
// Funcao para formatar o corpo
function formatarCorpo(corpo){

    return corpo.map((row, idR)=>{
        // Se for um row.id pegamos o valor dele, senao criamos um indice
        const reg = row?.id ? {'id': row.id } : {'id': (idR + 1).toString()};
        // Se for um array pegamos o campo data senao a row
        /**
         * Se for um objeto com {data, id} entao pega o valor de data
         * Caso row nao seja um array pegue os valor dos objetos envolvidos
         * Por fim so pode ser um array recupere-o
         */
        const linha = row?.data && Array.isArray(row.data) ? row.data : !Array.isArray(row) ? Object.keys(row).map(key=> row[key] ) : row;
        
        linha.forEach((cell,idx)=>{
            reg[idx] = cell;
        });
        // Se o valor da linha for '--' entao devemos atribuir o id '--'
        if(linha[0] === '--') reg['id'] = '--';

        return reg;
    });
}

// Componente para exibir o filtro
const Filtro = memo(({ desativarPesquisaLenta, totalRegistros, filtro, setFiltro })=>{
   
    const [ aguardar, setAguardar ] = useState(false);
    // Cria um estado para determinar quando o usuario deixou de digitar
    const [valor, setValor ] = useState(filtro);
    // Utiliza o useDebounce para determinar que depois de 500ms podemos aplicar o filtro
    const [ , ] = useDebounce(
        ()=>{
            // Valor pode ser atualizado
            setFiltro(valor);
            setAguardar(false);

        }, desativarPesquisaLenta ? 1 : 500, [valor]
    );

    return (
        <Stack direction='row-reverse'>       
            <Stack direction='row' alignItems='center'>
                <Typography sx={{mx: 1}} variant='body2' fontWeight='bold'>
                    {`Total: ${totalRegistros}`}
                </Typography>
                <TextField size='small'
                    placeholder='Digite o que procura...'
                    label='Filtro' type="search"
                    value={valor} sx={{mb: .5}}
                    onChange={e=> {
                        setValor(e.target.value);
                        !desativarPesquisaLenta && setAguardar(true);
                    }}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        startAdornment: aguardar ? <CircularProgress sx={{mr: 1}} size={20} /> : <SearchIcon color='primary' />
                    }}
                />
            </Stack>

        </Stack>
    )
});

const Tabela = (props) => {
  // Extraindo propriedades a serem usadas
  const { telefone, soma, dataCustom, ocultarFiltro, ocultarColuna, styleCabe, styleRodape, style, styleCorpo, sxCabecalho, calcularRodape, data, monetario, envolver, tamanho, render, cabe, corpo, styleTrSelecionado } = props;
  const [ buscaColuna, setBuscaColuna ] = useState('');
  const [pagina, setPagina] = useState(1);

  const columns = useMemo(()=> formatarCabe(cabe, { telefone, dataCustom, soma, data, monetario, envolver }), [ telefone, dataCustom, soma, data, monetario, envolver, cabe ]);
  const registros = useMemo(()=> formatarCorpo(corpo.length > 0 ? corpo : [ cabe.map(ele=> '--') ] ), [corpo, cabe]);
  // Verifica se o corpo esta sofrendo atualizacao
  useEffect(()=>{
    // Se o corpo esta sendo atualizado devolva a pagina para 1
    setPagina(1);
  }, [setPagina, corpo]);

  // Para menu de exibicao para ocultar campos das tabelas
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fnExibir = useCallback( (e) => setAnchorEl(e.currentTarget), []);
  const fnFechar = useCallback( () => setAnchorEl(null) , []);
  // Funcao de callback usada para alterar a visualizacao da coluna
  const fnOcultarColuna = useCallback( (e, onChange)=>{ onChange(e); }, []);
      
  // Criando os dados para a tabela
  const instance = useTable({
      columns,
      data: registros,
      initialState: { hiddenColumns: ['id']  }
  }, 
      useGlobalFilter,
      useSortBy,
      useRowSelect,
  );
  // Extraindo da instancias as props usadas para a tabela
  const { 
      getTableProps,
      getTableBodyProps,
      headerGroups,
      allColumns,
      footerGroups,
      prepareRow,
      toggleAllRowsSelected,
      rows,
      state : { hiddenColumns, globalFilter },
      selectedFlatRows,
      setGlobalFilter
  } = instance;
  
  // Se a quantidade de registros for menor que 101 nao
  //
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    //loading: aguardar,
    // Somente ativa o observer do scroll se rows for maior que  100
    hasNextPage: (rows.length > 100 && pagina && !globalFilter),
    onLoadMore: ()=> {
        setPagina(state=> state + 1);
    },
    delayInMs: 600, 
    //disabled: aguardar,       
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });
  
  // Fatiamento dos registros (PONTO QUE PRECISA DE MELHORIA)
  const fatiaRegistros = useMemo(()=> (pagina === null) || globalFilter ? rows : rows.slice(0, pagina * 100), [rows, pagina, globalFilter] );
      
  // o useEffect para ver se a quantidade de registros fatiados e igual a quantidade normal
//   useEffect(()=>{
//       // Se tiver atingido o limite de registros defina o pagina como null pois não devemos pedir mais registros a tabela
//       if( !globalFilter && fatiaRegistros.length >= rows.length ) setPagina(null);
//       //
      
//   }, [corpo, pagina, fatiaRegistros, rows, globalFilter]);
  
  // veja se tem rowID selecionado
  let trSelecionado, trSelecionadoDados;
  if(selectedFlatRows?.length > 0){
      trSelecionado = selectedFlatRows[0].values['id'] === '--' ? null : selectedFlatRows[0].values['id'];
      trSelecionadoDados = Object.keys(selectedFlatRows[0].values).map(key=> selectedFlatRows[0].values[key]);
  }
  // Conta a quantidade de colunas ocultas
  const qtdColunaOculta = useMemo(()=> hiddenColumns.filter(ele=> ele !== 'id').length, [hiddenColumns ] );
      
  return (
    <>
    <Stack direction='row' justifyContent='space-between' alignItems='flex-end'>
        {render ? render({ trSelecionadoDados, trSelecionado }) : <span />}
        <Stack direction='row'>
        {ocultarColuna && (
                <Menu 
                    anchorEl={anchorEl} 
                    open={Boolean(anchorEl)}
                    onClose={fnFechar}>
                        <Stack spacing={1} sx={{px: 1, overflowY: 'auto', maxHeight: '60vh'}}>
                        <TextField 
                            variant='standard' 
                            label='Procurar'
                            placeholder='Digite o nome da coluna...'
                            InputLabelProps={{shrink: true }}
                            sx={{px: .5}} size='small' 
                            defaultValue={buscaColuna} 
                            onChange={e=> setBuscaColuna(e.target.value.toLowerCase() )} type="search" 
                        />                    
                    {allColumns?.map((column)=>{
                        if(buscaColuna.length > 0 && column.Header.toLowerCase().search(buscaColuna) === -1) return null;
                        const { checked, onChange } = column.getToggleHiddenProps();
                        return (
                        <FormControlLabel key={column.Header} control={
                            <Checkbox inputProps={{ 'aria-label': 'controlled' }} 
                                checked={checked} 
                                onChange={e=> fnOcultarColuna(e, onChange)} 
                                />} 
                                label={column.Header} 
                            />
                        )
                        })}
                        </Stack>
                </Menu>
            )}
            {ocultarColuna && (
                    <IconButton onClick={fnExibir}  title={qtdColunaOculta > 0 ? `Você ocultou ${qtdColunaOculta} colunas` : 'Oculte algumas colunas que não esta utilizando'}>
                        <Badge variant='dot' color='error' badgeContent={qtdColunaOculta}>
                            <TableViewIcon color='primary' />
                        </Badge>
                        
                    </IconButton>
                )}
            {ocultarFiltro ? <div /> : <Filtro 
                desativarPesquisaLenta={corpo.length < 500}
                filtro={globalFilter}
                setFiltro={setGlobalFilter}
                totalRegistros={rows?.length}
            />}
        </Stack>
    </Stack>
    <div style={{maxHeight: tamanho}} ref={rootRef} id="tabela">
        <table style={style} {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup=>(
                        <tr style={styleCabe} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column=>(                                
                                <ThCabe 
                                    key={column.getHeaderProps().key}
                                    column={column}
                                    sxCabecalho={sxCabecalho}
                                    isSorted={column.isSorted}
                                    isSortedDesc={column.isSortedDesc}                                
                                />
                                
                            ))}
                            
                        </tr>

                    ))
                }
                
            </thead>
            <tbody style={styleCorpo} {...getTableBodyProps()}>
                {/* Casos onde nao temos nenhum registro a ser exibido */}
                {fatiaRegistros.length === 0 && cabe.map((ele,idx)=> <td key={idx}> -- </td>)}
                {
                    fatiaRegistros.map(row=>{
                        prepareRow(row);
                                                
                        return (
                            <tr style={row.isSelected ? styleTrSelecionado : {}} onClick={()=> {
                                    toggleAllRowsSelected(false);
                                    row.toggleRowSelected(!row.isSelected);
                            }} {...row.getRowProps()}>
                                {
                                row.cells.map(cell=>{
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })
                            }
                            </tr>
                        )
                    })
                }
            </tbody>
            {calcularRodape && (
            <tfoot style={styleRodape}>
                {footerGroups.map(footerGroup=>(
                    <tr {...footerGroup.getHeaderGroupProps()}>
                        {footerGroup.headers.map(column=>(
                            <th {...column.getHeaderProps()}>
                            <Paper sx={sxCabecalho} elevation={2}>
                                <Stack sx={{pl: .5}} alignItems='center' direction='row' justifyContent='flex-start'>
                                    {column.render('Footer')}
                                </Stack>
                            </Paper>
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
            )}
            
        </table>
        {/* Isto previne que o loading fique aparecendo mesmo em registros menores que 100 */}
        { pagina && corpo.length > 100 && (
        <Stack ref={sentryRef} direction='row' justifyContent='center'>
            <CircularProgress size={20}  />             
        </Stack>                        
        )}
    </div>
    </>
  )
}
// Componente do cabecalho
const ThCabe  = memo( ({ column, isSorted, isSortedDesc, sxCabecalho })=>(
    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
        <Paper sx={sxCabecalho} elevation={2}>
            <Stack alignItems='center' direction='row' justifyContent='center'>
                {isSorted ? (isSortedDesc ? <KeyboardArrowDownIcon />: <KeyboardArrowUpIcon />) : <UnfoldMoreIcon />}
                {column.render('Header')}
            </Stack>
        </Paper>
    </th>
) );
//
Tabela.propTypes = {
    /** Objeto que representa parametros como passados para a props sx em componentes Mui (pois o cabecalho é um Paper) */
    sxCabecalho: PropTypes.object,
    /** Funcao que irá disponibilizar uma props com trSelecionado e trSelecionadoDados e retornará um componente */
    render: PropTypes.func,
    /** Recebe o tamanho da tabela em numero (600) ou string ('650px' ou '65vh') */
    tamanho: PropTypes.oneOfType([PropTypes.number, PropTypes.string ]),
    /** Objeto que é um array de Strings que compoem o cabecalho da tabela */
    cabe: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Um array com outro array dentro ou um objeto {id: idx, data: Array} */
    corpo: PropTypes.array.isRequired,
    /** Um array de numeros que representam os indices das colunas que devem ser formatadas para data */
    data: PropTypes.arrayOf(PropTypes.number),
    /** Um objeto que determina o indice e a formatacao de data que deve ser aplicada */
    dataCustom: PropTypes.object,
    /** Um array de numeros que representam os indices das colunas que devem ser formatadas para monetario */
    monetario: PropTypes.arrayOf(PropTypes.number),
    /** Um array de numeros que representa os indices das colunas que devem ter o seu valor de soma aplicado */
    soma: PropTypes.arrayOf(PropTypes.number),
    /** Um objeto numeros que são os indices das colunas que receberam um componente internamente executando a função passada como valor desta chave {1: ()=> {} } */
    envolver: PropTypes.objectOf(PropTypes.number),
    /** Um objeto que determina um estilo a ser aplicado ao registro selecionado ex: {backgroundColor: '#b71c1c', 'color': 'white'} */
    styleTrSelecionado: PropTypes.object,
    /** Um objeto que determina um estilo a ser aplicado ao corpo da tabela */
    styleCorpo: PropTypes.object,
    /** Um objeto que determina um estilo a ser aplicado a toda a tabela */
    style: PropTypes.object,
    /** Um objeto que determina um estilo a ser aplicado o cabecalho da tabela */
    styleCabe: PropTypes.object,
    /** Um objeto que determina um estilo a ser aplicado no rodape da tabela */
    styleRodape: PropTypes.object,
    /** Um boleano que determina se devemos exibir o rodape da tabela ou nao */
    calcularRodape: PropTypes.bool.isRequired,
    /** Um boleano que determina se vamos disponibilizar a opcao para ocultar colunas */
    ocultarColuna: PropTypes.bool,
}
//
Tabela.defaultProps = {
    style: {},
    ocultarColuna: false,
    styleCabe: {},
    styleCorpo: {},
    styleRodape: {},
    sxCabecalho: {borderRadius: 0, color: theme=> theme.palette.primary.contrastText, backgroundColor: theme=> theme.palette.primary.main, m: 0, p: 1},
    tamanho: '60vh',
    calcularRodape: false,
    styleTrSelecionado: {'backgroundColor': '', 'color': ''}
}

export default memo(Tabela)