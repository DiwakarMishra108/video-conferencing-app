import React, {useContext,useEffect,useState} from 'react';
import '../styles/Home.css';
import {AuthContext} from '../context/AuthContest';
import {SocketContext} from '../context/SocketContext';
import {cgEnter} from 'react-icons/cg';
import {RiVideoAddFill} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Groups2Icon from '@mui/icons-material/Groups2'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyRupeeIcon from  '@mui/icons-material/CurrencyRupee';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BoltIcon from '@mui/icons-material/Bolt';


import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstgramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Home = () =>{

    const {logout}= useContext(AuthContext);
    const {socket, setMyMeets, newMeetType, setNewMeetType} = useContext(SocketContext);

    const userName = localStorage.getItem("userName").toString();
    const userId = localStorage.getItem("userId").toString();

    const [roomName, setRoomName] = useState('');
    const [newMeetDate, setNewMeetDate] = useState('none');
    const [newMeetTime, setNewMeetTime] = useState('none');

    const [joinRoomId, setJoinRoomId] = useState('');
    const [joinRoomError, setJoinRoomError] = useState('');

    const handleCreateRoom =() =>{
        Socket.emit("create-room",{userId, roomName, newMeetType, newMeetDate, newMeetTime});
    }


    const navigate = useNavigate();

    const handleLogIn =()=>{
        navigate('/login');
    }

    const handleLogOut =(e)=>{
        e.preventDefault();
        logout();
    }


    return(
        <div className="homePage">
            <div className="homePage-hero">
                <div className="home-header">
                     <div className="home-logo">
                        <h2>Smart Meet</h2>
                     </div>

                  {!userName || userName ==='null' ?
                  
                  <div className="header-before-login">
                     <button onClick={handleLogIn}>Login</button>
                  </div>

                 :
                 <div className="header-after-login">
                    <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic'>
                             {userName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><Link classname="dropdown-options" to='/profile'>Profile</Link></Dropdown.Item>
                            <Dropdown.Item classname="dropdown-options" onClick={handleLogOut}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                 </div>

                }

                </div>
                <div classname ="home-container container">

                    {!userName || userName===null ?
                    
                    <div className="home-app-intro">
                        {/*<span classname ="welcome">Welcome!!</span>*/}
                        <h2>Unbounded <b>Connections: </b>Elvate Your Meetings with Free, Future-Forword<b>Video Conferrencing plateform</b>
                        <p>Revolutionize your meetings with our cutting-edge future-forward video Conferrencing plateform</p></h2>
                        <button onClick={handleLogIn}>Join Now..</button>
                    </div>
                     

                  :
                  <>
                   
                
                  </>
 }


                </div>
            </div>

            <div className="about-app-container">
                <div className="box">
                    <div className="box-inner">
                        <div className="box-front">
                            <h2>Connect Anytime, Anywhere!</h2>
                            <p>Our video conference app people closer with easy connectivity and affordability.</p>
                        </div>
                        <div className="box-back">
                            <h2>Your passport to seamless communication!</h2>
                            <p>Unlock the world of effortless connectivity with our video conference app. Stay connected</p>
                        </div>
                    </div>
                </div>

                <div className="about-cards">
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span> <Groups2Icon/></span></Card.Title>
                            <Card.Text className = "about-card-text">
                                Easy group conference!! Bringing chaos to order, one virtual group huge at a time! 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span><CalendarMonthIcon /></span></Card.Title>
                            <Card.Text className ="about-card-text">
                                Schedual Meets Anytime!! Time is no longer the boss,you are!!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span><CurrencyRupeeIcon /></span></Card.Title>
                            <Card.Text className ="about-card-text">
                               Free of coast!! Saving you moolah and keeping your pocket jolly. High five for freebies!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span><StopCircleIcon /></span></Card.Title>
                            <Card.Text className ="about-card-text">
                               Preserving valuable discussion and insights,enabling you to revisit and learn from every meeting
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span><QuestionAnswerIcon /></span></Card.Title>
                            <Card.Text className ="about-card-text">
                               In-Meet chat Feature!! Facilitating seamless communication within meetings, fostering realtime lectures
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="about-card-body">
                        <Card.Body>
                            <Card.Title className="about-card-title"><span><BoltIcon /></span></Card.Title>
                            <Card.Text className ="about-card-text">
                               Zooming through virtual space like a rocket-powered cheetah. efficiently connecting dots,one
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

            </div>



            <div className="footer">
                <h2>COntact us @:</h2>
                <div className="footer-social-media">
                    <GoogleIcon/>
                    <FacebookIcon/>
                    <InstgramIcon/>
                    <TwitterIcon/>
                </div>
            </div>
        </div>
    )
}