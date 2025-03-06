import React, {createContext, useContext,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import socketIoClient, { Socket } from 'socket.io-client';
import { useClient } from '../AgoraSetup';
import { useLocalMicrophoneTrack } from 'agora-rtc-react';

export const SocketContext = createContext();

const WS = "http://localhost:6001";

const socket = socketIoClient(WS);

export const SocketContextProvider = ({children})=>{

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
   
    const [inCall, setInCall] = useState(false);
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);

    const client = useClient();
    const {ready,tracks} = useLocalMicrophoneTrack();

    const [screenTrack, setScreenTrack] = useState(null);

    const [participants, setParticipants] = useState({});

    const [myMeets, setMyMeets] = useState([]);

    const [participantsListOpen, setParticipantslistOpen] = useState(false);
    const [chatsContainerOpen, setChatsContainerOpen] = useState(false);

    const [newMeetType,setNewMeetType] = useState('');




   useEffect(()=>{
      socket.on('room-created',({roomId})=>{

        if(meetType === 'instant'){

            navigate(`/meet/${roomId}`);

        }else if(meetType == 'scheduled'){
            navigate('/profile');
        }

      });

   },[socket]);

   return(
      <SocketContext.Provider value = {{client,ready,tracks,myMeets,setMyMeets,newMeetType, setNewMeetType,participants,setParticipants,userId,socket,inCall,users,start,setStart,participantsListOpen, setParticipantslistOpen,chatsContainerOpen,setChatsContainerOpen}}>{children}</SocketContext.Provider>
   )

}