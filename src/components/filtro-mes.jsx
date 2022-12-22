import React, { memo } from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Icone from "./icone";
import _ from "lodash";
import { Body2 } from "./tipografia";
import Select from "./select";

// Componente para criar um array de meses
const FiltroMes = ({ onChange, titulo, mesesDefault }) => {
  const meses = _.range(1, 13).map((ele) => [
    format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MM"),
    _.toUpper(
      format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MMM", {
        locale: ptBR,
      })
    ),
  ]);

  return (
    <Stack>
      <Stack direction="row" spacing={0.5} alignItems="flex-end">
        <Icone icone="CalendarMonth" />
        <Body2 fontWeight="bold">{titulo}</Body2>
      </Stack>
      <Select
        onChange={onChange}
        isMulti={true}
        defaultValue={mesesDefault}
        options={meses}
        autoFormat
      />
    </Stack>
  );
};
//
FiltroMes.defaultProps = {
  titulo: "Meses",
  // Valor default é do mes 1 até o mes atual
  mesesDefault: _.range(1, parseInt(format(new Date(), "MM")) + 1).map(
    (ele) => [
      format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MM"),
      _.toUpper(
        format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MMM", {
          locale: ptBR,
        })
      ),
    ]
  ),
};
//
FiltroMes.propTypes = {
  /** Uma função de callback que recebe o array de meses selecionados que pode ser usado no filtro */
  onChange: PropTypes.func.isRequired,
  /** Uma string para determinar o titulo */
  titulo: PropTypes.string,
  /** Um array bidimensional que vai informar quais os meses default do filtro. Por padrão ele pega do mês 1 até o mês atual */
  mesesDefault: PropTypes.arrayOf(PropTypes.array),
};

export default memo(FiltroMes);
