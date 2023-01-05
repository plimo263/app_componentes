import React, { useState, useCallback, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Icone from "./icone";
import _ from "lodash";
import { Body2 } from "./tipografia";
import Select from "./select";
import { useSet } from "react-use";
//
const optMeses = _.range(1, 14).map((ele) =>
  ele === 13
    ? {
        key: "TODOS",
        label: "TODOS",
        value: "todos",
      }
    : {
        key: _.toUpper(
          format(
            parseISO(`2022-${ele.toString().padStart(2, "0")}-01`),
            "MMM",
            {
              locale: ptBR,
            }
          )
        ),
        label: _.toUpper(
          format(
            parseISO(`2022-${ele.toString().padStart(2, "0")}-01`),
            "MMM",
            {
              locale: ptBR,
            }
          )
        ),
        value: format(
          parseISO(`2022-${ele.toString().padStart(2, "0")}-01`),
          "MM"
        ),
      }
);

// Componente para criar um array de meses
const FiltroMes = ({ onChange, titulo, mesesDefault }) => {
  const [valor, setValor] = useState(mesesDefault);
  const [set, { has, toggle, add, remove }] = useSet(new Set());

  // const meses = _.range(1, 13).map((ele) => [
  //   format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MM"),
  //   _.toUpper(
  //     format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MMM", {
  //       locale: ptBR,
  //     })
  //   ),
  // ]);
  // meses.push(["todos", "TODOS"]);
  // Controlando o onChange para que, caso seja todos recupere a lista de meses
  const fnOnChange = useCallback(
    (e) => {
      if (_.filter(e, (val) => val.value === "todos").length > 0) {
        const novoValor = _.filter(optMeses, (val) => val.value !== "todos");
        add(1);
        add(2);
        add(3);
        add(4);

        setValor(novoValor);
        onChange(novoValor);
      } else {
        if (e.length === 0) {
          remove(1);
          remove(2);
          remove(3);
          remove(4);
        }

        setValor(e);
        onChange(e);
      }
    },
    [onChange, add, remove, setValor]
  );
  useEffect(() => {
    if (set.size > 0) {
      let novoValor = [];
      _.forEach([...set], (val) => {
        switch (val) {
          case 1:
            novoValor = novoValor.concat(
              _.filter(optMeses, (vl, idx) => idx < 3)
            );
            break;
          case 2:
            novoValor = novoValor.concat(
              _.filter(optMeses, (vl, idx) => idx > 2 && idx < 6)
            );
            break;
          case 3:
            novoValor = novoValor.concat(
              _.filter(optMeses, (vl, idx) => idx > 5 && idx < 9)
            );
            break;
          case 4:
            novoValor = novoValor.concat(
              _.filter(optMeses, (vl, idx) => idx > 8 && idx < 12)
            );
            break;
          default:
            break;
        }
      });
      setValor(novoValor);
      onChange(novoValor);
    }
  }, [onChange, setValor, set]);

  return (
    <Stack>
      <Stack direction="row" spacing={0.5} alignItems="flex-end">
        <Icone icone="CalendarMonth" />
        <Body2 fontWeight="bold">{titulo}</Body2>
      </Stack>
      <Select
        onChange={fnOnChange}
        isMulti={true}
        //defaultValue={mesesDefault}
        value={valor}
        options={optMeses}
        //autoFormat
      />
      <Stack
        sx={{ width: "100%", overflowX: "auto" }}
        direction="row"
        spacing={1}
        alignItems="center"
      >
        {_.range(1, 5).map((ele) => (
          <FormControlLabel
            checked={has(ele)}
            onChange={() => toggle(ele)}
            control={<Checkbox />}
            label={`${ele}° Trimestre`}
          />
        ))}
      </Stack>
    </Stack>
  );
};
//
FiltroMes.defaultProps = {
  titulo: "Meses",
  // Valor default é do mes 1 até o mes atual
  mesesDefault: _.range(1, parseInt(format(new Date(), "MM")) + 1).map(
    (ele) => {
      const value = format(
        parseISO(`2022-${ele.toString().padStart(2, "0")}-01`),
        "MM"
      );
      const keyLabel = _.toUpper(
        format(parseISO(`2022-${ele.toString().padStart(2, "0")}-01`), "MMM", {
          locale: ptBR,
        })
      );
      return {
        value: value,
        key: keyLabel,
        label: keyLabel,
      };
    }
  ),
};
//
FiltroMes.propTypes = {
  /** Uma função de callback que recebe o array de meses selecionados que pode ser usado no filtro */
  onChange: PropTypes.func.isRequired,
  /** Uma string para determinar o titulo */
  titulo: PropTypes.string,
  /** Um array bidimensional que vai informar quais os meses default do filtro. Por padrão ele pega do mês 1 até o mês atual */
  mesesDefault: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default memo(FiltroMes);
