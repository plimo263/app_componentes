import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import Icone from './icone'

const  BotaoIcone = (props)=>{
    
    return (
        <IconButton {...props}>
            <Icone icone={props.icone} />
        </IconButton>
    )
}

const TIPO_ICONES = [
    'Add', 'PostAdd', 'Menu', 'TrendingUp', 'Build', 'Computer', 'AccessTime', 
    'WbSunny', 'Phone', 'Visibility', 'Biotech', 'Engineering', 'SwapHoriz',
    'AllInbox', 'AirlineSeatReclineNormal', 'FileDownload', 'ThumbDown',
    'ThumbUp', 'Comment', 'Search', 'PersonSearch', 'AddComment',
    'FindReplace', 'Send', 'Save', 'Announcement', 'FilterAlt', 'ListAlt',
    'FormatListBulleted', 'ShoppingCart', 'ManageHistory'
];

BotaoIcone.propTypes = {
    /** Deternima qual será o icone que será exibido */
    icone: PropTypes.oneOf(TIPO_ICONES).isRequired,
    /** Todas as propriedades para o mui IconButton */
    props: PropTypes.any,
}

export default memo(BotaoIcone);