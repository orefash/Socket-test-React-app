
import "./style.css"
import { useState, useEffect } from "react"

import { useLocation, useNavigate } from 'react-router-dom';
import { loadData } from "../../helpers/user"

export default function ({ socket }) {
    // let [authMode, setAuthMode] = useState("signin")

    // const [name, setName] = useState("");

    const [uname, setUname] = useState("");
    // const [age, setAge] = useState("");
    // const [text, setText] = useState("");
    const [status, setStatus] = useState(false);
    
    const [user, setUser] = useState({
        name: "", age: "", text: ""
    });

    const location = useLocation();

    // const loadData = () => {
    //     console.log("In load user ",)
    //     fetch("http://localhost:3001/get-user", {
    //         method: "POST",
    //         // credentials: "include",
    //         headers: {
    //             //   Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ })
    //     })
    //         .then((response) => {
    //             if (response.status === 200) return response.json();
    //             throw new Error("authentication has been failed!");
    //         })
    //         .then((resObject) => {
    //             //   setUser(resObject.user);
    //             console.log("get message response: ", resObject)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }


    const loadData = (data) => {
        console.log("In load user ",data)
        fetch("http://localhost:3001/get-user", {
            method: "POST",
            // credentials: "include",
            headers: {
                //   Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"userDets": data })
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                //   setUser(resObject.user);
                console.log("get user data: ", resObject)
                setUser(resObject)
                setUname(resObject.user)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {

        if(!status){
            if (location.state) {

                console.log("in screen - Location state: ", location.state)
                loadData(location.state);
                setStatus(true)
                
            }else if(JSON.parse(localStorage.getItem('axs-key'))){
                let axsKey = JSON.parse(localStorage.getItem('axs-key'));
                console.log("axs: ", axsKey)
    
                loadData(axsKey);
                setStatus(true)
            }
        }


    }, [])

    
    useEffect(() => {

        


        console.log("After update: ", user)

    }, [user])

    
  useEffect(() => {

    socket.on("connect", () => {
      console.log(`Status: ${socket.connected}; ID: ${socket.id}`); // true
     
    });

    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    socket.on("update_data", (data) => {
      console.log(`data updatesocket ${uname}; data- ${data}`)
      setUser(data);
      if(data.user === uname){
        console.log(`data updatesocket - valid user`)
        setUser(data);
      }
      
    })
  }, [socket])


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Dashboard Screen</h3>

                    <hr />

                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            disabled
                            type="text"
                            value={user.name}
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Age</label>
                        <input
                            disabled
                            type="text"
                            value={user.age}
                            className="form-control mt-1"
                            placeholder="Enter Age"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Text</label>
                        <input
                            disabled
                            type="text"
                            value={user.text}
                            className="form-control mt-1"
                            placeholder="Enter Text"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>uname</label>
                        <input
                            disabled
                            type="text"
                            value={uname}
                            className="form-control mt-1"
                            placeholder="Enter Unsa"
                        />
                    </div>

                </div>
            </form>
        </div>
    )

}