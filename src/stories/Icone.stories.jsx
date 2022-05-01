import React from 'react';
import Icone from '../components/icone';


export default {
  title: 'Example/Icone',
  component: Icone,
  parameters: {
    componentSubtitle: 'Exibe um icone do Mui. Ele é mais focado em uma simplificação de utilização dos icones. Ele é atualizado com novos icones constantemente'
}
};

const Template = (args) => <Icone {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    icone: 'Add'
}