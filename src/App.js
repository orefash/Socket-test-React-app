
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import io from 'socket.io-client'

import Auth from "./components/Auth/Auth.js"
import Home from "./components/Home/Home.js"
import Screen from "./components/Screen/Screen"
import Admin from "./components/Admin/Admin"

const socket = io("http://localhost:3001")


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/screen" element={<Screen socket={socket} />} />
        <Route path="/admin" element={<Admin  />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App