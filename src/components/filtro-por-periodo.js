import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types'
import { format, subDays, parseISO,  } from 'date-fns';
import { Container, Grid, Paper, Stack, Menu, Chip } from '@mui/material';
import { H6, Caption } from './tipografia';
import Icone from './icone';
import EntradaForm from './entrada-form';
import * as yup from 'yup';
import { AnimatePresence, motion } from 'framer-motion';

const Filtro = ({ datas, onClick, periodos, grid, }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selecionado, setSelecionado] = useState(null);
    // Funcao para fechar o menu clicado fora
    const fnFecharEscolhaPeriodo = () => {
      setAnchorEl(null);
    };
    // Funcao para exibir o periodo a ser escolhido
    const fnVerEscolhaPeriodo = (evt) => {
      if (selecionado === 'periodo') {
        onClick(null);
        setSelecionado(null);
      } else {
        setAnchorEl(evt.currentTarget);
      }
    };
    // Funcao de callback que marca o chip e aplica o filtro
    const fnAplicaFiltro = useCallback(
        (inSelecionado, e) => {
            console.log(inSelecionado);
            console.log(selecionado);
          if (selecionado && selecionado === inSelecionado) {
            setSelecionado(null);
            onClick(null);
            return false;
          } 
          if(inSelecionado === 'periodo'){
              console.log(e.target);
              setAnchorEl(e.target);
          }
          else {
            // Aplica o filtro (invocando o onClick)
            if(inSelecionado === 1){
                onClick(
                  `${format(new Date(), "yyyy-MM-dd")}_${format(
                    new Date(),
                    "yyyy-MM-dd"
                  )}`
                );
            } else {
                onClick(
                  `${format(subDays(new Date(), inSelecionado), "yyyy-MM-dd")}_${format(
                    new Date(),
                    "yyyy-MM-dd"
                  )}`
                );
            }
            
            setSelecionado(inSelecionado);
          }
        },
        [setSelecionado, onClick, selecionado]
      );
    // Funcao para aplicar o filtro no periodo recebendo as datas de e ate
    const fnAplicaFiltroPorPeriodo = (novaData) => {
      setSelecionado('periodo');
      onClick(novaData);
      setAnchorEl(); // Fecha o menu suspenso de escolha de periodo
    };
    // Cria uma rotulacao ao filtro aplicado
    const rotulacao = datas
      ? `${format(parseISO(datas.split("_")[0]), "dd/MM/yy")} Á ${format(
          parseISO(datas.split("_")[1]),
          "dd/MM/yy"
        )}`
      : null;
    // Tipos de filtros
    const tipos = periodos.map((ele,idx)=>(
      {
        rotulo: ele === 1 ?  "Hoje" : `${ele} dias`,
        onClick: (val, e)=> fnAplicaFiltro(val, e),
        titulo: `Aplicar filtro para dados ${ele === 1 ? 'de hoje.' : `dos ultimos ${ele} dias`}` ,
        icone: "CalendarMonth",
      }
    ));
    //
    tipos.push(
        {
            rotulo: selecionado === 'periodo' && datas ? rotulacao : "Por periodo",
            onClick: (val, e)=> fnVerEscolhaPeriodo(e),
            titulo:
                selecionado === 'periodo' && datas
                ? "Filtro aplicado no perido"
                : "Aplicar filtro para erros por periodo definido.",
            icone: "CalendarMonth",
            }
    )
    //
    if (selecionado) {
      tipos.push({
        titulo: "Limpar filtro aplicado",
        icone: "Delete",
        onClick: () => {
          setSelecionado(null);
          onClick(null);
        },
        rotulo: "LimparFiltro",
      });
    }
  
    return (
      <Grid container>
        <Grid item {...grid}>
          <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
            <Stack
              sx={{ width: "100%", overflow: "auto" }}
              direction="row"
              spacing={1}
            >
              <AnimatePresence>
                {tipos.map((ele, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0.01 }}
                    animate={{ scale: 1, transition: { duration: 0.3 } }}
                    exit={{ scale: 0.01, transition: { duration: 0.2 } }}
                  >
                    <Chip
                      icon={<Icone icone={ele.icone} />}
                      key={idx}
                      color={
                        periodos[idx] === selecionado
                          ? "secondary" : selecionado === 'periodo' && idx === periodos.length ? "secondary"
                          : "default"
                      }
                      variant={idx > periodos.length ? "outlined" : "filled"}
                      title={ele.titulo}
                      label={ele.rotulo}
                      onClick={(e) => ele.onClick(idx === periodos.length ? 'periodo' : periodos[idx], e )}
                    />
                  </motion.span>
                ))}
              </AnimatePresence>
            </Stack>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={fnFecharEscolhaPeriodo}
            >
              <FiltroPorPeriodo onClick={fnAplicaFiltroPorPeriodo} />
            </Menu>
          </Paper>
        </Grid>
      </Grid>
    );
  };
//
Filtro.defaultProps = {
    periodos: [1,7,15],
    grid: {
        xs: 12,
        md: 6,
    },
}
//
Filtro.propTypes = {
    /** Um array de numeros que representam o intervalo de datas usados para criar botoes de filtro rapido. */
    periodos: PropTypes.arrayOf(PropTypes.number),
    /** Duas datas separadas por _ EX: 2022-05-01_2022-05-31. Isto nao é obrigatorio, caso enviado ele será o rotulo do botão de periodo.  */
    datas: PropTypes.string.isRequired,
    /** Uma funcao de callback que recebe a data no formato descrito acima. EX: (2022-05-01_2022-05-31) => {}. Todos os filtros são da mesma forma */
    onClick: PropTypes.func.isRequired,
    /** Um objeto que define o grid para exibição das datas */
    grid: PropTypes.object,
}

// Componente que cria um filtro por periodo
const  FiltroPorPeriodo = ({ onClick }) => {
    const schema = [
      { name: "de", label: "DE", type: "date", grid: { xs: 12, md: 6 } },
      { name: "ate", label: "ATE", type: "date", grid: { xs: 12, md: 6 } },
    ];
    const schemaValidator = yup.object().shape({
      de: yup.date().required(),
      ate: yup.date().required(),
    });
    const schemaMessageError = {
      de: "* Data de obrigatória",
      ate: "* Data até obrigatória",
    };
  
    //
    const fn = (val) => {
      const { de, ate } = val;
  
      onClick(`${format(de, "yyyy-MM-dd")}_${format(ate, "yyyy-MM-dd")}`);
    };
  
    return (
      <Container maxWidth="md">
        <Stack spacing={1}>
          <H6>Escolha entre as datas de e ate</H6>
          <Caption>
            Se atenha para não escolher a data DE maior que a ATE, pois assim seu
            filtro ficará vazio.
          </Caption>
          <EntradaForm
            schemaMessageError={schemaMessageError}
            schemaValidator={schemaValidator}
            schema={schema}
            onSubmit={fn}
          />
        </Stack>
      </Container>
    );
  };

  export default memo(Filtro);