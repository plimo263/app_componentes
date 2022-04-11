import React from 'react'
import { Container, Typography } from '@mui/material';
import Tabela from './components/tabela';
import DATA from './data/MOCK_DATA.json'
import { format, parseISO } from 'date-fns';

export const App = () => {
  const cabe = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Firstname',
        accessor: 'first_name',
      },
      {
        Header: 'Lastname',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Birth Day',
        accessor: 'birth_day',
        Cell: ({ value })=> format(parseISO(value), 'dd/MM')
      },
  ];
  const corpo = DATA;
  // 

  return (
    <Container>
      <Typography variant='h5' align='center'>
        Teste com a tabela usando o react-table
      </Typography>
      <Tabela 
        cabe={cabe}
        corpo={corpo}
      />
    </Container>
  )
}
export default App;