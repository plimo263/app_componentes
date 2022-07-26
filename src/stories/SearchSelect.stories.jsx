import React from "react";
import Icone from "../components/icone";
import SearchSelect from "../components/search-select";

export default {
  title: "Example/SearchSelect",
  component: SearchSelect,
  parameters: {
    componentSubtitle:
      "Este componente exibe uma forma de fazer uma busca por campos selecionaveis.",
  },
};

const Template = (args) => <SearchSelect {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  types: [
    { id: 1, node: <Icone icone="Person" />, title: "Filtro por usuario" },
    { id: 2, node: <Icone icone="ListAlt" />, title: "Filtro por menu" },
    { id: 3, node: <Icone icone="Edit" />, title: "Filtro por edição" },
  ],
  onChange: (index, value) => {
    console.log(index);
    console.log(value);
  },
};

Padrao.story = {
  parameters: {
    docs: {
      storyDescription: "Configuração mínima .",
    },
  },
};

export const UsandoSelect = Template.bind({});

UsandoSelect.args = {
  types: [
    { id: 1, node: <Icone icone="Person" />, title: "Filtro por usuario" },
    { id: 2, node: <Icone icone="ListAlt" />, title: "Filtro por menu" },
    { id: 3, node: <Icone icone="Edit" />, title: "Filtro por edição" },
  ],
  objectSelect: {
    1: ["FULANO", "BELTRANO", "CICLANO"],
  },
  onChange: (index, value) => {
    console.log(index);
    console.log(value);
  },
};

UsandoSelect.story = {
  parameters: {
    docs: {
      storyDescription: "Configuração mínima .",
    },
  },
};
