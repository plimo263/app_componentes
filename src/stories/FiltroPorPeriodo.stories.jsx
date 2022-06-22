import React from "react";
import FiltroPorPeriodo from "../components/filtro-por-periodo";

export default {
  title: "Example/FiltroPorPeriodo",
  component: FiltroPorPeriodo,
  parameters: {
    componentSubtitle:
      "Exibe um lindo componente que é um filtro de periodos de datas criado automaticamente.",
  },
};

const Template = (args) => <FiltroPorPeriodo {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  onClick: console.log,
};
