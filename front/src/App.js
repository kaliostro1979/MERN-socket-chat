import Navigation from "./Components/Navigation";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import SignUp from "./Pages/SignUp";


function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/signup'} element={<SignUp/>}/>
        <Route path={'/chat'} element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
