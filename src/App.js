import React from 'react'
import { Container, Typography } from '@mui/material';
import Tabela from './components/tabela';
import DATA from './data/MOCK_DATA.json'
// import { format, parseISO } from 'date-fns';

export const App = () => {
  // const cabe = [
  //   'Nome', 'Sobrenome', 'Email', 'Telefone', 'Endereco', 'Data matricula', 'Ultimo login', 'Salário'
  // ];
  // const corpo = [
  //   ['Marcos', 'Felipe', 'mfelipe@dinizbh.com.br', '31 97565-0408', 'Rua imbiaca, 155', '20220401', '2022-04-11 23:02', '550.00'],
  //   ['Heitor', 'Souza', 'plimo263@gmail.com', '31 97565-0405', 'Rua imbiaca 222', '2022-10-01', '2022-04-11 21:00', '650.69'],
    
  // ];
  const cabe = [
    'Firstname', 'lastname', 'email', 'gender', 'Birth Day'
  ]
  const corpo = DATA;
  // 
  const optTabela = {
    data: [4],
    trSelecionado: 0,
    // envolver: {
    //   0: (val, idx, row)=> {
        
    //     return (
    //     <Stack sx={{m: 0, p: 0}} direction='row'>
        
    //       <Checkbox checked={val.toLowerCase().search('a') !== -1} />
    //       <Typography>
    //         {val.substring(0, 3)}
    //       </Typography>
    //     </Stack>
        
    //   )
    //     },
    // }
    // dataHora: [6],
    // monetario: [7],
  }

  return (
    <Container>
      <Typography variant='h5' align='center'>
        Teste com a tabela usando o react-table
      </Typography>
      <Tabela 
        cabe={cabe}
        corpo={corpo}
        //sxCabecalho={{borderRadius: 0, backgroundColor: '#b78a8a', 'color': 'black', m: 0, p: 0, py: 1}}
        {...optTabela}
        // render={({ trSelecionado, trSelecionadoDados})=>(
        //   <Stack direction='row' alignItems='center'>
        //     <Checkbox />
        //     <Typography>SELECIONAR</Typography>          
        //   </Stack>
        // )}
        // styleTrSelecionado={{
        //   backgroundColor: '#b71c1c', color: 'white',
        // }}
      >
        
      
      </Tabela>
    </Container>
  )
}
export default App;