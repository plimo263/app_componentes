import React from "react";
import Calendario from "../components/calendario";
import { Caption } from "../components/tipografia";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { Paper, Typography } from "@mui/material";

export default {
  title: "Example/Calendario",
  component: Calendario,
  parameters: {
    componentSubtitle:
      "Este componente exibe um lindo calendário para manipulação e inclusão de informações (eventos)",
  },
};

const Template = (args) => <Calendario {...args} />;

export const Padrao = Template.bind({});

Padrao.args = {
  dataInicial: "2022-05-01",
};

Padrao.story = {
  parameters: {
    docs: {
      storyDescription: "Calendario em funcionalidade padrão.",
    },
  },
};

export const ComRender = Template.bind({});

ComRender.args = {
  dataInicial: "2022-05-01",
  render: (dia) => {
    if (dia === "2022-05-10")
      return (
        <>
          <CrisisAlertIcon />
          <Caption
            title="Meta Conquistada com sucesso absoluto"
            color="success.main"
          >
            Meta Conquistada com sucesso absoluto
          </Caption>
        </>
      );
  },
};

ComRender.story = {
  parameters: {
    docs: {
      storyDescription: "Calendario com um dia marcado com a informação.",
    },
  },
};

export const ComEstilo = Template.bind({});

ComEstilo.args = {
  dataInicial: "2022-05-01",
  renderEstiloDia: (dia) => {
    if (dia === "2022-05-10")
      return {
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.constrastText,
      };
  },
};

ComEstilo.story = {
  parameters: {
    docs: {
      storyDescription:
        "Calendario com um dia estilizado para dar destaque sobre o calendário.",
    },
  },
};

export const OnClick = Template.bind({});

OnClick.args = {
  dataInicial: "2022-05-01",
  onClick: (dia) => {
    alert(`Você clicou no dia ${JSON.stringify(dia)}`);
  },
};

OnClick.story = {
  parameters: {
    docs: {
      storyDescription:
        "Calendario com função de onClick ativa, qualquer dia clicado no calendario corresponderá a uma chamada a função.",
    },
  },
};

export const ControleCalendario = Template.bind({});

ControleCalendario.args = {
  dataInicial: "2022-05-01",
  onControleCalendario: (priDia, ultDia, controle) => {
    alert(
      `Você clicou no controle ${controle} primerio dia ${priDia} e ultimo dia ${ultDia} deste mês`
    );
  },
};

ControleCalendario.story = {
  parameters: {
    docs: {
      storyDescription:
        "Calendario com função de controle sobre o avanço e recuo do calendario. Com isto é possível determinar quando o calendario avançou ou recuou e executar algum tipo de função auxiliar.",
    },
  },
};

export const ComAguardo = Template.bind({});

ComAguardo.args = {
  dataInicial: "2022-05-01",
  aguardar: true,
};

ComAguardo.story = {
  parameters: {
    docs: {
      storyDescription:
        "Calendario com props aguardar o que impede de interagir com qualquer parte do calendario.",
    },
  },
};

export const ComRenderModalLateral = Template.bind({});

ComRenderModalLateral.args = {
  dataInicial: "2022-05-01",
  renderModalLateral: (dia) => (
    <Paper sx={{ minHeight: "100%" }}>
      <Typography variant="h4">Olá, hoje é {dia}</Typography>
    </Paper>
  ),
};

ComRenderModalLateral.story = {
  parameters: {
    docs: {
      storyDescription:
        "Calendario que quando clicado exibe/oculta um modal lateral customizado",
    },
  },
};
