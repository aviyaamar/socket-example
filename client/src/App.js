import './App.css';
import Chat from './Chat';
import io from 'socket.io-client'
import { useState } from 'react';

const socket = io.connect('http://localhost:3001')

function App() {
 const [username, setUsername]= useState('')
 const [room, setRoom] = useState("")
 const [showChat, setShowChat]= useState(false)

 const joinRoom = ()=>{
    if(username !== "" && room !== ""){
      socket.emit('Join__Room', room)
      setShowChat(true)

    }
 }
  return (
    <div className="App">
      {!showChat ?  (
        <div className="joinChatContainer">   
         <h4>JOIN CAHT</h4>
      <input type='text'
       placeholder='John...' 
       onChange={(event)=>{
       setUsername(event.target.value)
      }}
         />

       <input 
       type='text'
       placeholder='Room ID...' 
       onChange={(event)=>{
        setRoom(event.target.value)
        }}
         />
          <button onClick={joinRoom}>Join A CAHT</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}/>
      )}
      
    </div>
  );
}

export default App;
