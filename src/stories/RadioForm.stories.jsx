import React from 'react';
import RadioForm from '../components/radio-form'


export default {
  title: 'Example/RadioForm',
  component: RadioForm,
  parameters: {
    componentSubtitle: 'Um componente no estilo de botões de radio que possibilita o usuario escolher ente várias opções'
}
};

const Template = (args) => <RadioForm {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    itens: ['Macho', 'Fêmea'],
    defaultValue: 'Fêmea'
}

export const Horizontal = Template.bind({});

Horizontal.args = {
    itens: ['Macho', 'Fêmea'],
    orientation: 'horizontal',
}

Horizontal.story = {
  parameters: {
    docs: {
        storyDescription: 'Radio na posição horizontal.'
    }
}
}

export const Erro = Template.bind({});

Erro.args = {
  itens: ['Macho', 'Fêmea'],
  error: 'Nenhuma alternativa escolhida'
}

Erro.story = {
parameters: {
  docs: {
      storyDescription: 'Radio com mensagem de erro.'
  }
}
}


