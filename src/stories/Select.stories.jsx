import React from 'react';
import Select from '../components/select';


export default {
  title: 'Example/Select',
  component: Select,
  parameters: {
    componentSubtitle: 'Este componente é um wrapper sobre o react-select. Todas as props que react-select aceita ele recebe.'
}
};

const Template = (args) => <Select {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
    options: [{label: 'Marcos', value: 'Marcos', key: 'Marcos'}, {label: 'Felipe', value: 'Felipe', key: 'Felipe'}]
}

export const AutoFormatacao = Template.bind({});

AutoFormatacao.args = {
   options: ['Marcos', 'Felipe', 'Da Silva'],
   autoFormat: true,
}

AutoFormatacao.story = {
  parameters: {
    docs: {
        storyDescription: 'Define uma auto-fomatação sobre o array'
    }
}
}
