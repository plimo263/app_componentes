import React from 'react';
import BotaoIcone from '../components/botao-icone';


export default {
  title: 'Example/BotaoIcone',
  component: BotaoIcone,
  parameters: {
    componentSubtitle: 'Exibe um botão com um icone do Mui. Este botão tem o tamanho do do icone com um efeito ripple'
}
};

const Template = (args) => <BotaoIcone {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    icone: 'Add'
}