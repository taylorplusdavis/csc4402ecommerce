import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./Account.css";
import { useCookies } from "react-cookie";

function Account() {
  const [cookies] = useCookies(["id"]);
  const [user, setUser] = useState([]);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [npass, setNPass] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    Axios.post(`http://localhost:3002/api/get/user`, {
      id: cookies.id,
    }).then((response) => {
      setUser(response.data[0]);
    });
  }, [cookies]);

  const updateFirstName = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3002/api/update/firstname", {
      id: cookies.id,
      first_name: fname,
    }).then((response) => {
      console.log(response);
    });
  };

  const updateLastName = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3002/api/update/lastname", {
      id: cookies.id,
      last_name: lname,
    }).then((response) => {
      console.log(response);
    });
  };

  const updateAddress = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3002/api/update/address", {
      id: cookies.id,
      address: address,
    }).then((response) => {
      console.log(response);
    });
  };

  const updateEmail = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3002/api/update/email", {
      id: cookies.id,
      email: email,
    }).then((response) => {
      console.log(response);
    });
  };

  const updatePass = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3002/api/update/password", {
      id: cookies.id,
      password: npass,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="updates">
      <h1 className="Title">Update Account Information here!</h1>
      <form className="formUpdate">
        <div className="inputContainer">
          <input
            className="textInput"
            type="text"
            placeholder={user.first_name}
            onChange={(e) => setFName(e.target.value)}
          ></input>
          <button className="updateButton" onClick={updateFirstName}>
            Change Firstname
          </button>
        </div>
        <div className="inputContainer">
          <input
            className="textInput"
            type="text"
            placeholder={user.last_name}
            onChange={(e) => setLName(e.target.value)}
          ></input>
          <button className="updateButton" onClick={updateLastName}>
            Change Lastname
          </button>
        </div>
        <div className="inputContainer">
          <input
            className="textInput"
            type="text"
            placeholder={user.address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <button className="updateButton" onClick={updateAddress}>
            Change Address
          </button>
        </div>
        <div className="inputContainer">
          <input
            className="textInput"
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="updateButton" onClick={updateEmail}>
            Change Email
          </button>
        </div>
        <div className="inputContainer">
          <input
            className="textInput"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setNPass(e.target.value)}
          ></input>
          <button className="updateButton" onClick={updatePass}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Account;
