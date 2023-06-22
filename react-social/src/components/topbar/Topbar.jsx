import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"

export default function Topbar(){

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">HarshLogo</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                <SearchIcon/>
                <input placeholder="Search for friends,post and video" className="searchInput"></input>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{textDecoration:"none",color:"white"}}>
                    <span className="topbarLink">Homepage</span>
                    </Link>
                    <Link to={"/profile/"+user.username} style={{textDecoration:"none",color:"white"}}>
                    <span className="topbarLink">Timeline</span>
                    </Link>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsActiveIcon/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={"/profile/"+user.username}>
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} className="topbarImg" alt=""></img>
                </Link>
            </div>
        </div>
    )
}