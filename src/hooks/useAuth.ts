import { useState } from "react";

const [isLoggedin, setIsLoggedIn] = useState(false);
const [email, setEmail] = useState("");
const [name, setName] = useState("");

export { isLoggedin, setIsLoggedIn };
