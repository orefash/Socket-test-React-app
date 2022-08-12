
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



const Home = ({ socket }) => {
  const [room, setRoom] = useState();
  const [appKey, setKey] = useState("");
  const [socketId, setSocketId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    socket.on("connect", () => {
      console.log(`Status: ${socket.connected}; ID: ${socket.id}`); // true
      setSocketId(socket.id)
      getLoginKey();
    });

    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    socket.on("new_key", (data) => {
      console.log("NEw key: ", data)
      setKey(data.key)
    })

    socket.on("screen_conn", (data) => {
      // setMsgReceived(data.message)
      console.log("screen conn: ", data)
      navigate('/screen', { state: data.uobj});
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

        <h1>KEY</h1>
        <h2>{appKey}</h2>

    </div>
  )
}

export default Home