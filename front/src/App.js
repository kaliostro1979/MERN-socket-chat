import Navigation from "./Components/Navigation";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import SignUp from "./Pages/SignUp";
import {useSelector} from "react-redux";
import {useState} from "react";
import {AppContext, socket} from "./context/appContext";


function App() {
    const [rooms, setRooms] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState({})
    const [newMessage, setNewMessage] = useState({})

    const user = useSelector(state => state.user)

  return (
      <AppContext.Provider value={{
          socket,
          rooms,
          setRooms,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          newMessage,
          setNewMessage
      }}>
          <BrowserRouter>
              <Navigation/>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  {
                      !user && (
                          <>
                              <Route path={'/login'} element={<Login/>}/>
                              <Route path={'/signup'} element={<SignUp/>}/>
                          </>
                      )
                  }
                  <Route path={'/chat'} element={<Chat/>}/>
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
