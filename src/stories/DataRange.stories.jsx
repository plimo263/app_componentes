import React from "react";
import DataRange from "../components/date-range";
import { format } from "date-fns";

export default {
  title: "Example/DataRange",
  component: DataRange,
  parameters: {
    componentSubtitle:
      "Exibe dois campos de data que trabalham em conjunto retornando um mesmo valor.",
  },
};

const Template = (args) => {
  return (
    <>
      <DataRange {...args} onChange={(val) => console.log(val)} />
    </>
  );
};

export const Padrao = Template.bind({});

export const Rotulos = Template.bind({});

Rotulos.args = {
  labelFrom: "De",
  labelTo: "Até",
};

Rotulos.story = {
  parameters: {
    docs: {
      storyDescription: "Alterando os valores dos rotulos",
    },
  },
};

export const DefaultValue = Template.bind({});

DefaultValue.args = {
  defaultValue: `${format(new Date(), "yyyy-MM-dd")}_${format(
    new Date(),
    "yyyy-MM-dd"
  )}`,
};

DefaultValue.story = {
  parameters: {
    docs: {
      storyDescription: "Usando valores default de data",
    },
  },
};

export const Desabilitado = Template.bind({});

Desabilitado.args = {
  defaultValue: `${format(new Date(), "yyyy-MM-dd")}_${format(
    new Date(),
    "yyyy-MM-dd"
  )}`,
  disabled: true,
};

Desabilitado.story = {
  parameters: {
    docs: {
      storyDescription: "Campos desabilitados para edição",
    },
  },
};

export const ComErro = Template.bind({});

ComErro.args = {
  error: "As datas precisam ser preenchidas",
};

ComErro.story = {
  parameters: {
    docs: {
      storyDescription: "Campo com mensagem de erro",
    },
  },
};
