import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //const [email,setemail]=useState("");
  const navigate = useNavigate(); // storing into naviagte variable
  // keeping user data in local storage to know a user is logined or not
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  //useEffect is perfect for handling side effects that need to occur after rendering
  async function collectdata() {
    console.warn(name, email, password);
    // fetch has two parameters 1) default API 2) some methods optional like post, get
    let result = await fetch("http://localhost:4000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }), // converting into string foam
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result)); // seting result with user name in local storage
    navigate("/"); // calling navigate
  }
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputbox"
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputbox"
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputbox"
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={collectdata} className="appbutton" type="button">
        Signup
      </button>
    </div>
  );
};
export default Signup;
