import React, { memo } from 'react'
import PropTypes from 'prop-types';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BiotechIcon from '@mui/icons-material/Biotech';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIcon from '@mui/icons-material/Phone';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuIcon from '@mui/icons-material/Menu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedIcon from '@mui/icons-material/Feed';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GroupsIcon from '@mui/icons-material/Groups';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import TableViewIcon from '@mui/icons-material/TableView';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PercentIcon from '@mui/icons-material/Percent';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CheckIcon from '@mui/icons-material/Check';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CopyrightIcon from '@mui/icons-material/Copyright';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RuleIcon from '@mui/icons-material/Rule';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventIcon from '@mui/icons-material/Event';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MedicationIcon from '@mui/icons-material/Medication';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FacebookIcon from '@mui/icons-material/Facebook';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CircleIcon from '@mui/icons-material/Circle';
import ScienceIcon from '@mui/icons-material/Science';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AbcIcon from '@mui/icons-material/Abc';
import LooksOneIcon from '@mui/icons-material/LooksOne';



const Icone = (props) => {
    switch(props.icone){
        case 'ManageHistory':
            return <ManageHistoryIcon {...props} />
        case 'ShoppingCart':
            return <ShoppingCartIcon {...props} /> ;
        case 'FormatListBulleted':
            return <FormatListBulletedIcon {...props} />;
        case 'ListAlt':
            return <ListAltIcon {...props} />;
        case 'FilterAlt':
            return <FilterAltIcon {...props} />;
        case 'Announcement':
            return <AnnouncementIcon {...props} />;
        case 'Save':
            return <SaveIcon {...props} />;
        case 'Send':
            return <SendIcon {...props} />;
        case 'FindReplace':
            return <FindReplaceIcon {...props} />;
        case 'AddComment':
            return <AddCommentIcon {...props} />;
        case 'PersonSearch':
            return <PersonSearchIcon {...props} />;
        case 'Search':
            return <SearchIcon {...props} />;
        case 'Comment':
            return <CommentIcon {...props} />;
        case 'ThumbUp':
            return <ThumbUpIcon {...props} />;
        case 'ThumbDown':
            return <ThumbDownIcon {...props} />;
        case 'FileDownload':
            return <FileDownloadIcon {...props} />;
        case 'AirlineSeatReclineNormal':
            return <AirlineSeatReclineNormalIcon {...props} />;
        case 'AllInbox':
            return <AllInboxIcon {...props} />;
        case 'SwapHoriz':
            return <SwapHorizIcon {...props} />;
        case 'Engineering':
            return <EngineeringIcon {...props} />;
        case 'Biotech':
            return <BiotechIcon {...props} />;
        case 'Visibility':
            return <VisibilityIcon {...props} />;
        case 'Phone':
            return <PhoneIcon {...props} />;
        case 'WbSunny':
            return <WbSunnyIcon {...props} />;
        case 'AccessTime':
            return <AccessTimeIcon {...props} />;
        case 'Computer':
            return <ComputerIcon {...props} />;
        case 'Build':
            return <BuildIcon {...props} />;
        case 'TrendingUp':
            return <TrendingUpIcon {...props} />;
        case 'Menu':
            return <MenuIcon {...props} />;
        case 'PostAdd':
            return <PostAddIcon {...props} />;
        case 'Add':
            return <AddIcon {...props} />;
        case 'MoreVert':
            return <MoreVertIcon {...props} />;
        case 'Edit':
            return <EditIcon {...props} />;
        case 'Delete':
            return <DeleteIcon {...props} />;
        case 'Feed':
            return <FeedIcon {...props} />;
        case 'WhatsApp':
            return <WhatsAppIcon {...props} />;
        case 'CalendarMonth':
            return <CalendarMonthIcon {...props} />;
        case 'CameraAlt':
            return <CameraAltIcon {...props} />;
        case 'Link':
            return <LinkIcon {...props} />;
        case 'Email':
            return <EmailIcon {...props} />;
        case 'CreditCard':
            return <CreditCardIcon {...props} />;
        case 'Groups':
            return <GroupsIcon {...props} />;
        case 'SelfImprovement':
            return <SelfImprovementIcon {...props} />
        case 'TableView':
            return <TableViewIcon {...props} />;
        case 'ArrowBackIos':
            return <ArrowBackIosIcon {...props} />;
        case 'EmojiPeople':
            return <EmojiPeopleIcon {...props} />;
        case 'Home':
            return <HomeIcon {...props} />;
        case 'Handshake':
            return <HandshakeIcon {...props} />;
        case 'ShoppingBag':
            return <ShoppingBagIcon {...props} />;
        case 'QrCode':
            return <QrCodeIcon {...props} />;
        case 'AttachMoney':
            return <AttachMoneyIcon {...props} />;
        case 'Receipt':
            return <ReceiptIcon {...props} />;
        case 'Percent':
            return <PercentIcon {...props} />;
        case 'SwapVert':
            return <SwapVertIcon {...props} />;
        case 'Check':
            return <CheckIcon {...props} />;
        case 'AutoGraph':
            return <AutoGraphIcon {...props} />;        
        case 'PointOfSale':
            return <PointOfSaleIcon {...props} />;    
        case 'Copyright':
            return <CopyrightIcon {...props} />;
        case 'HighlightOff':
            return <HighlightOffIcon {...props} />;
        case 'BarChart':
            return <BarChartIcon {...props} />;
        case 'ShowChart':
            return <ShowChartIcon {...props} />;
        case 'Rule':
            return <RuleIcon {...props} />;
        case 'Person':
            return <PersonIcon {...props} />;
        case 'School':
            return <SchoolIcon {...props} />;
        case 'Cake':
            return <CakeIcon {...props} />;
        case 'Celebration':
            return <CelebrationIcon {...props} />;
        case 'EventBusy':
            return <EventBusyIcon {...props} />;
        case 'Event':
            return <EventIcon {...props} />;
        case 'CurrencyExchange':
            return <CurrencyExchangeIcon {...props} />;
        case 'Remove':
            return <RemoveIcon {...props} />;
        case 'AddShoppingCart':
            return <AddShoppingCartIcon {...props} />;
        case 'Medication':
            return <MedicationIcon {...props} />;
        case 'ArrowBack':
            return <ArrowBackIcon {...props} />;
        case 'ReceiptLong':
            return <ReceiptLongIcon {...props} />;
        case 'Facebook':
            return <FacebookIcon {...props} />;
        case 'AddIcCall':
            return <AddIcCallIcon {...props} />;
        case 'Circle':
            return <CircleIcon {...props} />;
        case 'Science':
            return <ScienceIcon {...props} />;
        case 'ArrowUpward':
            return <ArrowUpwardIcon {...props} />;
        case 'ArrowDownward':
            return <ArrowDownwardIcon {...props} />;
        case 'Abc':
            return <AbcIcon {...props} />;
        case 'LooksOne':
            return <LooksOneIcon {...props} />;
                
        default:
            return '';
    }
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
    'Facebook', 'AddIcCall', 'Circle', 'Science','ArrowUpward', 'ArrowDownward', 'Abc', 'LooksOne',
];

Icone.propTypes = {
    /** Esta props aceita desenhar os seguintes componentes */
    icone: PropTypes.oneOf(TIPO_ICONES).isRequired,
    /** Qualquer outra propriedade aceita por icones do mui */
    props: PropTypes.any,
}

export default memo(Icone);