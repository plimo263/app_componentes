import React from 'react';
import ScrollInfinito from '../components/scroll-infinito';
import { Paper } from '@mui/material';


export default {
  title: 'Example/ScrollInfinito',
  component: ScrollInfinito,
  parameters: {
    componentSubtitle: 'Este componente exibe um scroll infinito, ou seja a medida que ele vai caminhando vai carregando mais dados para a tela (rolagem vertical).'
}
};

const DADOS = Array.from(Array(10)).map((ele,idx)=>( idx ));

const Template = (args) => <ScrollInfinito {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    itens: DADOS,
    itensPorPagina: 2,
    render: (valor)=> <Paper sx={{p: 10, my: 2, backgroundColor: '#b71c1c' }}>{valor}</Paper>,
}


