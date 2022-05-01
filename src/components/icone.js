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
    'FormatListBulleted', 'ShoppingCart', 'ManageHistory'
];

Icone.propTypes = {
    /** Esta props aceita desenhar os seguintes componentes */
    icone: PropTypes.oneOf(TIPO_ICONES).isRequired,
    /** Qualquer outra propriedade aceita por icones do mui */
    props: PropTypes.any,
}

export default memo(Icone);