import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { addDays, subDays, eachDayOfInterval, startOfMonth, endOfMonth, getDay, subMonths, addMonths, parseISO, format } from 'date-fns';
import { Button, useMediaQuery, useTheme, Stack, Paper, Container } from '@mui/material';
import { H6, Caption } from './tipografia';
// Icones
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ptBR } from 'date-fns/locale';

//
const sxCol = {
  width: 'calc(14.28% - 16px)',
  p: 1,
  borderRadius: 0,
}
//
const nomeDias = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
]


export default function Calendario({ sxCabe, sxCorpo, dataInicial, render, renderEstiloDia, onClick }) {
  const [mesAtual, setMesAtual ] = useState(dataInicial);
  const { recuarMes, avancarMes, diasCalendario, ultimosDiasMesAnterior, primeirosDiasMesPosterior } = gerarDiasCalendario(mesAtual);
  // Veja se é mobile
  const isMobile = useMediaQuery( useTheme()?.breakpoints?.down('md') );
  // Alterando para o proximo (ou anterior) mês
  const fnRecuar = useCallback(()=>{
    setMesAtual(recuarMes);
  }, [recuarMes]);
  const fnAvancar = useCallback(()=>{
    setMesAtual(avancarMes);
  }, [avancarMes])
  
  return (
    <Container disableGutters maxWidth='lg'>
      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={fnRecuar} title='Mês anterior' startIcon={<ArrowBackIosIcon />}>
         {!isMobile && 'Recuar'}
        </Button>
        <H6>{_.capitalize( format(parseISO(mesAtual), 'MMMM', { locale: ptBR })) } - {format(parseISO(mesAtual), 'yyyy', { locale: ptBR })}</H6>
        <Button onClick={fnAvancar} title='Próximo mês' endIcon={<ArrowForwardIosIcon />}>
          {!isMobile && 'Avançar'}
        </Button>

      </Stack>
    <Stack direction='row'>
      {nomeDias.map((ele,idx)=>(
        <Paper key={idx} sx={{...sxCol, ...sxCabe}}>
          <H6> {isMobile ? ele.substring(0, 1) : ele} </H6>
        </Paper>
      ))}
      </Stack>
      <Stack direction='row' flexWrap='wrap'>
      {diasCalendario?.map((ele,idx)=>{
        const diaFormatado = format(ele, 'yyyy-MM-dd');
        const diaNumero = format(ele, 'dd');
        // Verifica se o dia em questão faz parte dos dias que devem ser "desabilitados"
        const desabilitar = primeirosDiasMesPosterior?.includes(ele) || ultimosDiasMesAnterior?.includes(ele);
        const sxEstiloDia = renderEstiloDia ? renderEstiloDia(diaFormatado) : {};
        
        return (
        <Paper onClick={()=> !desabilitar && onClick(diaFormatado) } key={idx} sx={{...sxCol, ...sxCorpo, ...sxEstiloDia }}>
          <Stack alignItems='flex-start' spacing={1}>
              <Caption color={desabilitar ? 'text.disabled' : ''}>{diaNumero}</Caption>
              {render && render(diaFormatado)}
          </Stack>
        </Paper>
        )
      })}
    </Stack>
    </Container>
  )
}
Calendario.defaultProps = {
  sxCabe: {
    backgroundColor: theme=> theme.palette.secondary.main,
    color: theme=> theme.palette.secondary.contrastText,
  },
  sxCorpo: {
    height: '72px'
  },
  onClick: ()=>{}
}
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

}

// Recebe a data e cria o calendario com os dias corretos
const gerarDiasCalendario = (anoMesDia)=>{

    // Registra o mes atual
    const anoMesAtual = parseISO(anoMesDia);

    const arr = eachDayOfInterval({start: startOfMonth(anoMesAtual),  end: endOfMonth(anoMesAtual) });
    // Pega o primeiro dia e veja qual dia ele é na semana
    const primeiroDiaMes = getDay(arr[0]);
    const ultimoDiaMes = getDay(arr[arr.length - 1]);
    // Dias do mes anterior
    let ultimosDiasMesAnterior;
    let primeirosDiasMesPosterior;

    // Verifica se o primeiro dia do mes é maior que 0
    if(primeiroDiaMes > 0){
        // Recue pela quantidade de dias da semana que avançaram
        const primeiroDiaSemana = subDays(arr[0], primeiroDiaMes);
        
        // Pega os dias até (mas não) a data do primeiro dia do mês
        ultimosDiasMesAnterior = eachDayOfInterval({ start: primeiroDiaSemana, end: subDays(arr[0], 1) });
    }
    //  Veja se o ultimo dia do mes é menor que 6
    if(ultimoDiaMes < 6){
        const ultimoDiaDaSemana = addDays(arr[ arr.length - 1 ], 6 - ultimoDiaMes);
        // Pega os dias até (mas não) a data do ultimo dia do mes
        primeirosDiasMesPosterior = eachDayOfInterval({ start: addDays(arr[arr.length - 1], 1), end: ultimoDiaDaSemana });
    }
    // Botoes de controle para o proximo mes e o mes anterior
    const recuarMes = format( subMonths(anoMesAtual, 1), 'yyyy-MM-dd');
    const avancarMes = format( addMonths(anoMesAtual, 1), 'yyyy-MM-dd');
    //
    
    // Obtendo os dias do calendario
    let diasCalendario = ultimosDiasMesAnterior ? ultimosDiasMesAnterior : [];
    diasCalendario = diasCalendario.concat(arr).concat(primeirosDiasMesPosterior ? primeirosDiasMesPosterior : []);

    return {
      recuarMes,
      avancarMes,
      diasCalendario,
      ultimosDiasMesAnterior,
      primeirosDiasMesPosterior,
    }
    
}