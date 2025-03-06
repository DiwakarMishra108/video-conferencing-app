import React, {useContext,useEffect, useState} from 'react';
import '../styles/MeetPage.css';
import {userParams} from 'react-router-dom';
import {SocketContext} from '../context/SocketContext';
import {config} from '../AgoraSetup';
import Controls from '../components/Controls';
import Participants from '../components/Participants';
import VideoPlayer from '../components/VideoPlayer';
const MeetPage =() =>{

    const {id} = userParams();
    const [roomName, setRoomName] = useState('');
    const {socket,setInCall, client,setUsers, ready, tracks, setStart, Participants, setParticipants, start} = useContext(CallContext);
    const userId = localStorage.getItem('userId');

    useEffect(()=>{
        socket.emit('join-room', {userId, roomId: id});
        socket.on("user-joined", async ()=>{
            setInCall(true);
        });
        socket.emit('get-participants',{roomId: id});
        socket.on("participants-list", async ({usernames, roomName})=>{
            setParticipants(usernames);
            setRoomName(roomName);
        });

    },[socket]);


    // let's handle the agora (RTC) messages and operations
    useEffect(()=>{
       
        let init = async (name)=>{

            client.on("user-published", async(userId,mediaType)=>{
                await client.subscribe(user, mediaType);
                if (mediaType == "video"){
                    setUsers((prevUsers)=>{
                        return [...prevUsers, user];
                    });
                }
                if (mediaType == "audio"){
                    user.audioTrack.play();
                }
            });
             
            client.on("user-unpublished", (user, mediaType)=>{
                if(mediaType === "audio"){
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType == "video"){
                    setUsers((prevUsers)=>{
                        return prevUsers.filter((User)=> User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user)=>{
                socket.emit("user-left-room", {userId: user.uid, roomId: id})
                setUsers((prevUsers) =>{
                    return prevUsers.filter((User)=> User.uid !== user.uid);
                });
            });

            try{
                await client.join(config.appId, name, config.token, userId)
            }catch(err){
                consolr.log("error", err);
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);

        }
        if(ready && tracks){
            try{
                init(id); // id -> channel / roomId
            }catch(error) {
                console.log(error);
            }
        }

    },[id,client,ready,tracks]);


    return(
        <div className="meetPage">
            <div className="meet-page-header">
                <h3> Meet: <span>{roomName}</span></h3>
                <p>Meet Id:<span id="meet-id-copy">{id}</span></p>
            </div>


           <Participants/>

           <Chat roomId={id} userId={userId}/>
            

            <div className="meetPage-videoPlayer-container">

                {start && tracks ? 
                <VideoPlayer tracks={tracks} users={users}/>
                : ''
            } 

          </div>

          <div className="meetPage-controlls-part">

            {ready && tracks && (
                <Controls tracks ={tracks}/>
            )}

          </div>
            

         </div>
    )
}

export default MeetPage;