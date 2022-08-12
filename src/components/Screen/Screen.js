
import "./style.css"
import { useState, useEffect } from "react"

import {useLocation, useNavigate} from 'react-router-dom';

export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
    
    const [name, setName] = useState("");
    
    const [uname, setUname] = useState("");
    const [age, setAge] = useState("");
    const [text, setText] = useState("");

    const location = useLocation();


    useEffect(() => {

        if(location.state){

            console.log("in screen - Location state: ", location.state)

            if(location.state.name)
                setName(location.state.name)
                
            if(location.state.username)
                setUname(location.state.username)

            if(location.state.age)
                setAge(location.state.age)
            

            if(location.state.text)
                setText(location.state.text)
        }


    }, [])
    
        return (
            <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Dashboard Screen</h3>
                 

                    {/* <div className="form-group mt-3">
                        <label>Screen Key</label>
                        <input
                            // disabled={isKeyEnabled}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter Key"
                            // onChange={(event) => {
                            //     setKey(event.target.value)
                            // }}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button 
                        type="button" 
                        className="btn btn-success"                        
                        // onClick={validateKey}
                        >
                            Connect
                        </button>
                    </div> */}

                    

                    <hr />

                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            disabled
                            type="text"
                            value={name}
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Age</label>
                        <input
                            disabled
                            type="text"
                            value={age}
                            className="form-control mt-1"
                            placeholder="Enter Age"
                        />
                    </div>
                    
                    <div className="form-group mt-3">
                        <label>Text</label>
                        <input
                            disabled
                            type="text"
                            value={text}
                            className="form-control mt-1"
                            placeholder="Enter Text"
                        />
                    </div>

                    
                    
                </div>
            </form>
        </div>
        )
   
}