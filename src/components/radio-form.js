import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Caption } from './tipografia';

export default function RadioForm(props) {
    const { itens, orientation, error, disabled, defaultValue } = props;
  return (
      <Stack>
      <RadioGroup  defaultValue={defaultValue} {...props} row={orientation && orientation === 'horizontal'}>
          {itens.map((ele,idx)=>(
              <FormControlLabel key={idx} 
                value={Array.isArray(ele) ? ele[0] : ele} 
                control={<Radio />}
                label={Array.isArray(ele) ? ele[1] : ele}
                disabled={disabled}
            />
          ))}
      </RadioGroup>
      {error && <Caption color='error' align='left'>{error}</Caption>}
      </Stack>
  )
}

RadioForm.propTypes = {
    /** Um array com os itens. Se for um array bidimensional o indice 0 é o valor e 1 o item */
    itens: PropTypes.array.isRequired,
    /** Um valor default para o radio */
    defaultValue: PropTypes.string,
    /** Uma mensagem de erro para deixar como aviso abaixo do radio */
    error: PropTypes.string,
    /** Orientação do Radio horizontal ou vertical */
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    /** Desabilita o radiogroup para não se escolher mais opções */
    disabled: PropTypes.bool,
}