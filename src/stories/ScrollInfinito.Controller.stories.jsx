import React from 'react';
import axios from 'axios';
import ScrollInfinitoController from '../components/scroll-infinito-controller';
import { ListItemText, ListItem, Paper } from '@mui/material';


export default {
  title: 'Example/ScrollInfinitoController',
  component: ScrollInfinitoController,
  parameters: {
    componentSubtitle: 'Este componente exibe um scroll infinito controlado por uma funcão de callback que retorna um array com os novos itens a serem incrementados.'
  }
};

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

let valor = 0;

const fnAtualizaItens = async ()=>{
  if(valor === 5) return [];
  valor += 1;
  const resp = await api.get(`/comments?postId=${valor}`);
  return resp.data;
}

const Template = (args) => {

  return (
    <ScrollInfinitoController {...args} />
  );

};

export const Padrao = Template.bind({});

Padrao.args = {
    itens: [],
    onUpgradeItens: fnAtualizaItens,
    render: (valor)=> (
    <Paper sx={{p: 5, my: 1, }}>
      <ListItem>
        <ListItemText
            primary={valor.email}
            secondary={valor.body}
          />
      </ListItem>
    </Paper>
    ),
}


