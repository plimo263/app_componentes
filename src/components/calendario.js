import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  addDays,
  subDays,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  subMonths,
  addMonths,
  parseISO,
  format,
} from "date-fns";
import {
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  Paper,
  Container,
  CircularProgress,
  Grid,
  Grow,
} from "@mui/material";
import { H6, Caption } from "./tipografia";
// Icones
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ptBR } from "date-fns/locale";
import { useToggle } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import DrawerExibicao from "./drawer";

//
const sxCol = {
  width: "calc(14.28% - 16px)",
  p: 1,
  borderRadius: 0,
};
//
const nomeDias = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const diaDehoje = format(new Date(), "yyyy-MM-dd");

const Calendario = ({
  aguardar,
  onControleCalendario,
  sxCabe,
  sxCorpo,
  dataInicial,
  render,
  renderEstiloDia,
  onClick,
  renderModalLateral,
}) => {
  const [mesAtual, setMesAtual] = useState(dataInicial);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  //
  const {
    recuarMes,
    avancarMes,
    diasCalendario,
    ultimosDiasMesAnterior,
    primeirosDiasMesPosterior,
  } = gerarDiasCalendario(mesAtual);
  // Veja se é mobile
  const isMobile = useMediaQuery(useTheme()?.breakpoints?.down("md"));
  // Alterando para o proximo (ou anterior) mês
  const fnRecuar = useCallback(() => {
    // Formata para pegar  o primeiro e ultimo dia do mes posterior
    if (onControleCalendario) {
      const priDia = format(startOfMonth(parseISO(recuarMes)), "yyyy-MM-dd");
      const ultDia = format(endOfMonth(parseISO(recuarMes)), "yyyy-MM-dd");
      onControleCalendario(priDia, ultDia, "recuar");
    }

    setMesAtual(recuarMes); // primeiro dia do mes anterior
  }, [recuarMes, onControleCalendario]);
  const fnAvancar = useCallback(() => {
    // Formata para pegar  o primeiro e ultimo dia do mes posterior
    if (onControleCalendario) {
      const priDia = format(startOfMonth(parseISO(avancarMes)), "yyyy-MM-dd");
      const ultDia = format(endOfMonth(parseISO(avancarMes)), "yyyy-MM-dd");
      onControleCalendario(priDia, ultDia, "avancar");
    }
    //
    setMesAtual(avancarMes); // primeiro dia do mes posterior
  }, [avancarMes, onControleCalendario]);
  // Funcao para selecionar dia
  const fnSelecionarDia = useCallback(
    (diaFormatado, desabilitar) => {
      if (!desabilitar && !aguardar) onClick(diaFormatado);
      // Verifica se tem o renderModalLateral
      if (renderModalLateral) {
        // Se o dia ja tiver sido selecionado vai ocultar o dia selecionado para recolher o modal lateral
        if (diaFormatado === diaSelecionado) {
          setDiaSelecionado(null);
        } else {
          // Defina o dia formatado para que o mesmo acione o renderModalLateral para exibir o modal lateral
          setDiaSelecionado(diaFormatado);
        }
      }
    },
    [aguardar, onClick, renderModalLateral, diaSelecionado, setDiaSelecionado]
  );
  // Funcao de callback para fechar o drawer que é exibido quando se utiliza a renderizacao lateral
  const fnFecharDrawer = useCallback(() => {
    setDiaSelecionado(null);
  }, [setDiaSelecionado]);

  return (
    <Container disableGutters maxWidth="lg">
      {isMobile && diaSelecionado && (
        <DrawerExibicao
          fecharDrawer={fnFecharDrawer}
          corpo={
            <Paper sx={{ minHeight: "50vh" }}>
              {renderModalLateral(diaSelecionado)}
            </Paper>
          }
        />
      )}
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button
            disabled={aguardar}
            onClick={fnRecuar}
            title="Mês anterior"
            startIcon={
              aguardar ? <CircularProgress size={20} /> : <ArrowBackIosIcon />
            }
          >
            {!isMobile && "Recuar"}
          </Button>
          <H6>
            {_.capitalize(format(parseISO(mesAtual), "MMMM", { locale: ptBR }))}{" "}
            - {format(parseISO(mesAtual), "yyyy", { locale: ptBR })}
          </H6>
          <Button
            disabled={aguardar}
            onClick={fnAvancar}
            title="Próximo mês"
            endIcon={
              aguardar ? (
                <CircularProgress size={20} />
              ) : (
                <ArrowForwardIosIcon />
              )
            }
          >
            {!isMobile && "Avançar"}
          </Button>
        </Stack>
        <Stack direction="row">
          <AnimatePresence>
            {diaSelecionado && !isMobile && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "33.33%", transition: { duration: 0.2 } }}
                exit={{ width: 0.01, transition: { duration: 0.1 } }}
                key="modalLateral"
              >
                <Paper sx={{ minHeight: "100%" }}>
                  {renderModalLateral(diaSelecionado)}
                </Paper>
              </motion.div>
            )}
            <Stack sx={{ zIndex: 2 }} flex={1}>
              <Stack direction="row">
                {nomeDias.map((ele, idx) => (
                  <CalendarioHeader
                    key={idx}
                    isMobile={isMobile}
                    ele={ele}
                    sxCol={sxCol}
                    sxCabe={sxCabe}
                  />
                ))}
              </Stack>
              <Stack direction="row" flexWrap="wrap">
                {diasCalendario?.map((ele, idx) => {
                  const diaFormatado = format(ele, "yyyy-MM-dd");
                  const diaNumero = format(ele, "dd");
                  // Veja se o dia é o dia de hoje
                  const isHoje = diaDehoje === diaFormatado;
                  // Verifica se o dia em questão faz parte dos dias que devem ser "desabilitados"
                  const desabilitar =
                    primeirosDiasMesPosterior?.includes(ele) ||
                    ultimosDiasMesAnterior?.includes(ele);
                  const sxEstiloDia = renderEstiloDia
                    ? renderEstiloDia(diaFormatado)
                    : {};

                  return (
                    <Paper
                      onClick={() => fnSelecionarDia(diaFormatado, desabilitar)}
                      key={idx}
                      sx={{ ...sxCol, ...sxCorpo, ...sxEstiloDia }}
                    >
                      <Stack alignItems="flex-start" spacing={1}>
                        <Caption
                          title="Hoje"
                          sx={{ typography: isHoje ? "h6" : "caption" }}
                          fontWeight={isHoje ? "bold" : "normal"}
                          color={
                            isHoje
                              ? "primary.main"
                              : desabilitar
                              ? "text.disabled"
                              : ""
                          }
                        >
                          {diaNumero}
                        </Caption>
                        {render && render(diaFormatado)}
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </Stack>
          </AnimatePresence>
        </Stack>
      </Stack>
    </Container>
  );
};
// Cabecalho do calendario
const CalendarioHeader = memo(({ isMobile, ele, sxCol, sxCabe }) => (
  <Paper sx={{ ...sxCol, ...sxCabe }}>
    <H6> {isMobile ? ele.substring(0, 1) : ele} </H6>
  </Paper>
));

Calendario.defaultProps = {
  sxCabe: {
    backgroundColor: (theme) => theme.palette.secondary.main,
    color: (theme) => theme.palette.secondary.contrastText,
  },
  sxCorpo: {
    height: "72px",
  },
  onClick: () => {},
};
// Definindo valor das propriedades default
Calendario.propTypes = {
  /** valor props sx que pode ser passada para formatar o cabecalho */
  sxCabe: PropTypes.object,
  /** valor props sx que pode ser passada para formatar as celulas do calendário */
  sxCorpo: PropTypes.object,
  /** A data inicial para começar o calendario, ou seja o mês que ele vai abrir YYYY-MM-DD  */
  dataInicial: PropTypes.string.isRequired,
  /** Funcão de callback que recebe o dia sendo clicado (YYYY-MM-DD) => {} */
  onClick: PropTypes.func,
  /** Funcão que vai receber o dia e espera um retorno (informativo) para ser inserido abaixo do dia (como um componente) (YYYY-MM-DD)=> <h6>DATA MARCADA</h6> */
  render: PropTypes.func,
  /** Uma função de callback que você pode passar e retornar um objeto (props sx) para estilizar o campo do dia selecionado, sua responsabilidade garantir um retorno de objeto (mesmo que seja vazio {}) */
  renderEstiloDia: PropTypes.func,
  /** Uma funcao de callback que é acionada para controlar os avanços/recuos do calendário. Ele recebe primeiro e ultimo dia do mês e qual controle foi acionado. EX: (2022-04-01, 2022-04-30, 'recuar') => {} */
  onControleCalendario: PropTypes.func,
  /** Uma props que trava qualquer interatividade do calendario quando ativa */
  aguardar: PropTypes.bool,
  /** Uma funcao de callback que receberá o dia e possibilitará ao usuario retornar um componente que vai representar o conteudo dentro do modal lateral que vai abrir ao ser selecionado. Caso o dia volte a ser clicado o modalLateral volta a se fechar. EX: (dia)=>(<div>O dia é dia</div>) */
  renderModalLateral: PropTypes.func,
};

// Recebe a data e cria o calendario com os dias corretos
const gerarDiasCalendario = (anoMesDia) => {
  // Registra o mes atual
  const anoMesAtual = parseISO(anoMesDia);

  const arr = eachDayOfInterval({
    start: startOfMonth(anoMesAtual),
    end: endOfMonth(anoMesAtual),
  });
  // Pega o primeiro dia e veja qual dia ele é na semana
  const primeiroDiaMes = getDay(arr[0]);
  const ultimoDiaMes = getDay(arr[arr.length - 1]);
  // Dias do mes anterior
  let ultimosDiasMesAnterior;
  let primeirosDiasMesPosterior;

  // Verifica se o primeiro dia do mes é maior que 0
  if (primeiroDiaMes > 0) {
    // Recue pela quantidade de dias da semana que avançaram
    const primeiroDiaSemana = subDays(arr[0], primeiroDiaMes);

    // Pega os dias até (mas não) a data do primeiro dia do mês
    ultimosDiasMesAnterior = eachDayOfInterval({
      start: primeiroDiaSemana,
      end: subDays(arr[0], 1),
    });
  }
  //  Veja se o ultimo dia do mes é menor que 6
  if (ultimoDiaMes < 6) {
    const ultimoDiaDaSemana = addDays(arr[arr.length - 1], 6 - ultimoDiaMes);
    // Pega os dias até (mas não) a data do ultimo dia do mes
    primeirosDiasMesPosterior = eachDayOfInterval({
      start: addDays(arr[arr.length - 1], 1),
      end: ultimoDiaDaSemana,
    });
  }
  // Botoes de controle para o proximo mes e o mes anterior
  const recuarMes = format(subMonths(anoMesAtual, 1), "yyyy-MM-dd");
  const avancarMes = format(addMonths(anoMesAtual, 1), "yyyy-MM-dd");
  //

  // Obtendo os dias do calendario
  let diasCalendario = ultimosDiasMesAnterior ? ultimosDiasMesAnterior : [];
  diasCalendario = diasCalendario
    .concat(arr)
    .concat(primeirosDiasMesPosterior ? primeirosDiasMesPosterior : []);

  return {
    recuarMes,
    avancarMes,
    diasCalendario,
    ultimosDiasMesAnterior,
    primeirosDiasMesPosterior,
  };
};
//
export default Calendario;
