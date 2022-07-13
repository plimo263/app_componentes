import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types'
import { Box, Container, Tab as Aba, Tabs } from '@mui/material';

// Componente aba
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Tab = ({ indice, cabeInativo, setIndice, corpo, cabe, verBotaoControle }) => {
  const [pagina, setPagina] = useState(indice);
  // Funcao para manipular os indices
  const fnIndice = useCallback((valor) => {
    setPagina(valor);
    setIndice(valor);
  }, [setPagina, setIndice]);

  return (
    <Container disableGutters disablePadding maxWidth={false} >

      <Tabs
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile={verBotaoControle}

        value={pagina} onChange={(evt, valor) => fnIndice(valor)}>
        {cabe.map((ele, idx) => (
          <Aba disabled={cabeInativo?.includes(idx)} label={ele} key={idx} {...a11yProps(idx)} />
        ))}
      </Tabs>

      {corpo.map((ele, idx) => (
        <TabPanel value={pagina} key={idx} index={idx}>
          {ele}
        </TabPanel>
      ))}
    </Container>
  )
}
//
Tab.defaultProps = {
  indice: 0,
  setIndice: () => { },
  cabeInativo: [],
}
//
Tab.propTypes = {
  /** Um inteiro que determina o indice da aba que vamos iniciar */
  indice: PropTypes.number,
  /** Uma função de callback responsavel por alterar o indice  */
  setIndice: PropTypes.func,
  /** Um array que represente o cabecalho  */
  corpo: PropTypes.array.isRequired,
  /** Um array que represente o corpo de cada aba (o tamanho do array do corpo deve ser o mesmo do de cabe) */
  cabe: PropTypes.array.isRequired,
  /** Um array com os indices das abas que serão desabilitadas no clique */
  cabeInativo: PropTypes.arrayOf(PropTypes.number),
  /** Um boleano que determina se teremos visiveis os botoes de controle de avanço/recuo da tabs */
  verBotaoControle: PropTypes.bool,
}

export default Tab;