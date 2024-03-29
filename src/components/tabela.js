import React, { memo, useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import PropTypes from "prop-types";
//import "../css/tabela_v2.css";
import DialogoExibicao from "./dialog";
import Drawer from "./drawer";
import {
  useRowSelect,
  useTable,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";
import TableViewIcon from "@mui/icons-material/TableView";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

//
import { format, parseISO } from "date-fns";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDebounce } from "react-use";
import {
  Hidden,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
  Badge,
  Menu,
  IconButton,
  Stack,
  TextField,
  Paper,
  CircularProgress,
  Typography,
  Checkbox,
  Container,
  FormControlLabel,
  styled,
} from "@mui/material";
/*
 * Um componente que faz utilização de uma linda tabela, customizavel com recursos como:
 * - Baixar em Excel
 * - Conversão de valores monetarios, datas e percentuais
 * - Estilização usando mui (sx props)
 * - HOC para registro selecionado com opções sobre tabela
 */
const Table = styled("table")`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;
const Td = styled("td")`
  border: 1px solid ${({ isDark }) => (isDark ? "#242424" : "#ddd")};
  padding: 8px;
`;
const Th = styled("th")`
  border: 1px solid ${({ isDark }) => (isDark ? "#242424" : "#ddd")};
  padding: 0;
  white-space: nowrap;
`;
const Thead = styled("thead")`
  z-index: 10;
  position: sticky;
  top: 0;
`;
const Div = styled("div")`
  position: relative;
  overflow: auto !important;
`;
const TFoot = styled("tfoot")`
  position: sticky;
  bottom: 0;
`;

// Funcao para fazer o download da tabela em Excel
const baixarEmExcel = async (URL, cabe, corpo, fnFechar) => {
  const formData = new FormData();
  formData.append(
    "objeto",
    JSON.stringify({
      cabe,
      corpo,
    })
  );

  try {
    const resp = await axios.post(URL, formData);
    if (resp.status !== 200) {
      toast.dark("Erro interno do servidor.", {
        type: "error",
        toastId: "erro",
      });
      return false;
    }
    // Deu tudo certo vamos pegar o link e abri-lo para download
    const a = document.createElement("a");
    a.href = resp.data;
    a.target = "_blank";
    a.setAttribute("download", "TABELA");
    a.click();
    // Fecha o modal/dialog
    fnFechar();
  } catch (e) {
    console.log(e);
    toast.dark("Erro desconhecido", {
      type: "error",
      toastId: "erro",
    });
  }
};
// Funcao para formatarValores (monetario, data, telefone percentual)
const formatarValores = (valor, idx, opt) => {
  // E o valor padrao quando nao se tem dados
  if (valor === "--") return valor;

  // Se for o campo data e ele ser esta coluna
  if (opt?.data && opt.data?.includes(idx) && valor?.length > 7) {
    return format(parseISO(valor), "dd/MM/yyyy");
  }
  // Se for o campo dataCustom entao eu devo customizar  com a datastring enviada
  if (opt?.dataCustom && Object.keys(opt.dataCustom).includes(idx.toString())) {
    return format(parseISO(valor), opt.dataCustom[idx]);
  }
  // Se o indice for monetario
  if (opt?.monetario && opt?.monetario.includes(idx)) {
    return converter(valor);
  }
  // Se a formatacao for data/hora pode aplicar
  if (opt?.dataHora && opt?.dataHora.includes(idx) && valor?.length > 8) {
    return format(parseISO(valor), "dd/MM/yyyy HH:mm");
  }
  // Se a formatacao for para percentual
  if (
    opt?.percentual &&
    opt.percentual.includes(idx) &&
    valor?.toString().length > 0
  ) {
    return percentual(valor);
  }

  // Veja se o campo e um telefone e converta-o
  if (opt?.telefone && opt.telefone.includes(idx)) {
    return converterTelefone(valor);
  }
  // Senao so retorna o valor
  return valor;
};
// Funcao que formata o corpo para Download aplicando as formatacoes necessarias
const formatarParaDownload = (corpo, opt) => {
  const copia = [];
  corpo.forEach((ele) => {
    const reg = ele.id ? ele.data : ele;
    copia.push(
      reg.map((value, idx) => {
        return formatarValores(value, idx, opt);
      })
    );
  });
  return copia;
};

// FUncao para converter para numero de telefone
function converterTelefone(valor) {
  // Se o valor for menor que 8 nao faca nada
  if (valor.length < 8) return valor;
  // Pegue os 5 primeiros digitos e depois os 4 ultimos e concatene com '-'
  if (valor.length === 8) {
    return `${valor.substring(0, 4)}-${valor.substring(4)}`;
  }
  // Celular tradicional
  return `${valor.substring(0, 5)}-${valor.substring(5, 9)}`;
}
// Funcao para formatar em percentual
function percentual(valor) {
  const newValor = (valor * 100).toFixed(2);
  return newValor + " %";
}

// Funcao para converter valores monetarios
function converter(valor) {
  const valorReverso = parseFloat(valor)
    .toFixed(2)
    .toString()
    .replace(".", ",")
    .split("")
    .reverse(); // Reverte a string
  let recebeConvertido = "";
  let x = 0; // Contado a cada 3 vai incluir ponto
  for (let i = 0; i < valorReverso.length; i++) {
    // Se o x for inferior a 4 entao vamos incrementar x e colocar o caractere
    if (x < 4) {
      x += 1;
      recebeConvertido += valorReverso[i];
    } else if (x % 3 === 0) {
      // X nao tem resto na divisao por tres, entao incluiremos o ponto e incrementamos x
      recebeConvertido += "." + valorReverso[i];
      x += 1;
      // X já e maior que 4 e nao e divisivel por 3, entao vamos incrementar x e adicionar o caractere a d
    } else {
      recebeConvertido += valorReverso[i];
      x += 1;
    }
  }
  //# Reverte novamente a string para o formato de ordem original
  let valor2 = recebeConvertido.split("").reverse();
  if (valor2[0] === ".") {
    valor2[0] = "";
  } else if (valor2[0] === "-" && valor2[1] === ".") {
    valor2[1] = "";
  }

  valor2 = "R$ " + valor2.join("");
  return valor2;
}
// // Funcao que recebe o cabecalho e formata ele para o padrao esperado pelo react-table
// function formatarCabe(cabe, opt) {
//   return [
//     {
//       Header: "ID",
//       accessor: "id",
//       disableGlobalFilter: true,
//     },
//     ...cabe.map((ele, idx) => {
//       const _OBJ = {
//         Header: ele,
//         accessor: idx.toString(),
//         Cell: ({ value, row }) => {
//           /** Veja se opt tem envolver, se sim executa a funcao de callback passando value */
//           if (opt?.envolver && opt.envolver?.hasOwnProperty(idx)) {
//             return opt.envolver[idx](value, row.id, row);
//           }
//           return formatarValores(value, idx, opt);
//         },
//         Footer: ({ rows, column }) => {
//           // Verifica se tem uma sobreescricao de valor para o rodape
//           if (opt?.alteraRodape && opt.alteraRodape?.hasOwnProperty(idx)) {
//             return formatarValores(opt.alteraRodape[idx], idx, opt);
//             // if(opt?.monetario && opt.monetario.includes(idx)){
//             //     return converter(opt.alteraRodape[idx]);
//             // }
//             // return opt.alteraRodape[idx];
//           }
//           // // E o campo monetario vamos somar a coluna e retornar o valor
//           if (opt?.monetario && opt.monetario.includes(idx)) {
//             const valor = _.sum(_.map(rows, (r) => r.values[idx]));
//             return converter(valor);
//           }
//           // Se o indice da soma for acionado
//           if (opt?.soma && opt.soma.includes(idx)) {
//             const valor = _.sum(_.map(rows, (r) => r.values[idx]));
//             return valor;
//           }
//           // // Nao precisa de calculo retorne o valor da coluna
//           return column.Header;
//         },
//       };
//       // Verifica se o opt tem os atributos que sao ordenaveis como numero
//       if (opt?.monetario && opt.monetario.includes(idx)) {
//         _OBJ.sortType = (a, b) => (a.values[idx] > b.values[idx] ? 1 : -1);
//       }
//       // Se for percentual
//       if (opt?.percentual && opt.percentual.includes(idx)) {
//         _OBJ.sortType = (a, b) => (a.values[idx] > b.values[idx] ? 1 : -1);
//       }

//       return _OBJ;
//     }),
//   ];
// }
// Funcao que recebe o cabecalho e formata ele para o padrao esperado pelo react-table
function formatarCabe(cabe, opt) {
  const inCabe = [
    {
      Header: "ID",
      accessor: "id",
      disableGlobalFilter: true,
    },
  ];
  //
  let idxContador = 0; // Contador para indexar os cabecalhos
  cabe.forEach((ele, idx) => {
    const _OBJ = {};
    if (ele?.cabecalho) {
      _OBJ["Header"] = ele.cabecalho;
      _OBJ.superCabecalho = true; // Propriedade que permite formatar o superHeader identificando-o na hora de construir a tabela
      _OBJ["idxHeader"] = idx.toString(); // Define o indice para que o header possa ser referenciado para estilização ou substituição
      _OBJ["columns"] = ele.colunas.map((elex, ix) => {
        let novoIX = parseInt(idxContador);
        //
        const obj = {
          Header: elex,
          accessor: novoIX.toString(),
          Cell: ({ value, row }) => {
            /** Veja se opt tem envolver, se sim executa a funcao de callback passando value */
            if (opt?.envolver && opt.envolver?.hasOwnProperty(novoIX)) {
              return opt.envolver[novoIX](value, row.id, row);
            }
            return formatarValores(value, novoIX, opt);
          },
          Footer: ({ rows, column }) => {
            // Verifica se tem uma sobreescricao de valor para o rodape
            if (opt?.alteraRodape && opt.alteraRodape?.hasOwnProperty(novoIX)) {
              return formatarValores(opt.alteraRodape[novoIX], novoIX, opt);
            }
            // // E o campo monetario vamos somar a coluna e retornar o valor
            if (opt?.monetario && opt.monetario.includes(novoIX)) {
              const valor = _.sum(_.map(rows, (r) => r.values[novoIX]));
              return converter(valor);
            }
            // Se o novoIX da soma for acionado
            if (opt?.soma && opt.soma.includes(novoIX)) {
              const valor = _.sum(_.map(rows, (r) => r.values[novoIX]));
              return valor;
            }
            // // Nao precisa de calculo retorne o valor da coluna
            return column.Header;
          },
        };
        // Verifica se o opt tem os atributos que sao ordenaveis como numero
        if (opt?.monetario && opt.monetario.includes(novoIX)) {
          obj.sortType = (a, b) =>
            a.values[novoIX] > b.values[novoIX] ? 1 : -1;
        }
        // Se for percentual
        if (opt?.percentual && opt.percentual.includes(novoIX)) {
          obj.sortType = (a, b) =>
            a.values[novoIX] > b.values[novoIX] ? 1 : -1;
        }
        // Incrementa o indice para não duplicar ao gerar o header customizado
        idxContador++;
        return obj;
      });
    } else {
      // Determina quem é o indice (se tiver cabecalho ele assume o contador)
      let indice = idx;
      _OBJ["Header"] = ele;
      _OBJ["accessor"] = indice.toString();
      _OBJ["Cell"] = ({ value, row }) => {
        /** Veja se opt tem envolver, se sim executa a funcao de callback passando value */
        if (opt?.envolver && opt.envolver?.hasOwnProperty(indice)) {
          return opt.envolver[indice](value, row.id, row);
        }
        return formatarValores(value, indice, opt);
      };
      _OBJ["Footer"] = ({ rows, column }) => {
        // Verifica se tem uma sobreescricao de valor para o rodape
        if (opt?.alteraRodape && opt.alteraRodape?.hasOwnProperty(indice)) {
          return formatarValores(opt.alteraRodape[indice], indice, opt);
        }
        // // E o campo monetario vamos somar a coluna e retornar o valor
        if (opt?.monetario && opt.monetario.includes(indice)) {
          const valor = _.sum(_.map(rows, (r) => r.values[indice]));
          return converter(valor);
        }
        // Se o indice da soma for acionado
        if (opt?.soma && opt.soma.includes(indice)) {
          const valor = _.sum(_.map(rows, (r) => r.values[indice]));
          return valor;
        }
        // // Nao precisa de calculo retorne o valor da coluna
        return column.Header;
      };
      // Verifica se o opt tem os atributos que sao ordenaveis como numero
      if (opt?.monetario && opt.monetario.includes(indice)) {
        _OBJ.sortType = (a, b) =>
          a.values[indice] > b.values[indice] ? 1 : -1;
      }
      // Se for percentual
      if (opt?.percentual && opt.percentual.includes(indice)) {
        _OBJ.sortType = (a, b) =>
          a.values[indice] > b.values[indice] ? 1 : -1;
      }
    }
    inCabe.push(_OBJ);
  });
  return inCabe;
}
// Funcao para formatar o corpo
function formatarCorpo(corpo) {
  return corpo.map((row, idR) => {
    // Se for um row.id pegamos o valor dele, senao criamos um indice
    const reg = row?.id ? { id: row.id } : { id: (idR + 1).toString() };
    // Se for um array pegamos o campo data senao a row
    /**
     * Se for um objeto com {data, id} entao pega o valor de data
     * Caso row nao seja um array pegue os valor dos objetos envolvidos
     * Por fim so pode ser um array recupere-o
     */
    const linha =
      row?.data && Array.isArray(row.data)
        ? row.data
        : !Array.isArray(row)
        ? Object.keys(row).map((key) => row[key])
        : row;

    linha.forEach((cell, idx) => {
      reg[idx] = cell;
    });
    // Se o valor da linha for '--' entao devemos atribuir o id '--'
    if (linha[0] === "--") reg["id"] = "--";

    return reg;
  });
}

// Componente para exibir o filtro
const Filtro = memo(
  ({ isMobile, desativarPesquisaLenta, totalRegistros, filtro, setFiltro }) => {
    const [aguardar, setAguardar] = useState(false);
    // Cria um estado para determinar quando o usuario deixou de digitar
    const [valor, setValor] = useState(filtro || "");
    // Utiliza o useDebounce para determinar que depois de 500ms podemos aplicar o filtro
    const [,] = useDebounce(
      () => {
        // Valor pode ser atualizado
        setFiltro(valor);
        setAguardar(false);
      },
      desativarPesquisaLenta ? 1 : 500,
      [valor]
    );

    return (
      <Stack flex={1} direction="row-reverse">
        <Stack flex={1} direction="row" alignItems="center">
          <Hidden mdDown>
            <Typography sx={{ mx: 1 }} variant="body2" fontWeight="bold">
              {`Total: ${totalRegistros}`}
            </Typography>
          </Hidden>
          <TextField
            size="small"
            fullWidth={isMobile}
            placeholder="Digite o que procura..."
            label="Filtro"
            type="search"
            value={valor}
            sx={{ mb: 0.5 }}
            onChange={(e) => {
              setValor(e.target.value);
              !desativarPesquisaLenta && setAguardar(true);
            }}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: aguardar ? (
                <CircularProgress sx={{ mr: 1 }} size={20} />
              ) : (
                <SearchIcon color="primary" />
              ),
            }}
          />
        </Stack>
      </Stack>
    );
  }
);

const Tabela = (props) => {
  // Extraindo propriedades a serem usadas
  const {
    alteraRodape,
    percentual,
    styleTD,
    styleTH,
    baixar_em_excel,
    telefone,
    soma,
    dataCustom,
    ocultarFiltro,
    ocultarColuna,
    styleCabe,
    styleRodape,
    style,
    styleCorpo,
    sxCabecalho,
    sxSuperCabecalho,
    calcularRodape,
    data,
    dataHora,
    monetario,
    envolver,
    styleSuperCabecalho,
    tamanho,
    render,
    cabe,
    corpo,
    styleTrSelecionado,
    onContextMenu,
    defaultFiltro,
    setDefaultFiltro,
    onClickTd,
    styleTDSelecionado,
    validarValorNegativo,
  } = props;
  const optTabela = {
    percentual,
    telefone,
    dataCustom,
    soma,
    data,
    monetario,
    envolver,
    alteraRodape,
  };

  const [buscaColuna, setBuscaColuna] = useState("");
  const [pagina, setPagina] = useState(1);

  const columns = useMemo(
    () =>
      formatarCabe(cabe, {
        telefone,
        dataCustom,
        soma,
        data,
        dataHora,
        monetario,
        envolver,
        percentual,
        alteraRodape,
      }),
    [
      dataHora,
      alteraRodape,
      percentual,
      telefone,
      dataCustom,
      soma,
      data,
      monetario,
      envolver,
      cabe,
    ]
  );
  const registros = useMemo(
    () => formatarCorpo(corpo.length > 0 ? corpo : [cabe.map((ele) => "--")]),
    [corpo, cabe]
  );
  // Verifica se o corpo esta sofrendo atualizacao
  useEffect(() => {
    // Se o corpo esta sendo atualizado devolva a pagina para 1
    setPagina(1);
  }, [setPagina, corpo]);
  // Para menu de exibicao para ocultar campos das tabelas
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fnExibir = useCallback((e) => setAnchorEl(e.currentTarget), []);
  const fnFechar = useCallback(() => setAnchorEl(null), []);
  // Funcao de callback usada para alterar a visualizacao da coluna
  const fnOcultarColuna = useCallback((e, onChange) => {
    onChange(e);
  }, []);

  // Criando os dados para a tabela
  const instance = useTable(
    {
      columns,
      data: registros,
      initialState: { hiddenColumns: ["id"], globalFilter: defaultFiltro },
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );
  // Extraindo da instancias as props usadas para a tabela
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    allColumns,
    footerGroups,
    prepareRow,
    setHiddenColumns,
    toggleAllRowsSelected,
    rows,
    state: { hiddenColumns, globalFilter },
    selectedFlatRows,
    setGlobalFilter,
  } = instance;

  // Assim que a tabela e criada veja se tem colunas para serem salvas como ocultas
  useEffect(() => {
    const _localStorage = window?.localStorage?.getItem(
      `TABELA_OCULTA_COLUNA_${window.location.pathname}`
    );
    // Salva a coluna a ser oculta
    if (_localStorage) {
      setHiddenColumns(JSON.parse(_localStorage));
    }
  }, [setHiddenColumns]);

  // Fatiamento dos registros (PONTO QUE PRECISA DE MELHORIA)
  const fatiaRegistros = useMemo(
    () =>
      pagina === null || globalFilter ? rows : rows.slice(0, pagina * 100),
    [rows, pagina, globalFilter]
  );

  // Se a quantidade de registros for menor que 101 nao
  //
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    //loading: aguardar,
    // Somente ativa o observer do scroll se rows for maior que  100
    hasNextPage:
      rows.length > 100 &&
      pagina &&
      !globalFilter &&
      corpo.length > fatiaRegistros.length,
    onLoadMore: () => {
      setPagina((state) => state + 1);
    },
    delayInMs: 400,
    //disabled: aguardar,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });
  // UseEffect que vai registrar as colunas ocultas para salvar na pagina
  useEffect(() => {
    const _localStorage = window?.localStorage;
    // Salva a coluna a ser oculta
    if (_localStorage) {
      _localStorage.setItem(
        `TABELA_OCULTA_COLUNA_${window.location.pathname}`,
        JSON.stringify(hiddenColumns)
      );
    }
  }, [hiddenColumns]);

  // o useEffect para ver se a quantidade de registros fatiados e igual a quantidade normal
  //   useEffect(()=>{
  //       // Se tiver atingido o limite de registros defina o pagina como null pois não devemos pedir mais registros a tabela
  //       if( !globalFilter && fatiaRegistros.length >= rows.length ) setPagina(null);
  //       //

  //   }, [corpo, pagina, fatiaRegistros, rows, globalFilter]);

  const fnSetFiltro = useCallback(
    (filtro) => {
      setGlobalFilter(filtro);
      if (setDefaultFiltro) setDefaultFiltro(filtro);
    },
    [setGlobalFilter, setDefaultFiltro]
  );

  // veja se tem rowID selecionado
  let trSelecionado, trSelecionadoDados;
  if (selectedFlatRows?.length > 0) {
    trSelecionado =
      selectedFlatRows[0].values["id"] === "--"
        ? null
        : selectedFlatRows[0].values["id"];
    trSelecionadoDados = Object.keys(selectedFlatRows[0].values).map(
      (key) => selectedFlatRows[0].values[key]
    );
  }
  // Conta a quantidade de colunas ocultas
  const qtdColunaOculta = useMemo(
    () => hiddenColumns.filter((ele) => ele !== "id").length,
    [hiddenColumns]
  );
  //
  const isMobile = useMediaQuery(useTheme()?.breakpoints?.down("md"));

  return (
    <>
      <Stack
        spacing={0.5}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "flex-end" }}
      >
        <Stack alignItems="center" direction="row">
          {baixar_em_excel && (
            <BaixarEmExcel
              optTabela={optTabela}
              cabe={cabe}
              corpo={corpo}
              URL={baixar_em_excel}
            />
          )}
          {render ? render({ trSelecionadoDados, trSelecionado }) : <span />}
        </Stack>
        <Stack flex={isMobile ? 1 : false} direction="row">
          {ocultarColuna && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={fnFechar}
            >
              <Stack
                spacing={1}
                sx={{ px: 1, overflowY: "auto", maxHeight: "60vh" }}
              >
                <TextField
                  variant="standard"
                  label="Procurar"
                  placeholder="Digite o nome da coluna..."
                  InputLabelProps={{ shrink: true }}
                  sx={{ px: 0.5 }}
                  size="small"
                  defaultValue={buscaColuna}
                  onChange={(e) => setBuscaColuna(e.target.value.toLowerCase())}
                  type="search"
                />
                {allColumns?.map((column) => {
                  if (
                    buscaColuna.length > 0 &&
                    column.Header.toLowerCase().search(buscaColuna) === -1
                  )
                    return null;
                  const { checked, onChange } = column.getToggleHiddenProps();
                  return (
                    <FormControlLabel
                      key={column.Header}
                      control={
                        <Checkbox
                          inputProps={{ "aria-label": "controlled" }}
                          checked={checked}
                          onChange={(e) => fnOcultarColuna(e, onChange)}
                        />
                      }
                      label={column.Header}
                    />
                  );
                })}
              </Stack>
            </Menu>
          )}
          {ocultarColuna && (
            <IconButton
              onClick={fnExibir}
              title={
                qtdColunaOculta > 0
                  ? `Você ocultou ${qtdColunaOculta} colunas`
                  : "Oculte algumas colunas que não esta utilizando"
              }
            >
              <Badge variant="dot" color="error" badgeContent={qtdColunaOculta}>
                <TableViewIcon color="primary" />
              </Badge>
            </IconButton>
          )}
          {ocultarFiltro ? (
            <div />
          ) : (
            <Filtro
              desativarPesquisaLenta={corpo.length < 500}
              filtro={globalFilter}
              setFiltro={fnSetFiltro}
              totalRegistros={rows?.length}
              isMobile={isMobile}
            />
          )}
        </Stack>
      </Stack>
      {/* <div style={{ maxHeight: tamanho }} ref={rootRef} id="tabela"> */}
      <Div style={{ maxHeight: tamanho }} ref={rootRef}>
        {/* <table style={style} {...getTableProps()}> */}
        <Table style={style} {...getTableProps()}>
          {/* <thead> */}
          <Thead>
            {headerGroups.map((headerGroup) => (
              <tr style={styleCabe} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <ThCabe
                    key={column.getHeaderProps().key}
                    column={column}
                    sxCabecalho={sxCabecalho}
                    sxSuperCabecalho={sxSuperCabecalho}
                    isSorted={column.isSorted}
                    isSortedDesc={column.isSortedDesc}
                    styleSuperCabecalho={styleSuperCabecalho}
                    styleTH={styleTH}
                  />
                ))}
              </tr>
            ))}
            {/* </thead> */}
          </Thead>
          <tbody style={styleCorpo} {...getTableBodyProps()}>
            {/* Casos onde nao temos nenhum registro a ser exibido */}
            {fatiaRegistros.length === 0 &&
              //   cabe.map((ele, idx) => <td key={idx}> -- </td>)}
              cabe.map((ele, idx) => <Td key={idx}> -- </Td>)}
            {fatiaRegistros.map((row, idxR) => {
              prepareRow(row);
              return (
                <TrCorpo
                  validarValorNegativo={validarValorNegativo}
                  onContextMenu={onContextMenu}
                  key={idxR}
                  isSelected={row.isSelected}
                  styleTD={styleTD}
                  styleTrSelecionado={styleTrSelecionado}
                  row={row}
                  toggleAllRowsSelected={toggleAllRowsSelected}
                  onClickTd={onClickTd}
                  styleTDSelecionado={styleTDSelecionado}
                />
              );

              // return (
              //     <tr style={row.isSelected ? styleTrSelecionado : {}} onClick={()=> {
              //             toggleAllRowsSelected(false);
              //             row.toggleRowSelected(!row.isSelected);
              //     }} {...row.getRowProps()}

              //     >
              //         {
              //         row.cells.map((cell, idxC)=>{

              //             return (
              //                 <td {...cell.getCellProps()} style={Object.keys(styleTD).includes(idxC.toString()) ? styleTD[idxC] : {}}>
              //                     {cell.render('Cell')}
              //                 </td>
              //             )
              //         })
              //     }
              //     </tr>
              // )
            })}
          </tbody>
          {calcularRodape && (
            // <tfoot style={styleRodape}>
            <TFoot>
              {footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getHeaderGroupProps()}>
                  {footerGroup.headers.map((column) => {
                    const inSX = styleTH?.hasOwnProperty(column.id)
                      ? styleTH[column.id]
                      : {
                          ...sxCabecalho,
                          ...styleRodape,
                        };

                    return (
                      <Th {...column.getHeaderProps()}>
                        {column.idxHeader ? null : (
                          <Paper
                            sx={inSX}
                            //sx={sxCabecalho}
                            elevation={2}
                          >
                            <Stack
                              sx={{ pl: 0.5 }}
                              alignItems="center"
                              direction="row"
                              justifyContent="flex-start"
                            >
                              {column.render("Footer")}
                            </Stack>
                          </Paper>
                        )}
                      </Th>
                    );
                  })}
                </tr>
              ))}
              {/* </tfoot> */}
            </TFoot>
          )}
          {/* </table> */}
        </Table>
        {/* Isto previne que o loading fique aparecendo mesmo em registros menores que 100 */}
        {pagina &&
          corpo.length > 100 &&
          !globalFilter &&
          corpo.length > fatiaRegistros.length && (
            <Stack ref={sentryRef} direction="row" justifyContent="center">
              <CircularProgress size={20} />
            </Stack>
          )}
        {/* </div> */}
      </Div>
    </>
  );
};
const sxIcone = { fontSize: 12 };
// Componente do cabecalho
const ThCabe = memo(
  ({
    column,
    isSorted,
    isSortedDesc,
    sxCabecalho,
    sxSuperCabecalho,
    styleSuperCabecalho,
    styleTH,
  }) => (
    <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
      {/* <th {...column.getHeaderProps(column.getSortByToggleProps())}> */}
      <Paper
        sx={
          styleSuperCabecalho &&
          styleSuperCabecalho?.hasOwnProperty(column.idxHeader)
            ? styleSuperCabecalho[column.idxHeader]
            : column?.superCabecalho
            ? sxSuperCabecalho
            : styleTH && styleTH?.hasOwnProperty(column.id)
            ? styleTH[column.id]
            : sxCabecalho
        }
        elevation={2}
      >
        <Stack alignItems="center" direction="row" justifyContent="center">
          {column?.superCabecalho ? null : isSorted ? (
            isSortedDesc ? (
              <KeyboardArrowDownIcon sx={sxIcone} />
            ) : (
              <KeyboardArrowUpIcon sx={sxIcone} />
            )
          ) : (
            <UnfoldMoreIcon sx={sxIcone} />
          )}

          {column.render("Header")}
        </Stack>
      </Paper>
      {/* </th> */}
    </Th>
  )
);
// Componente para o registro (tr)
const TrCorpo = memo(
  ({
    styleTD,
    row,
    onContextMenu,
    isSelected,
    styleTrSelecionado,
    toggleAllRowsSelected,
    onClickTd,
    styleTDSelecionado,
    validarValorNegativo,
  }) => {
    // Verifica se tem valor negativo
    const isValorNegativo = validarValorNegativo
      ? row.cells?.some((val) =>
          !isNaN(val.value) && val.value < 0 ? true : false
        )
      : false;
    const styleNegativo = { color: "red" };

    return (
      <tr
        style={
          isValorNegativo ? styleNegativo : isSelected ? styleTrSelecionado : {}
        }
        onClick={() => {
          toggleAllRowsSelected(false);
          row.toggleRowSelected(!isSelected);
        }}
        {...row.getRowProps()}
      >
        {row.cells.map((cell, idxC) => {
          return (
            <TdCorpo
              onContextMenu={onContextMenu}
              trSelecionado={row?.original?.id}
              key={idxC}
              cell={cell}
              idxC={idxC}
              styleTD={styleTD}
              onClickTd={onClickTd}
              styleTDSelecionado={styleTDSelecionado}
            />
          );
        })}
      </tr>
    );
  }
);
// Componente para registro de um td (para o corpo)
const TdCorpo = memo(
  ({
    onContextMenu,
    trSelecionado,
    cell,
    idxC,
    styleTD,
    onClickTd,
    styleTDSelecionado,
  }) => {
    const {
      palette: { mode },
    } = useTheme();
    return (
      //   <td
      <Td
        isDark={mode === "dark"}
        {...cell.getCellProps()}
        style={
          Object.keys(styleTD).includes(idxC.toString())
            ? styleTD[idxC]
            : _.keys(styleTDSelecionado).includes(`${trSelecionado}_${idxC}`)
            ? styleTDSelecionado[`${trSelecionado}_${idxC}`]
            : {}
        }
        onClick={
          onClickTd
            ? () =>
                onClickTd(
                  trSelecionado,
                  cell.column.id,
                  cell.column.Header,
                  cell.value
                )
            : null
        }
        onContextMenu={
          onContextMenu
            ? (evt) => onContextMenu({ evt, trSelecionado })
            : () => {}
        }
      >
        {cell.render("Cell")}
        {/* </td> */}
      </Td>
    );
  }
);
// Componente que representa o botão para permitir a baixa em excel
const BaixarEmExcel = memo(({ cabe, corpo, optTabela, URL }) => {
  const [intencaoBaixar, setIntencaoBaixar] = useState(null);
  const fnFechar = useCallback(
    () => setIntencaoBaixar(false),
    [setIntencaoBaixar]
  );
  const isMobile = useMediaQuery(useTheme()?.breakpoints?.down("md"));

  return (
    <>
      {intencaoBaixar &&
        (isMobile ? (
          <Drawer
            corpo={
              <ModalDownloadExcel
                cabe={cabe}
                corpo={corpo}
                optTabela={optTabela}
                URL={URL}
                fnFechar={fnFechar}
              />
            }
            fecharDrawer={fnFechar}
          />
        ) : (
          <DialogoExibicao
            fecharDialogo={fnFechar}
            corpo={
              <ModalDownloadExcel
                cabe={cabe}
                corpo={corpo}
                optTabela={optTabela}
                URL={URL}
                fnFechar={fnFechar}
              />
            }
          />
        ))}
      <IconButton
        size="small"
        disableRipple
        onClick={() => setIntencaoBaixar(true)}
        sx={{
          borderRadius: "100%",
          mr: 1,
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: (theme) => theme.palette.secondary.contrastText,
        }}
        title="Clique para baixar a planilha em Excel"
      >
        <FileDownloadIcon />
      </IconButton>
    </>
  );
});
// Modal para escolher as colunas a baixar
const ModalDownloadExcel = memo(({ fnFechar, cabe, corpo, optTabela, URL }) => {
  //
  const [baixar, setBaixar] = useState(cabe.map((ele, idx) => idx));
  // Verifica se tem campos ja marcados no localstorage e atualiza
  useEffect(() => {
    const _localStorage = window?.localStorage?.getItem(
      `TABELA_${window.location.pathname}`
    );
    // Se tiver campos salvos no localstorage traga eles para gerar o estado inicial
    if (_localStorage) {
      setBaixar(JSON.parse(_localStorage));
    }
  }, []);
  // Formatar os campos da tabela baseado no conteudo de optTabela
  const novoCorpo = formatarParaDownload(corpo, optTabela);
  // Funcao com acionamento do Download para excel
  const fnBaixar = () => {
    // Pega as colunas selecionadas e fatia o array
    const _arr = [];
    const _copiaCabe = cabe.filter((ele, idx) => baixar.includes(idx));

    novoCorpo.forEach((ele) => {
      const _arrInterno = [];
      ele.forEach((item, idx) => {
        if (baixar.includes(idx)) {
          _arrInterno.push(item);
        }
      });
      _arr.push(_arrInterno);
    });
    // Grava os campos no local_storage
    window?.localStorage?.setItem(
      `TABELA_${window.location.pathname}`,
      JSON.stringify(_copiaCabe.map((ele) => cabe.indexOf(ele)))
    );

    baixarEmExcel(URL, _copiaCabe, _arr, fnFechar);
  };
  // Funcao que marca/desmarca todos
  const fnMarcarDesmarcar = useCallback(
    (e) => {
      if (e.target.checked) {
        setBaixar(cabe.map((ele, idx) => idx));
      } else {
        setBaixar([]);
      }
    },
    [cabe]
  );
  // Funcao que marca/desmarca uma coluna
  const fnMarcarDesmarcarUma = useCallback((e, ele) => {
    if (e.target.checked) {
      // Marca a opcao mencionada
      setBaixar((state) => [...state, ele]);
    } else {
      // Retira a opcao mencionada
      setBaixar((state) => {
        const copia = state.slice();
        if (state.includes(ele)) {
          const idx = copia.indexOf(ele);
          if (idx !== -1) copia.splice(idx, 1);
        }
        return copia;
      });
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack spacing={1}>
        <Typography variant="subtitle2" align="center">
          Escolha as colunas que deseja baixar
        </Typography>
        <Typography variant="caption" align="center" sx={{ opacity: 0.7 }}>
          Marque as colunas que deseja retirar do Download do arquivo em Excel.
          Suas opções ficaram salvas a próxima vez que abrir.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={fnMarcarDesmarcar}
              checked={baixar.length === cabe.length}
            />
          }
          label="MARCAR/DESMARCAR TODAS COLUNAS"
        />
        <Divider />
        <Stack sx={{ maxHeight: "50vh", overflowY: "auto" }}>
          {cabe.map((ele, idx) => (
            <FormControlLabel
              key={ele}
              control={
                <Checkbox
                  onChange={(e) => fnMarcarDesmarcarUma(e, idx)}
                  sx={{ ml: 1.5 }}
                  checked={baixar.includes(idx)}
                />
              }
              label={ele}
            />
          ))}
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            startIcon={<FileDownloadIcon />}
            variant="contained"
            onClick={fnBaixar}
          >
            BAIXAR EM EXCEL
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
});
//
Tabela.propTypes = {
  /** Props que determina um valor default para filtro (casos onde externamente os dados mudam e um valor de filtro ja precisa ser enviado ) */
  defaultFiltro: PropTypes.string,
  /** Função de callback para atualizar o filtro enviado externamente por default */
  setDefaultFiltro: PropTypes.func,
  /** Esta props recebe uma função de callback que repassa o evento (evt) e o trSelecionado para que você possa carregar um menu de contexto. Você deve cuidar da renderização do menu (Veja como usar um menu no @mui) */
  onContextMenu: PropTypes.func,
  /** Objeto que representa parametros como passados para a props sx em componentes Mui (pois o cabecalho é um Paper) */
  sxCabecalho: PropTypes.object,
  /** Objeto que representa parametros como passados para a props sx em componentes Mui (pois o cabecalho é um Paper). Ele formata um cabecalho que fica acima do header da tabela (vide cabe) */
  sxSuperCabecalho: PropTypes.object,
  /** Funcao que irá disponibilizar uma props com trSelecionado e trSelecionadoDados e retornará um componente */
  render: PropTypes.func,
  /** Recebe o tamanho da tabela em numero (600) ou string ('650px' ou '65vh') */
  tamanho: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Objeto que é um array de Strings que compoem o cabecalho da tabela. Ou caso vá usar superCabecalhos deve ser um array com cabecalho e colunas. EX: [{cabecaho: 'INFO', colunas: ['NOME', 'SOBRENOME', 'EMAIL]}, {cabecalho: 'CONTATO', colunas: ['CELULAR', 'FIXO']} ] */
  cabe: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        cabecalho: PropTypes.string,
        colunas: PropTypes.arrayOf(PropTypes.string),
      }),
    ])
  ).isRequired,
  /** Um array com outro array dentro ou um objeto {id: idx, data: Array} */
  corpo: PropTypes.array.isRequired,
  /** Um array de numeros que representam os indices das colunas que devem ser formatadas para data */
  data: PropTypes.arrayOf(PropTypes.number),
  /** Um objeto que determina o indice e a formatacao de data que deve ser aplicada */
  dataCustom: PropTypes.object,
  /** Um array de numeros que representam os indices das colunas que devem ser formatadas para monetario */
  monetario: PropTypes.arrayOf(PropTypes.number),
  /** Um array de numeros que representa os indices das colunas que devem ter o seu valor de soma aplicado */
  soma: PropTypes.arrayOf(PropTypes.number),
  /** Um objeto numeros que são os indices das colunas que receberam um componente internamente executando a função passada como valor desta chave {1: ()=> {} } */
  envolver: PropTypes.objectOf(PropTypes.number),
  /** Um objeto numeros que são os indices das colunas do superCabecalho que retornam um objeto style para estilização daquela coluna do superCabecalho */
  styleSuperCabecalho: PropTypes.object,
  /** Um objeto que determina um estilo a ser aplicado ao registro selecionado ex: {backgroundColor: 'red', 'color': 'white'} */
  styleTrSelecionado: PropTypes.object,
  /** Um objeto que determina um estilo a ser aplicado ao corpo da tabela */
  styleCorpo: PropTypes.object,
  /** Um objeto que determina um estilo a ser aplicado a toda a tabela */
  style: PropTypes.object,
  /** Um objeto que determina um estilo a ser aplicado o cabecalho da tabela */
  styleCabe: PropTypes.object,
  /** Um objeto que determina um estilo a ser aplicado no rodape da tabela */
  styleRodape: PropTypes.object,
  /** Um boleano que determina se devemos exibir o rodape da tabela ou nao */
  calcularRodape: PropTypes.bool.isRequired,
  /** Um boleano que determina se vamos disponibilizar a opcao para ocultar colunas */
  ocultarColuna: PropTypes.bool,
  /** Uma string que determina se os dados da tabela devem ser enviados para baixa do arquivo em excel */
  baixar_em_excel: PropTypes.string,
  /** Define quais colunas devem ser formatadas em percentual */
  percentual: PropTypes.arrayOf(PropTypes.number),
  /** Define estilizacao para as celulas */
  styleTD: PropTypes.object,
  /** Define estilizacao para as colunas do cabecalho */
  styleTH: PropTypes.object,
  /** Esta props recbe um objeto indexado que permite sobreescrever o rodape */
  alteraRodape: PropTypes.objectOf(PropTypes.number),
  /** Permite executar uma função de callback quando uma celula for clicada, expondo informações como o trSelecionado, nome da coluna, indice da coluna e valor do campo. EX: onClickTd(trSelecionado, idColuna, nomeColuna, valorColuna) */
  onClickTd: PropTypes.func,
  /** Permite definir uma estilização a uma celula ou mais celulas informadas. A chave do objeto deve ser trSelecionado_indiceColuna. EX: { '1425_2': {color: 'blue'} }*/
  styleTDSelecionado: PropTypes.objectOf(PropTypes.string),
  /** Permite aplicar um indicativo a valores negativos no registro. Automtaticamente inclui uma fonte vermelha nos registros onde algum campo ser determinado como negativo */
  validarValorNegativo: PropTypes.bool,
};
//
Tabela.defaultProps = {
  defaultFiltro: "",
  style: {},
  ocultarColuna: false,
  styleCabe: {},
  styleCorpo: {},
  styleTD: {},
  styleRodape: {},
  styleTH: {},
  sxCabecalho: {
    borderRadius: 0,
    color: (theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme) => theme.palette.primary.main,
    m: 0,
    p: 1,
  },
  sxSuperCabecalho: {
    borderRadius: 0,
    color: (theme) => theme.palette.primary.contrastText,
    backgroundColor: (theme) => theme.palette.primary.light,
    m: 0,
    p: 1,
  },
  tamanho: "60vh",
  calcularRodape: false,
  styleTrSelecionado: { backgroundColor: "", color: "" },
};

export default memo(Tabela);
