import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack, TextField } from "@mui/material";
import { Caption } from "./tipografia";
/**
 *  Componente usado para criar um range de escolha de datas.
 * Importante informar a função de callback que vai receber os dados.
 *
 */

function DateRange({
  error,
  disabled,
  labelFrom,
  labelTo,
  defaultValue,
  onChange,
}) {
  const [de, ate] = defaultValue ? defaultValue.split("_") : ["", ""];
  //
  const [dataDe, setDataDe] = useState(de);
  const [dataAte, setDataAte] = useState(ate);
  //
  useEffect(() => {
    onChange([dataDe, dataAte].join("_"));
  }, [dataDe, dataAte]);

  return (
    <Stack spacing={1} direction={{ xs: "column", md: "row" }}>
      <TextField
        InputLabelProps={{ shrink: true }}
        label={labelFrom}
        type="date"
        onChange={(e) => setDataDe(e.target.value)}
        value={dataDe}
        disabled={disabled}
        error={error}
        helperText={error && <Caption>{error}</Caption>}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        label={labelTo}
        type="date"
        onChange={(e) => setDataAte(e.target.value)}
        value={dataAte}
        disabled={disabled}
        error={error}
        helperText={error && <Caption>{error}</Caption>}
      />
    </Stack>
  );
}

DateRange.defaultProps = {
  labelFrom: "Data Inicial",
  labelTo: "Data Final",
};

DateRange.propTypes = {
  /** Um rótulo para o valor de da data inicial */
  labelFrom: PropTypes.string,
  /** Um rótulo para o valor até da data final */
  labelTo: PropTypes.string,
  /** Um valor default para se usar no formulário. Lembrando que o valor deve ser YYYY-MM-DD_YYYY-MM-DD */
  defaultValue: PropTypes.string,
  /** Uma função que vai receber o valor das datas toda vez que ela for selecionada. */
  onChange: PropTypes.func.isRequired,
  /** Se enviado exibe um aviso de erro */
  error: PropTypes.string,
  /** Desabilita as entradas para não receber valor. */
  disabled: PropTypes.bool,
};

export default DateRange;
