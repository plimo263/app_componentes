import React, { memo } from 'react';
import PropTypes from 'prop-types'
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

const animetedComponents = makeAnimated();

// Funcao para formatar ao select
function formatToSelect(arr, concatRotulo = ''){
    const newArr = arr.map((ele)=>({
         label: `${Array.isArray(ele) ? ele[1] : ele}${concatRotulo}`,
         value: Array.isArray(ele) ? ele[0] : ele,
         key: Array.isArray(ele) ? ele[0] : ele,
    }))
    return newArr;
}

// Estilização do componente select
const selectStyles = {
    multiValueRemove: (styles)=> ({
        ...styles,
        color: 'black',
    }),
    menu: (styles)=>({
        ...styles,
        zIndex: 1000,
    }),
    option: (styles)=>({
        ...styles,
        zIndex: 1000,
        color: 'black',
    }),               
}

const Select =  (props)=>{
    const { autoFormat } = props;
    const valores = autoFormat ?  formatToSelect(props.options) : props.options;
    
    return (
    <ReactSelect
        components={animetedComponents}
        styles={selectStyles}
        {...props}
        options={valores}
        menuPlacement="auto"
        menuPosition='fixed'

    />
    )
}
//
Select.propTypes = {
    /** Recebe um array de objetos formatados exatamente desta forma. */
    options: PropTypes.oneOfType([
        PropTypes.array, 
        PropTypes.arrayOf(PropTypes.exact({
            key: PropTypes.string,
            label: PropTypes.string,
            value: PropTypes.string
          })
        ) 
      ]).isRequired,
    /** Recebe um booleano que indica que o array será autoformatado */
    autoFormat: PropTypes.bool
};


export default memo(Select)