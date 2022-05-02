import React from 'react';
import HeaderDefault from '../components/header-default';


export default {
  title: 'Example/HeaderDefault',
  component: HeaderDefault,
  parameters: {
    componentSubtitle: 'Este componente é usado para inserir um header com estilo pre-configurado para dar destaque a marca da empresa.'
}
};

const Template = (args) => <HeaderDefault {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    children: 'Cabecalho',
    logo: 'https://www.oticasdiniz.com.br/arquivos/oticas_2020.png?v=637188670193970000'
}

Padrao.story = {
  parameters: {
    docs: {
        storyDescription: 'Recebe os parametros obrigatorios para seu funcionamento.'
    }
  }
}

export const ComBackground = Template.bind({});

ComBackground.args = {
    children: 'Cabecalho',
    logo: 'https://www.oticasdiniz.com.br/arquivos/oticas_2020.png?v=637188670193970000',
    backgroundColor: '#b71c1c'
}

ComBackground.story = {
  parameters: {
    docs: {
        storyDescription: 'Define uma cor de fundo de background.'
    }
  }
}