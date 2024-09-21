import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate("");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const handlelogin = async () => {
    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }), // converting into string foam
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please Enter correct Details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Email"
        onChange={(e) => setemail(e.target.value)}
        value={email}
      ></input>
      <input
        type="password"
        className="inputbox"
        placeholder="Enter Password"
        onChange={(e) => setpassword(e.target.value)}
        value={password}
      />
      <button onClick={handlelogin} type="button" className="appbutton">
        Login
      </button>
    </div>
  );
};
export default Login;
