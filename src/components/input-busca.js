import React, { memo, useState, } from 'react';
import PropTypes from 'prop-types'
import { TextField, CircularProgress } from '@mui/material';
//
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'react-use';

const Filtro = ({ sx, fullWidth, placeholder, label, size,  desativarPesquisaLenta, filtro, setFiltro })=>{
   
    const [ aguardar, setAguardar ] = useState(false);
    // Cria um estado para determinar quando o usuario deixou de digitar
    const [valor, setValor ] = useState(filtro);
    // Utiliza o useDebounce para determinar que depois de 500ms podemos aplicar o filtro
    const [ , ] = useDebounce(
        ()=>{
            // Valor pode ser atualizado
            setFiltro(valor);
            setAguardar(false);

        }, desativarPesquisaLenta ? 1 : 500, [valor]
    );

    return (
        
        <TextField size={size} fullWidth={fullWidth}
            placeholder={placeholder}
            label={label} type="search"
            value={valor} sx={sx}
            onChange={e=> {
                setValor(e.target.value);
                !desativarPesquisaLenta && setAguardar(true);
            }}
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            InputProps={{
                startAdornment: aguardar ? <CircularProgress sx={{mr: 1}} size={20} /> : <SearchIcon color='primary' />
            }}
        />
        
    )
};
//
Filtro.defaultProps = {
    filtro: '',
    sx: {mb: 5},
    label: 'Filtro',
    placeholder: 'Digite o que procura',
    size: 'small',
    fullWidth: false,
    desativarPesquisaLenta: false
};
//
Filtro.propTypes = {
    
    /** Esta propriedade define o valor default do campo */
    filtro: PropTypes.string,
    /** Propriedades sx para melhorar a barra de busca (que é um TextField) */
    sx: PropTypes.object,
    /** Propriedade para determinar um rótulo para o campo de busca */
    label: PropTypes.string,
    /** Propriedade para determinar algum dizer dentro do campo de busca */
    placeholder: PropTypes.string,
    /** Tamanho para o campo de busca dentre os valores mencionados abaixo */
    size: PropTypes.oneOf(['small', 'medium']),
    /** Largura máxima para o campo de busca, largura máxima possivel em seu container */
    fullWidth: PropTypes.bool,
    /** Desativa a busca lenta permitindo a procura a executar imediatamente. */
    desativarPesquisaLenta: PropTypes.bool,
    /** Esta propriedade é uma função de callback que recebe o valor digitado */
    setFiltro: PropTypes.func.isRequired,
};

export default memo(Filtro);