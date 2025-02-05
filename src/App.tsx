import { useState } from "react";
import "./App.css";
import { Home } from "./components/custom/Home";
import { Login } from "./components/custom/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isLoggedIn)
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setName={setName}
        setEmail={setEmail}
      ></Login>
    );

  return <Home email={email} name={name}></Home>;
}

export default App;
