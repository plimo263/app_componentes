import React, { memo } from 'react';
import PropTypes from 'prop-types'
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTheme } from '@mui/material';

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

const backgroundColorDark = '#191919';
const colorDark = 'white';

// Estilização para darkmode
const selectStylesDark = {
    input: (styles)=> ({
        ...styles,
        color: colorDark,
    }),    
    valueContainer: (styles)=> ({
        ...styles,
        backgroundColor: backgroundColorDark,
        color: colorDark,
    }),
    control: (styles)=>({
        ...styles,
        backgroundColor: backgroundColorDark,
        color: colorDark,
        border: '1px solid #000000',
    }),    
    indicatorsContainer: (styles)=> ({
        ...styles,
        backgroundColor: backgroundColorDark,
        color: colorDark,
    }),
    menuPortal: (styles)=>({
        ...styles,
        zIndex: 1000,
        color: colorDark,
    }),
    singleValue: (styles)=>({
        ...styles,
        color: colorDark,
    }),
    multiValue: (styles)=>({
        ...styles,
        color: colorDark,
        backgroundColor: backgroundColorDark,
        border: '1px solid white',
    }),
    multiValueLabel: (styles)=>({
        ...styles,
        color: colorDark,
        backgroundColor: backgroundColorDark,
    }),
    multiValueRemove: (styles)=>({
        ...styles,
        color: colorDark,
        backgroundColor: backgroundColorDark,
        padding: '2px',
        border: '1px solid white',
        
    }),
    placeholder: (styles)=> ({
        ...styles,
        //backgroundColor: backgroundColorDark,
        color: colorDark,
    }),
    menu: (styles)=>({
        ...styles,
        //zIndex: 1000,
        backgroundColor: backgroundColorDark,
        color: colorDark,
    }),
    option: (styles)=>({
        ...styles,
        zIndex: 9999,
        backgroundColor: backgroundColorDark,
        color: colorDark,
        borderBottom: '1px solid #ccc',
    }),               
}

const Select =  (props)=>{
    const { autoFormat } = props;
    const valores = autoFormat ?  formatToSelect(props.options) : props.options;
    const defaultValue = props.defaultValue ? autoFormat ? formatToSelect(props.defaultValue) : props.defaultValue : null;
    const isDarkMode = useTheme()?.palette?.mode === 'dark';
    
    return (
    <ReactSelect
        components={animetedComponents}
        styles={isDarkMode ? selectStylesDark : selectStyles}
        {...props}
        defaultValue={defaultValue}
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