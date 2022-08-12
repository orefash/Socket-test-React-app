
import "./style.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
    let [username, setUsername] = useState(null)
    let [errMsg, setErrormsg] = useState("")

    const navigate = useNavigate();

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const loginUser = (e) => {
        e.preventDefault();
        console.log(`Username: `, username)
        

        fetch("http://localhost:3001/login", {
            method: "POST",
            // credentials: "include",
            headers: {
                //   Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "uname": username })
        })
            .then((response) => {
                // console.log("Response: ", response)
                if (response.status === 200) return response.json();
                
                throw new Error("authentication has failed!");
            })
            .then((resObject) => {
                //   setUser(resObject.user);
                setErrormsg("")

                // console.log("get message response: ", resObject)
                navigate('/admin', { state: {...resObject.user, username}});
            })
            .catch((err) => {
                setErrormsg("authentication has failed!")
                console.log(err);
            });

    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>

                        {/* <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div> */}

                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            />
                        </div>

                        {/* <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}

                        {/* <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div> */}

                        <div className="text-center">
                            <span className="label">
                                { errMsg }
                            </span>
                        </div>


                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={loginUser}
                            >
                                Submit
                            </button>
                        </div>
                        {/* <p className="text-center mt-2">
                            Forgot <a href="#">Password?</a>
                        </p> */}
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">Password?</a>
                    </p>
                </div>
            </form>
        </div>
    )

}