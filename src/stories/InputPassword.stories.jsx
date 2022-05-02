import React from 'react';
import InputPassword from '../components/input-password';


export default {
  title: 'Example/InputPassword',
  component: InputPassword,
  parameters: {
    componentSubtitle: 'Este componente é usado em campos que precisam de uma inserção de senha.'
}
};

const Template = (args) => <InputPassword {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    label: 'Senha',
    field: {},
}

Padrao.story = {
  parameters: {
    docs: {
        storyDescription: 'Recebe os parametros obrigatorios para seu funcionamento (field é mocado pois é expandido como objeto).'
    }
}
}