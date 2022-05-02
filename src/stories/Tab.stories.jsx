import React from 'react';
import Tab from '../components/tab';


export default {
  title: 'Example/Tab',
  component: Tab,
  parameters: {
    componentSubtitle: 'Um componente de tabulaçao que pode ser usado para separar conteudos que não são correlacionados.'
}
};

const Template = (args) => <Tab {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    cabe: ['Usuários', 'Acessos'],
    corpo: [<p>Lista de usuarios</p>, <p>Acessos de todas as paginas</p>]
}
