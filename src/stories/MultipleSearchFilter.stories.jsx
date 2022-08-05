import React from "react";
import MultipleSearchFilter from "../components/multiple-search-filter";
import { Caption } from "../components/tipografia";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

export default {
  title: "Example/MultipleSearchFilter",
  component: MultipleSearchFilter,
  parameters: {
    componentSubtitle:
      "Este componente pode combinar N filtros diferentes criando um formulario dinâmico para consulta",
  },
};

const Template = (args) => <MultipleSearchFilter {...args} />;

export const Padrao = Template.bind({});
// Cria um schema com 3 campos
const schema = [
  {
    type: "radio",
    itens: [
      ["1", "Masculino"],
      ["2", "Feminino"],
    ],
    name: "genero",
    label: "Genero",
    orientation: "horizontal",
    icon: "Male",
  },
  {
    type: "text",
    name: "nome",
    label: "Nome",
    icon: "Person",
    placeholder: "Digire o nome do usuario",
  },
  {
    type: "select",
    name: "cargo",
    isMulti: true,
    autoFormat: true,
    itens: [
      [1, "DESENVOLVEDOR"],
      [2, "ANALISTA DE SISTEMA"],
      [3, "OPERADOR DE COMPUTADOR"],
      [4, "NÃO É DA ÁREA"],
    ],
    icon: "Build",
    label: "Cargo",
  },
  {
    type: "text",
    name: "salario",
    toMoney: {
      integerLimit: 4,
    },
    icon: "AttachMoney",
    label: "Salario",
  },
];

Padrao.args = {
  schema: schema,
  onSubmit: (val) => {
    alert(JSON.stringify(val));
  },
};

Padrao.story = {
  parameters: {
    docs: {
      storyDescription: "MultipleSearchFilter em funcionalidade padrão.",
    },
  },
};
//
export const ValoresDefault = Template.bind({});

ValoresDefault.args = {
  schema: schema,
  defaultSelectedForm: ["nome"],
  onSubmit: (val) => {
    alert(JSON.stringify(val));
  },
};

ValoresDefault.story = {
  parameters: {
    docs: {
      storyDescription:
        "MultipleSearchFilter com valores default selecionados.",
    },
  },
};
