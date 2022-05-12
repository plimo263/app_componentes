import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Hidden, Stack, Button, Grid, TextField, CircularProgress, Switch } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Select from './select';
import Icone from './icone';
import RadioForm from './radio-form';
import { Caption, Subtitle2 } from './tipografia';
import FormControlLabel from '@mui/material/FormControlLabel';

// Text, Textarea, number
const EntradaFormNormal = memo( (props)=>{
    // Se o componente for do tipo file devemos criar o nosso proprio onchange
    const onChange = props.type === 'file' ? (evt)=> { return props.propsController.field.onChange(evt.target.files) } : null;
    // Quando existe onChange retornamos este textField
    if(onChange){
        return (
            <TextField 
                InputLabelProps={{shrink: true }} 
                fullWidth={true} 
                size='small' 
                {...props} 
                {...props.propsController}
                {...props?.extraProps}
                onChange={onChange}
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
                {props.maxLength ? <Caption>{props.length} / {props.maxLength}</Caption> : props.counter ? <Caption>{props.length}</Caption> : null}
                </Stack>        
                }
            />
        )
    }
    // Retorna o textfield

    return (
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
          {props.maxLength ? <Caption>{props.length} / {props.maxLength}</Caption> : props.counter ? <Caption>QTD: {props.length}</Caption> : null}
          </Stack>        
        }
    />
    );
    
});

// Select
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
// Switch
const EntradaFormSwitch = memo( props=>(
    <Stack>
        <Stack direction='row' alignItems='center'>
            {props.icon && <Icone icone={props.icon} />} &nbsp;&nbsp;
            <FormControlLabel  {...props} label={props.label} control={<Switch defaultChecked={props.defaultChecked} />} />
            </Stack>
        {!!props.error ? <Caption align='left' color='error'>{props.error}</Caption> : null}
    </Stack>

));
// Checkbox
const EntradaFormCheckbox = memo( props=>(
    <Stack>
        <Stack direction='row' alignItems='center'>
            {props.icon && <Icone icone={props.icon} />} &nbsp;&nbsp;
            <FormControlLabel  {...props} label={props.label} control={<Checkbox defaultChecked={props.defaultChecked} />} />
            </Stack>
        {!!props.error ? <Caption align='left' color='error'>{props.error}</Caption> : null}
    </Stack>

));
// Radio
const EntradaFormRadio = memo(props=>(
    <Stack>
        <Subtitle2 align='left'>
            {props.icon && <Icone icone={props.icon} />}
            {props.label}
        </Subtitle2>
        <RadioForm {...props} size={props.size || 'medium'} />
    </Stack>
))

export default function EntradaForm(props) {
    const { wait, schema, onSubmit, schemaMessageError, schemaValidator } = props;
    const obj = {};
    if(schemaValidator){
        obj['resolver'] = yupResolver(schemaValidator)
    }
    const {  handleSubmit, setValue, control, formState: { isSubmitSuccessful, errors }, watch } = useForm(obj);

  return (
      <>
        <Grid container>
            {schema.map((ele,idx)=>{
                const { type, grid, name, defaultValue, defaultChecked, counter, maxLength } = ele;
                const itemGrid = grid ? grid : {xs: 12};
                //
                let itemDefaultValue = defaultValue ? defaultValue : defaultChecked ? defaultChecked : '';
                let length = (maxLength || counter) ? watch(name)?.length : null;
                // Se tiver a props exibirSe, precisamos verificar o valor
                const chaveExibir = ele.exibirSe ? Object.keys(ele.exibirSe)[0] : null;
                // Opcao que oculta/exibe o campo do formulario
                let exibirCampoPorPadrao = chaveExibir ? false : true;
                console.log(chaveExibir && watch( chaveExibir ));
                if(chaveExibir && watch( chaveExibir )  ){
                    
                    // Executa a funcao de callback repassada para exibirSe passando o valor e esperando o retorno
                    const opcoes = ele.exibirSe[chaveExibir]( watch( chaveExibir ) );
                    // Agora verifica o tipo para determinar o objeto que sofrera alteracao
                    switch(type){
                        case 'select':
                        case 'radio':
                            ele.itens = opcoes;
                            break;
                        default: // Eles nao tem opcoes so esperam o valor default
                            itemDefaultValue = opcoes;
                            break;
                        
                    }
                    // Se o defaultValue deste campo existir nao limpa
                    setValue(name, ''); // Limpando o valor default
                    
                    
                    exibirCampoPorPadrao = true;

                }

                return (
                    <Grid sx={{p: .5, display: exibirCampoPorPadrao ? 'block' : 'none' }} item {...itemGrid} key={idx}>
                        <Controller 
                            control={control}
                            name={name}
                            defaultValue={itemDefaultValue}
                            render={(propsController)=>{

                                switch(type){
                                    case 'select':
                                        return (
                                            <EntradaFormSelect 
                                                {...propsController.field} {...ele} 
                                                options={ele.itens} 
                                                isDisabled={wait}
                                                error={!!errors && errors[name] && schemaMessageError[name]}
                                            />
                                        )
                                    case 'switch':
                                        return (
                                            <EntradaFormSwitch 
                                                {...propsController.field}
                                                {...ele}
                                                disabled={wait}
                                                icon={ele.icon}
                                            />
                                        )
                                    case 'checkbox':
                                        return (
                                            <EntradaFormCheckbox
                                                {...propsController.field}
                                                {...ele}
                                                disabled={wait}
                                                icon={ele.icon}
                                            />
                                        )
                                    case 'radio':
                                        return (
                                            <EntradaFormRadio 
                                                {...propsController.field}
                                                {...ele}
                                                disabled={wait}
                                                icon={ele.icon}
                                                error={!!errors[name] && schemaMessageError[name]}
                                                                                            
                                            />
                                        )
                                    case 'file':
                                        return (
                                            <EntradaFormNormal 
                                                propsController={propsController}
                                                {...ele}
                                                error={!!errors[name] && schemaMessageError[name]}
                                                disabled={wait}
                                                icon={ele.icon}
                                            />

                                        )
                                    default:
                                        return (
                                        <EntradaFormNormal {...propsController.field}
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
            type: PropTypes.oneOf(['time', 'select', 'text', 'textarea', 'number', 'date', 'checkbox', 'switch', 'file', 'radio']).isRequired,
            /** O valor default do item */
            defaultValue: PropTypes.string,
            /** Boleano para valor default */
            defaultChecked: PropTypes.bool,
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
            /** Um contador para o campo. Campos que tem maxLength já levam contador automatico */
            counter: PropTypes.bool,
            /** Um parametro para controlaro tamanho do item em radioForm */
            size: PropTypes.oneOf(['small', 'medium', 'large']),
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