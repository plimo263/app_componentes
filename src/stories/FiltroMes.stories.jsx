import React from "react";
import FiltroMes from "../components/filtro-mes";

export default {
  title: "Example/FiltroMes",
  component: FiltroMes,
  parameters: {
    componentSubtitle:
      "Componente que exibe uma barra com o nome de todos os meses com capacidade de recuperação dos meses dos filtros.",
  },
};

const Template = (args) => <FiltroMes {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  onchange: (val) => console.log(val),
};
