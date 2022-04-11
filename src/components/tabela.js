import React, { memo, useState, useMemo } from 'react'
import '../css/tabela.css';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SearchIcon from '@mui/icons-material/Search';

import { useDebounce } from 'react-use';
import { Stack, TextField, Paper, CircularProgress } from '@mui/material';

// Componente para exibir o filtro
const Filtro = memo(({ filtro, setFiltro })=>{
    const [ aguardar, setAguardar ] = useState(false);
    // Cria um estado para determinar quando o usuario deixou de digitar
    const [valor, setValor ] = useState(filtro);
    // Utiliza o useDebounce para determinar que depois de 500ms podemos aplicar o filtro
    const [, cancel] = useDebounce(
        ()=>{
            // Valor pode ser atualizado
            setFiltro(valor);
            setAguardar(false);

        }, 400, [valor]
    )

    return (
        <Stack direction='row-reverse'>
            <TextField size='small' sx={{mb: .5}}
                label='Filtro' type="search"
                value={valor}
                onChange={e=> {
                    setValor(e.target.value);
                    setAguardar(true);
                }}
                InputProps={{
                    startAdornment: aguardar ? <CircularProgress sx={{mr: .5}} size={20}  /> : <SearchIcon sx={{mr: .5}} />
                }}
            />

        </Stack>
    )
})

const Tabela = ({ cabe, corpo}) => {
  const columns = useMemo(()=> cabe, [cabe]);
  const data = useMemo(()=> corpo, [corpo]);
  // Criando os dados para a tabela
  const instance = useTable({
      columns,
      data
  }, 
      useGlobalFilter,
      useSortBy,
  );
  // Extraindo da instancias as props usadas para a tabela
  const { 
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
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
                            <tr {...row.getRowProps()}>
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