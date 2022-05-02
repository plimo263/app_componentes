import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Hidden, Stack, Button, Grid, TextField, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Select from './select';
import Icone from './icone';
import { Caption, Subtitle2 } from './tipografia';


const EntradaFormNormal = memo( (props)=>(
    <TextField 
        InputLabelProps={{shrink: true }} 
        fullWidth={true} 
        size='small' 
        {...props} 
        {...props?.extraProps}
        error={!!props.error} 
        inputProps={{
            ...props.extraProps?.inputProps,
            maxLength: props.maxLength ? props.maxLength : null,
        }}
        InputProps={{
            startAdornment: props.icon && <Icone icone={props.icon} />
        }}

        helperText={
        <Stack direction='row-reverse' justifyContent='space-between'>
          {!!props.error ? <Caption>{props.error}</Caption> : null}
          {props.maxLength && <Caption>{props.length} / {props.maxLength}</Caption>}
          </Stack>        
        }
    />
    
));
const EntradaFormSelect = memo( props=>(
    <Stack>
        <Subtitle2 align='left'>
            {props.icon && <Icone icone={props.icon} />}
            {props.label}
        </Subtitle2>
        <Select {...props} />
        {!!props.error ? <Caption align='left' color='error'>{props.error}</Caption> : null}
    </Stack>
));

export default function EntradaForm(props) {
    const { wait, schema, onSubmit, schemaMessageError, schemaValidator } = props;
    const obj = {};
    if(schemaValidator){
        obj['resolver'] = yupResolver(schemaValidator)
    }
    const { handleSubmit, control, formState: { errors }, watch } = useForm(obj);

  return (
      <>
        <Grid container spacing={1}>
            {schema.map((ele,idx)=>{
                const { type, grid, name, defaultValue, maxLength } = ele;
                const itemGrid = grid ? grid : {xs: 12};
                //
                const itemDefaultValue = defaultValue ? defaultValue : '';
                let length = maxLength ? watch(name)?.length : null;

                return (
                    <Grid item {...itemGrid} key={idx}>
                        <Controller 
                            control={control}
                            name={name}
                            defaultValue={itemDefaultValue}
                            render={({ field })=>{

                                switch(type){
                                    case 'select':
                                        return (
                                            <EntradaFormSelect 
                                                {...field} {...ele} 
                                                options={ele.itens} 
                                                isDisabled={wait}
                                                error={!!errors && errors[name] && schemaMessageError[name]}
                                            />
                                        )
                                    default:
                                        return (
                                        <EntradaFormNormal {...field}
                                            {...ele}
                                            error={!!errors[name] && schemaMessageError[name]}
                                            length={length}
                                            maxLength={maxLength}
                                            disabled={wait}
                                            icon={ele.icon}
                                        />
                                    );
                                        
                                }
                            }}
                        />
                    </Grid>
                )

            })}
        </Grid>
        <Grid container sx={{my: 1}}>
            <Hidden smDown>
                <Grid item md={3} />
            </Hidden>
            <Grid item xs={12} md={6}>
                <Button disabled={wait} fullWidth={true} variant='contained' {...props.buttonProps} onClick={handleSubmit(onSubmit)}
                    startIcon={wait ? <CircularProgress size={20} sx={{color: props?.buttonProps?.iconColor }} /> : <Icone icone='Save' sx={{color: props?.buttonProps?.iconColor }} />}
                >
                    {props.buttonProps?.label ? props.buttonProps?.label : 'ENVIAR'} 
                </Button>
            </Grid>
            <Hidden smDown>
                <Grid item md={3} />
            </Hidden>
        </Grid>
    </>
  )
}

EntradaForm.defaultProps = {
    wait: false,
    schemaMessageError: {},
}

EntradaForm.propTypes = {
    /** Props que desativa todos os campos e coloca um circularProgressIndicador no button */
    wait: PropTypes.bool.isRequired,
    /** Um array contendo os campos de formulario que serão acionados para monta-lo */
    schema: PropTypes.arrayOf(
        PropTypes.shape({
            /** Uma string que represente o icone */
            icon: PropTypes.string,
            /** Os tipos dos itens */
            type: PropTypes.oneOf(['select', 'text', 'textarea', 'number', 'date']).isRequired,
            /** O valor default do item */
            defaultValue: PropTypes.string,
            /** Nome que vai identificar o campo no formulario */
            name: PropTypes.string.isRequired,
            /** Rótulo para o campo  */
            label: PropTypes.string,
            /** Sistema de grid para distribuir campos de formulario ({xs: 12, md: 6 }) */
            grid: PropTypes.object,
            /** Propriedades extras que serão expandidas no campo (podem ser props do Mui ou do ReactSelect) */
            extraProps: PropTypes.object,
            /** Um array para o select determinar os itens que farão parte do select */
            itens: PropTypes.array,
            /** Propriedade do select para autoFormataçao do campo itens e defaultValue */
            autoFormat: PropTypes.bool,
            /** Um numero que determina o limite maximo de caracteres digitados */
            maxLength: PropTypes.number,
        })
    ).isRequired,
    /** Um objeto que determina o schema de validação (vide yup para montar o schema) */
    schemaValidator: PropTypes.object,    
    /** Um objeto com as chaves sendo o valor de name (do schema) para exibir as mensagens de erro caso o schemaValidator tenha sido enviado */
    schemaMessageError: PropTypes.object,
    /** Uma função de callback usada para capturar os campos que foram validados no formulario */
    onSubmit: PropTypes.func.isRequired,
    /** Um objeto com opções para customizar o botao */
    buttonProps: PropTypes.shape({
        label: PropTypes.string,
        title: PropTypes.string,
        extraProps: PropTypes.object,
        iconColor: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    })

}