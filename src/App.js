import React from 'react'
import { Container, Typography } from '@mui/material';
import Tabela from './components/tabela';
import DATA from './data/MOCK_DATA2.json'
import { lightGreen } from '@mui/material/colors'
// import { format, parseISO } from 'date-fns';

export const App = () => {
  // const cabe = [
  //   'Nome', 'Sobrenome', 'Email', 'Telefone', 'Endereco', 'Data matricula', 'Ultimo login', 'Salário'
  // ];
  // const corpo = [
  //   ['Marcos', 'Felipe', 'mfelipe@dinizbh.com.br', '31 97565-0408', 'Rua imbiaca, 155', '20220401', '2022-04-11 23:02', '550.00'],
  //   ['Heitor', 'Souza', 'plimo263@gmail.com', '31 97565-0405', 'Rua imbiaca 222', '2022-10-01', '2022-04-11 21:00', '650.69'],
    
  // ];
  const cabe = DATA.cabe;
  const corpo = DATA.corpo;
  // 
  const optTabela = {
    sxCabecalho: {borderRadius: 0, color: theme=> theme.palette.secondary.contrastText, backgroundColor: theme=> theme.palette.secondary.main, m: 0, p: .5},
    styleCabe: {fontSize: '60%'},
    styleCorpo: {fontSize: '70%', whiteSpace: 'nowrap' },
    styleRodape: {fontSize: '80%'},
    //dataCustom: {7: 'dd/MM',8: 'dd/MM',9: 'dd/MM'},
    data: [7,8,9,10,11,12,13],
    //monetario: [3,4,5,6,7,8,9,10,11,12],
    styleTrSelecionado: { color: 'black', backgroundColor: lightGreen['500'] },
    tamanho: '70vh',
    calcularRodape: true,
    baixar_em_excel: 'http://localhost:8080/baixar_em_excel'
    
};

  return (
    <Container maxWidth={false}>
      <Typography variant='h5' align='center'>
        Teste com a tabela usando o react-table
      </Typography>
      <Tabela 
        cabe={cabe}
        corpo={corpo}
        ocultarColuna
        {...optTabela}
      />
    </Container>
  )
}
export default App;