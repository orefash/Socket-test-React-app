
import "./style.css"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';

export default function ({ }) {
    const [isKeyEnabled, setKeyEnabled] = useState(false);
    const [connMsg, setConnMsg] = useState("");
    const [key, setKey] = useState("")

    const location = useLocation();
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [uname, setUname] = useState("");
    const [age, setAge] = useState("");
    const [text, setText] = useState("");
    // const [user, setUser] = useState(null);
    const [connected, setConnected] = useState(false);

    const connectEffect = () => {

        localStorage.setItem("admin-connect", JSON.stringify(uname))
        setConnMsg("Screen is connected");
        setConnected(true);
        setKeyEnabled(!isKeyEnabled)
    }

    const disconnectUser = () => {

        localStorage.removeItem("admin-connect")
        setConnMsg("Screen is disconnected");
        setConnected(false);
        setKeyEnabled(!isKeyEnabled)
    }

    const updateData = () => {

        fetch("http://localhost:3001/update-data", {
            method: "POST",
            // credentials: "include",
            headers: {
                //   Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "user": uname,
                "age": age,
                "text": text
            })
        })
            .then((response) => {
                // console.log("Response: ", response)
                if (response.status === 200) return response.json();

                throw new Error("invalid key");
            })
            .then((resObject) => {
                //   setUser(resObject.user);
                // connectEffect();

                console.log("update response: ", resObject)
                // navigate('/admin', { state: resObject.user});
            })
            .catch((err) => {
                // setConnMsg("Key is Invalid")
                // setConnected(false)
                console.log(err);
            });

    }

    const validateKey = () => {

        fetch("http://localhost:3001/validate-key", {
            method: "POST",
            // credentials: "include",
            headers: {
                //   Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "key": key,
                "user": uname
            })
        })
            .then((response) => {
                // console.log("Response: ", response)
                if (response.status === 200) return response.json();

                throw new Error("invalid key");
            })
            .then((resObject) => {
                //   setUser(resObject.user);
                connectEffect();

                console.log("get message response: ", resObject)
                // navigate('/admin', { state: resObject.user});
            })
            .catch((err) => {
                setConnMsg("Key is Invalid")
                setConnected(false)
                console.log(err);
            });

    }

    useEffect(() => {

        if (location.state) {

            // console.log("Location state: ", location.state)

            if (location.state.name)
                setName(location.state.name)

            if (location.state.username)
                setUname(location.state.username)

            if (location.state.age)
                setAge(location.state.age)


            if (location.state.text)
                setText(location.state.text)
        } else {


            navigate('/auth');
        }




        const checkConn = JSON.parse(localStorage.getItem('admin-connect'));

        if (checkConn) {
            console.log("check admin connect: ", checkConn)
            connectEffect();
        }


        // getLoginKey()
    }, [])


    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Admin</h3>
                    {/* <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div> */}

                    <div className="form-group mt-3">
                        <label>Screen Key</label>
                        <input
                            disabled={isKeyEnabled}
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter Key"
                            onChange={(event) => {
                                setKey(event.target.value)
                            }}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">

                        {!connected
                            ? <button
                                type="button"
                                className="btn btn-success"
                                onClick={validateKey}>
                                Connect
                            </button>
                            : <button
                                type="button"
                                onClick={disconnectUser}
                                className="btn btn-danger"
                            >
                                Disconnect
                            </button>
                        }
                    </div>

                    <div className="text-center mt-2">
                        <span className="label">
                            {connMsg}
                        </span>
                    </div>

                    <hr />

                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            disabled={!isKeyEnabled}
                            type="text"
                            value={name}
                            className="form-control mt-1"
                            placeholder="Enter name"
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Age</label>
                        <input
                            disabled={!isKeyEnabled}
                            type="text"
                            value={age}
                            className="form-control mt-1"
                            placeholder="Enter Age"
                            onChange={(event) => {
                                setAge(event.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Text</label>
                        <input
                            disabled={!isKeyEnabled}
                            type="text"
                            value={text}
                            className="form-control mt-1"
                            placeholder="Enter Text"
                            onChange={(event) => {
                                setText(event.target.value)
                            }}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={updateData}
                        >
                            Update
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )


}