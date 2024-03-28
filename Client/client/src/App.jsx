import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Friends from "./Components/Friends";
import Logout from "./Components/Logout";
import Login from "./Components/Login";
import Aboutus from "./Components/Aboutus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/friends" element={<Friends/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/aboutus" element={<Aboutus/>}></Route>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
