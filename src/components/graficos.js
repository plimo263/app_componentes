import React, { memo } from "react";
import PropTypes from "prop-types";
import { Subtitle2, Body2, Caption } from "../components";
import { Stack, useMediaQuery, useTheme, Paper, Box } from "@mui/material";

import {
  red,
  green,
  yellow,
  purple,
  indigo,
  blue,
  teal,
  lime,
  deepOrange,
  brown,
} from "@mui/material/colors";

import {
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  CartesianGrid,
  Tooltip,
  YAxis,
  XAxis,
  Bar,
  Cell,
  LabelList,
} from "recharts";


const GradientColor = ({ idColor, color })=>{
    //
    const primario = color;

    return (
    
    <linearGradient id={idColor} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={primario} stopOpacity={1} ></stop>                    
        <stop offset="90%" stopColor={primario} stopOpacity={.5} ></stop>
    </linearGradient>                
    )
}

const _colors = [
  red[700],
  green[700],
  deepOrange[700],
  indigo[700],
  purple[700],
  lime[700],
  yellow[700],
  blue[700],
  teal[700],
  brown[700],
];

// Componente para exibir dentro do ToolTip que recebe titulo e valor
const GraficoItemTooltip = memo(({ cor, titulo, valor }) => (
  <Paper sx={{ p: 1 }} elevation={0}>
    <Subtitle2 align="left" color={cor}>
      {titulo}
    </Subtitle2>
    <Body2>{valor}</Body2>
  </Paper>
));

// grafico de barra
export const GraficoBarra = ({
  titulo,
  dados,
  colors,
  id,
  valorTopo,
  fnVerRotulo,
}) => {
  const isMobile = useMediaQuery(useTheme()?.breakpoints?.down("md"));
  //
  const corSecundaria = useTheme().palette?.secondary?.main;
  //
  const _innerColors = colors
    ? colors?.length === 1
      ? dados.map((k) => colors[0])
      : colors
    : dados.map((k) => corSecundaria);

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Subtitle2 sx={{ mb: 1 }}>{titulo}</Subtitle2>

      <ResponsiveContainer height={305}>
        <BarChart data={dados}>
          <defs>
            {dados.map((_, idx) => (
              <GradientColor
                key={idx}
                idColor={`${id ? id : "barra"}_${idx.toString()}`}
                color={_innerColors[idx]}
              />
            ))}
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,.03)", strokeWidth: 0.5 }}
            content={({ payload }) => {
              if (payload && payload.length > 0)
                return (
                  <GraficoItemTooltip
                    cor={_innerColors[payload[0].name]}
                    titulo={payload[0].payload.dataName}
                    valor={payload[0].payload.dataLabel}
                  />
                );
              return null;
            }}
          />
          {!isMobile && <YAxis dataKey="dataValue" tickLine={false} />}
          {!isMobile && fnVerRotulo && (
            <XAxis dataKey="dataName" tickFormatter={fnVerRotulo} />
          )}
          <Bar dataKey="dataValue">
            {dados.map((_, idx) => (
              <>
                {valorTopo && (
                  <LabelList
                    key={`${idx}_list`}
                    dataKey="dataLabel"
                    position="top"
                  />
                )}
                <Cell
                  key={`cell-${idx}`}
                  fill={`url(#${id ? id : "barra"}_${idx.toString()})`}
                />
              </>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

GraficoBarra.defaultProps = {
  valorTopo: true,
  verRotulo: false,
};

GraficoBarra.propTypes = {
  dados: PropTypes.arrayOf(
    PropTypes.shape({
      dataValue: PropTypes.oneOfType([PropTypes.number]).isRequired,
      dataLabel: PropTypes.string.isRequired,
      dataName: PropTypes.string.isRequired,
    })
  ).isRequired,
  titulo: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valorTopo: PropTypes.bool,
  fnVerRotulo: PropTypes.func,
};

// Cria grafico pizza com legenda
export const GraficoPizzaComLegenda = memo(({ dados, titulo, colors, id }) => {
  return (
    <Paper elevation={4} sx={{ p: 1 }}>
      <Subtitle2 sx={{ mb: 1 }}>{titulo}</Subtitle2>
      <Stack direction="row" sx={{ w: "100%", overflowY: "auto" }}>
        {dados.map((ele, idx) => (
          <Stack
            title={ele.dataName}
            sx={{ mx: 1 }}
            key={idx}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <Box
              sx={{
                backgroundColor: colors[idx],
                width: 12,
                height: 12,
                borderRadius: 8,
              }}
            />
            <Caption whiteSpace="nowrap">
              {ele.dataName}: {ele.dataLabel}
            </Caption>
          </Stack>
        ))}
      </Stack>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            {dados.map((_, idx) => (
              <GradientColor
                key={idx}
                idColor={`${id ? id : "pizza"}_${idx.toString()}`}
                color={colors[idx]}
              />
            ))}
          </defs>
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0)
                return (
                  <GraficoItemTooltip
                    cor={colors[payload[0].name]}
                    titulo={`Código: ${payload[0].payload.dataName}`}
                    valor={`Valor: ${payload[0].payload.dataLabel}`}
                  />
                );
              return null;
            }}
          />
          <Pie
            data={dados}
            dataKey="dataValue"
            cx="50%"
            cy="50%"
            paddingAngle={4}
          >
            {dados.map((_, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={`url(#${id ? id : "pizza"}_${idx.toString()})`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
});

GraficoPizzaComLegenda.propTypes = {
  dados: PropTypes.arrayOf(
    PropTypes.shape({
      dataValue: PropTypes.oneOfType([PropTypes.number]).isRequired,
      dataLabel: PropTypes.string.isRequired,
      dataName: PropTypes.string.isRequired,
    })
  ).isRequired,
  titulo: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

GraficoPizzaComLegenda.defaultProps = {
  colors: _colors,
};
