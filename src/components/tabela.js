import React, { memo, useState, useMemo } from 'react'
import '../css/tabela.css';
import { useRowSelect, useTable, useSortBy, useGlobalFilter } from 'react-table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';
//
import {format, parseISO } from 'date-fns';

import { useDebounce } from 'react-use';
import { Stack, TextField, Paper, CircularProgress } from '@mui/material';

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
        },
        ...cabe.map((ele,idx)=> ({
        Header: ele,
        accessor: idx.toString(),
        Cell: ({ value, row })=>{
            // Se for o campo data e ele ser esta coluna
            if(opt?.data && opt.data?.includes(idx) ){
                return format(parseISO(value), 'dd/MM/yyyy')
            }
            // Se o indice for monetario
            if(opt?.monetario && opt?.monetario.includes(idx)){
                return converter(value);
            }
            // Se a formatacao for data/hora pode aplicar
            if(opt?.dataHora && opt?.dataHora.includes(idx)){
                return format(parseISO(value), 'dd/MM/yyyy HH:mm')
            }
            /** Veja se opt tem envolver, se sim executa a funcao de callback passando value */
            if(opt?.envolver && opt.envolver?.hasOwnProperty(idx) ){
                return opt.envolver[idx](value, row.id, row);
            }
            // Senao so retorna o valor
            return value;
            }
        }))
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
        return reg;
    });
}

// Componente para exibir o filtro
const Filtro = memo(({ filtro, setFiltro })=>{
    const [ aguardar, setAguardar ] = useState(false);
    // Cria um estado para determinar quando o usuario deixou de digitar
    const [valor, setValor ] = useState(filtro);
    // Utiliza o useDebounce para determinar que depois de 500ms podemos aplicar o filtro
    const [ , ] = useDebounce(
        ()=>{
            // Valor pode ser atualizado
            setFiltro(valor);
            setAguardar(false);

        }, 500, [valor]
    )

    return (
        <Stack direction='row-reverse'>
            <TextField size='small'
                label='Filtro' type="search"
                value={valor} sx={{mb: .5}}
                onChange={e=> {
                    setValor(e.target.value);
                    setAguardar(true);
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
    )
});

const Tabela = ({ cabe, corpo, optTabela }) => {
  const columns = useMemo(()=> formatarCabe(cabe, optTabela), [ optTabela, cabe ]);
  const data = useMemo(()=> formatarCorpo(corpo), [corpo]);
  const trSelecionado = optTabela?.trSelecionado;
  
  // Criando os dados para a tabela
  const instance = useTable({
      columns,
      data,
      initialState: { hiddenColumns: ['id'], selectedRowIds: trSelecionado ? { [trSelecionado] : true } : {} }
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
      prepareRow,
      toggleAllRowsSelected,
      rows,
      state,
      setGlobalFilter
  } = instance;
  
  return (
    <>
          <Filtro 
            filtro={state.globalFilter}
            setFiltro={setGlobalFilter}

          />
    <div id="tabela">
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column=>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <Paper sx={{borderRadius: 0, color: theme=> theme.palette.primary.contrastText, backgroundColor: theme=> theme.palette.primary.main, m: 0, p: 1}} elevation={2}>
                                        <Stack alignItems='center' direction='row' justifyContent='center'>
                                            {column.render('Header')}
                                            {column.isSorted ? (column.isSortedDesc ? <KeyboardArrowDownIcon />: <KeyboardArrowUpIcon />) : <UnfoldMoreIcon />}
                                        </Stack>
                                    </Paper>
                                </th>
                            ))}
                            
                        </tr>

                    ))
                }
                
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row=>{
                        prepareRow(row);
                                                
                        return (
                            <tr style={row.isSelected ? {'backgroundColor': '#012258', 'color': 'white'} : {}} onClick={()=> {
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
        </table>
    </div>
    </>
  )
}


export default Tabela