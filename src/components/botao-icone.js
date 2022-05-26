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
    'FormatListBulleted', 'ShoppingCart', 'ManageHistory', 'MoreVert', 'Edit', 
    'Delete', 'Feed', 'WhatsApp', 'CalendarMonth', 'CameraAlt', 'Link', 'Email', 'CreditCard', 'Groups',
    'SelfImprovement', 'TableView', 'ArrowBackIos', 'EmojiPeople', 'Home',
    'Handshake', 'ShoppingBag', 'QrCode', 'AttachMoney', 'Receipt', 'Percent', 'SwapVert', 'Check', 'AutoGraph',
    'PointOfSale', 'Copyright', 'HighlightOff', 'BarChart', 'ShowChart', 'Rule', 'Person', 'School', 'Celebration', 'Cake', 
    'EventBusy', 'Event', 'CurrencyExchange', 'Remove', 'AddShoppingCart', 'Medication', 'ArrowBack', 'ReceiptLong',
    'Facebook', 'AddIcCall'
];

BotaoIcone.propTypes = {
    /** Deternima qual será o icone que será exibido */
    icone: PropTypes.oneOf(TIPO_ICONES).isRequired,
    /** Todas as propriedades para o mui IconButton */
    props: PropTypes.any,
}

export default memo(BotaoIcone);