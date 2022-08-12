
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



const Home = ({ socket }) => {
  const [room, setRoom] = useState();
  const [appKey, setKey] = useState("");
  const [socketId, setSocketId] = useState(null);

  // const [message, setMessage] = useState();
  // const [msgReceived, setMsgReceived] = useState();

  const navigate = useNavigate();

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room)
  //   }
  // }

  // const sendMessage = () => {
  //   socket.emit("send_message", { message, room })
  // };

  useEffect(() => {

    // console.log("Log 1");

    socket.on("connect", () => {
      console.log(`Status: ${socket.connected}; ID: ${socket.id}`); // true
      setSocketId(socket.id)
      getLoginKey();
    });

    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    // socket.on("receive_msg", (data) => {
    //   // alert(data.name)
    //   setMsgReceived(data.message)
    // })

    socket.on("new_key", (data) => {
      // setMsgReceived(data.message)
      console.log("SOcket: ", socketId)
      console.log("NEw key: ", data)
      setKey(data.key)
      // console.log("Set key: ", appKey)
    })

    socket.on("screen_conn", (data) => {
      // setMsgReceived(data.message)
      console.log("screen conn: ", data)
      navigate('/screen', { state: data.uobj});
      // setKey(data.key)
      // console.log("Set key: ", appKey)
    })
  }, [socket])

  useEffect(() => { 

    // console.log("Set key: ", appKey) 

  }, [])


  useEffect(() => { console.log("Set key: ", appKey) }, [appKey])

  const getLoginKey = () => {
    console.log("In get key mthd: ", socket.id)
    fetch("http://localhost:3001/message", {
      method: "POST",
      // credentials: "include",
      headers: {
        //   Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "sid": socket.id })
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        //   setUser(resObject.user);
        console.log("get message response: ", resObject)
      })
      .catch((err) => {
        console.log(err);
      });
  }



  // useEffect(() => {

  //   console.log("Log 2");

  //   // getLoginKey()
  // }, [])
  return (
    <div className="App">

      {/* <input
        placeholder="Room..."
        onChange={(event) => {
          setRoom(event.target.value)
        }} />
      <button onClick={joinRoom}>Join Room</button>

      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value)
        }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message</h1>
      {msgReceived}
      <hr
        style={{
          background: 'lime',
          color: 'lime',
          borderColor: 'lime',
          height: '3px',
        }}
      /> */}
      <div>


        <h1>KEY</h1>
        <h2>{appKey}</h2>

      </div>
    </div>
  )
}

export default Home