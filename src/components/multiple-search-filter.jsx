import React, { useCallback } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Icone from "./icone";
import EntradaForm from "./entrada-form";
import { Divider, Chip, Stack } from "@mui/material";
import { useSet } from "react-use";
import { H6 } from "./tipografia";

function MultipleSearchFilter(props) {
  const {
    schema,
    schemaValidator,
    schemaMessageError,
    onSubmit,
    title,
    sizeChip,
    colorChipSelected,
    defaultSelectedForm,
    wait,
  } = props;
  const [selectForm, { has, toggle }] = useSet(new Set(defaultSelectedForm));

  //
  const chipValues = _.map(schema, (val) => ({
    icon: val.icon,
    label: val.label,
    name: val.name,
  }));
  // Faz um filtro baseado nos forms Selecionados
  const schemaFilter = _.filter(schema, (val) => selectForm.has(val.name));
  // Uma funcao interna para criar um objeto com os  valores e repassar para onSubmit enviado
  const fn = useCallback(
    (val) => {
      const obj = {};
      _.keys(val).forEach((k) => {
        // Para campos select simples
        if (val[k]?.value) {
          obj[k] = val[k].value;
        } else if (Array.isArray(val[k])) {
          // Campos com resposta via array
          obj[k] = _.map(val[k], (vl) => (vl.value ? vl.value : vl));
        } else {
          obj[k] = val[k];
        }
        //
      });
      onSubmit(obj);
    },
    [onSubmit]
  );

  return (
    <Stack sx={{ p: 1 }} spacing={1}>
      <H6>{title}</H6>
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: "100%", overflow: "auto" }}
      >
        {chipValues?.map((ele, idx) => (
          <Chip
            key={idx}
            disabled={wait}
            size={sizeChip}
            onClick={() => toggle(ele.name)}
            color={has(ele.name) ? colorChipSelected : "default"}
            label={ele.label}
            icon={<Icone icone={ele.icon} />}
          />
        ))}
      </Stack>
      <Divider />
      {schemaFilter?.length > 0 && (
        <EntradaForm
          schema={schemaFilter}
          schemaMessageError={schemaMessageError}
          schemaValidator={schemaValidator}
          onSubmit={fn}
          wait={wait}
        />
      )}
    </Stack>
  );
}
//
MultipleSearchFilter.defaultProps = {
  defaultSelectedForm: [],
  title: "",
  sizeChip: "small",
  colorChipSelected: "primary",
};

//
MultipleSearchFilter.propTypes = {
  /** Determina um array com os valores ( mesma string no parametro name do schema ) selecionados por default nos chips */
  defaultSelectedForm: PropTypes.array,
  /** Uma string que você pode usar para determinar um titulo ao componente de selecao */
  title: PropTypes.string,
  /** Controla o tamanho das chipas  */
  sizeChip: PropTypes.oneOf(["small", "medium"]),
  /** Controla a cor do chip quando selecionado. O padrão quando não selecionado é ficar inativo */
  colorChipSelected: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ]),
  /** Funcao que receberá um objeto com os campos x valores que foram selecionados */
  onSubmit: PropTypes.func.isRequired,
  /** Uma lista de objetos que são usados para determinar os valores de cada campo (vide EntradaForm) */
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      /** Props que permite definir um titulo sobre a questão enviada */
      titulo: PropTypes.string,
      /** Props que permite definir uma descricao sobre a questão enviada */
      descricao: PropTypes.string,
      /** Props para você estilizar o titulo da pergunta com cor, tamanho da fonte, alinhamento etc.. */
      tituloTipografia: PropTypes.object,
      /** Props para você estilizar a descricao da pergunta com cor, tamanho da fonte, alinhamento etc.. */
      descricaoTipografia: PropTypes.object,
      /** Uma props para formatacao de numero de tamanho conhecido e esperado, como telefone, cpf etc... Deve ser um array com cada numero sendo um item do array em expressão regular */
      mask: PropTypes.array,
      /** Uma props que permite definir este campo como um numérico de valor outras opcoes podem ser repassadas usando o mdelo de react-text-mask */
      toMoney: PropTypes.shape({
        prefix: PropTypes.string,
        thousandsSeparatorSymbol: PropTypes.oneOf([".", ","]),
        allowDecimal: PropTypes.bool,
        decimalSymbol: PropTypes.oneOf([".", ","]),
        decimalLimit: PropTypes.number,
        integerLimit: PropTypes.number,
      }),
      /** Estilização para o Wrapper que envolve cada campo ele é um paper  */
      wrapperPaperProps: PropTypes.object,
      /** Quando usado esta props recebe uma funcao de callback com o valor do campo informado na props exibirSe.ouvir global. Ele deve retornar o novo valor do item (caso Select e Radio) */
      exibirSe: PropTypes.func,
      /** Uma string que represente o icone */
      icon: PropTypes.string,
      /** Os tipos dos itens */
      type: PropTypes.oneOf([
        "time",
        "select",
        "text",
        "textarea",
        "number",
        "date",
        "checkbox",
        "switch",
        "radio",
      ]).isRequired,
      /** O valor default do item */
      defaultValue: PropTypes.string,
      /** Boleano para valor default */
      defaultChecked: PropTypes.bool,
      /** Nome que vai identificar o campo no formulario */
      name: PropTypes.string.isRequired,
      /** Rótulo para o campo  */
      label: PropTypes.string,
      /** Sistema de grid para distribuir campos de formulario ({xs: 12, md: 6 }) */
      grid: PropTypes.object,
      /** Propriedades extras que serão expandidas no campo (podem ser props do Mui ou do ReactSelect) */
      extraProps: PropTypes.object,
      /** Um array para o select determinar os itens que farão parte do select */
      itens: PropTypes.array,
      /** Propriedade do select para autoFormataçao do campo itens e defaultValue */
      autoFormat: PropTypes.bool,
      /** Um numero que determina o limite maximo de caracteres digitados */
      maxLength: PropTypes.number,
      /** Um contador para o campo. Campos que tem maxLength já levam contador automatico */
      counter: PropTypes.bool,
      /** Um parametro para controlaro tamanho do item em radioForm */
      size: PropTypes.oneOf(["small", "medium", "large"]),
    })
  ).isRequired,
  /** Um objeto validador do schema, caso tenha algum campo que haja sido escolhido mas não foi preenchido (vide EntradaForm) */
  schemaValidator: PropTypes.object,
  /** Um objeto com o nome do campo e a mensagem de erro que deve ser exibida (vide EntradaForm) */
  schemaMessageError: PropTypes.object,
  /** Um boleano que determinar se o MultiSearchFilter esta ativo para receber novos filtros ou não */
  wait: PropTypes.bool.isRequired,
};

export default MultipleSearchFilter;
