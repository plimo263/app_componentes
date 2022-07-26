import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Menu,
  MenuItem,
  Stack,
  Paper,
  TextField,
  ButtonBase,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDebounce } from "react-use";

function SearchSelect({
  types,
  defaultValue,
  typeDefault,
  onChange,
  debounce,
  placeholder,
  disableDebounce,
}) {
  // Determina o nó selecionado
  const [nodeDefault, setNodeDefault] = useState(
    typeDefault || String(types[0].id)
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(defaultValue);
  const [wait, setWait] = useState(false);
  const node = nodeDefault
    ? types.filter((val) => String(val.id) === String(nodeDefault))[0]
    : types[0];

  const setMenu = (evt) => setAnchorEl(evt.currentTarget);
  const handleClose = () => setAnchorEl(null);
  // node selecionado
  const setNodeSelected = (valId) => {
    setNodeDefault(valId);
    setAnchorEl(null);
  };
  // Funcao de callback que disponibiliza o ID e o valor do campo
  const onChangeTextField = (e) => {
    setValue(e.target.value);
    !disableDebounce && setWait(true);
  };

  //
  // Utiliza o useDebounce para determinar que depois de ms podemos aplicar o filtro
  const [,] = useDebounce(
    () => {
      // Valor pode ser atualizado
      onChange(nodeDefault, value);
      setWait(false);
    },
    disableDebounce ? -1 : debounce,
    [value]
  );

  return (
    <Stack direction="row">
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {types.map((ele, idx) => (
          <MenuItem onClick={() => setNodeSelected(ele.id)} key={idx}>
            {ele.node}&nbsp;
            <Typography variant="body2">{ele.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <ButtonBase title={node.title} onClick={setMenu}>
        <Paper
          shape={0}
          sx={{
            p: 0.5,
            borderRadius: 0,

            height: "30px",
            display: "flex",
            alignItems: "center",
          }}
          elevation={2}
        >
          {wait ? <CircularProgress size={24} /> : <>{node.node}</>}
          <ArrowDropDownIcon />
        </Paper>
      </ButtonBase>
      <TextField
        size="small"
        defaultValue={value}
        fullWidth
        variant="outlined"
        onChange={onChangeTextField}
        placeholder={placeholder}
      />
    </Stack>
  );
}
//
SearchSelect.defaultProps = {
  placeholder: "Selecione e digite o que pesquisar",
  debounce: 500,
  disableDebounce: false,
};

SearchSelect.propTypes = {
  /** Valor default (correspondente ao campo id de types) que deve ficar pré-selecionado no filtro */
  typeDefault: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Uma lista com  os objetos que iram compor as opções selecionaveis. Onde id é um identificador único, node é um componente (geralmente um icone) para o item do menu e title uma string */
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      node: PropTypes.any,
      title: PropTypes.string,
    })
  ).isRequired,
  /** Um valor default para ser exibido no campo já como preenchido */
  defaultValue: PropTypes.string,
  /** Uma função de callback que disponibiliza (int id, String value)=>{} onde o id corresponde a um dos ids de types e value é o texto digitado no campo no momento */
  onChange: PropTypes.func.isRequired,
  /** Uma string para dar uma dica do campo de busca */
  placeholder: PropTypes.string,
  /** Tempo de duração (em milisegundos) que o campo vai esperar para chamar a função onChange. Caso entre este tempo não tenha sido digitado nada a função onChange é invocada */
  debounce: PropTypes.number,
  /** Um boleano que desativa a busca lenta tornando a pesquisa imediata */
  disableDebounce: PropTypes.bool,
};

export default SearchSelect;
