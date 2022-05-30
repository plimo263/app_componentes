import React, { useState } from 'react';
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


const Tab = ({ corpo, cabe, verBotaoControle }) => {
    const [pagina, setPagina ] = useState(0);
    
    return (
        <Container disableGutters disablePadding maxWidth={false} >
            
            <Tabs 
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile={verBotaoControle}
              
              value={pagina} onChange={(evt, valor)=> setPagina(valor)}>
                {cabe.map((ele,idx)=>(
                    <Aba label={ele} key={idx} {...a11yProps(idx)} />
                ))}
            </Tabs>
            
            {corpo.map((ele,idx)=>(
                <TabPanel value={pagina} key={idx} index={idx}>
                    {ele}                
                </TabPanel>
            ))}
        </Container>
    ) 
}
//
Tab.propTypes = {
  /** Um array que represente o cabecalho  */
  corpo: PropTypes.array.isRequired,
  /** Um array que represente o corpo de cada aba (o tamanho do array do corpo deve ser o mesmo do de cabe) */
  cabe: PropTypes.array.isRequired,
  /** Um boleano que determina se teremos visiveis os botoes de controle de avanço/recuo da tabs */
  verBotaoControle: PropTypes.bool,
}

export default Tab;