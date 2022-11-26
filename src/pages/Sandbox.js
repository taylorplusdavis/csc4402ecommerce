import Axios from "axios";
import React, { useRef, useState } from "react";

function Sandbox() {
  const [clients, setClients] = useState([]);
  const [result, setResult] = useState([]);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const firstNameFindRef = useRef();
  const lastNameFindRef = useRef();
  const emailFindRef = useRef();
  const customStatementRef = useRef();

  const getUsers = () => {
    console.log("Clicked");
    Axios.get("http://localhost:3002/api/get/allusers").then((res) => {
      console.log(res.data);
      setClients(res.data);
    });
  };

  const addUser = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/create/insertuser", {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Email: emailRef.current.value,
    }).then((res) => console.log(res));
  };

  const searchUser = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/get/searchuser", {
      FirstName: firstNameFindRef.current.value,
      LastName: lastNameFindRef.current.value,
      Email: emailFindRef.current.value,
    }).then((res) => setClients(res.data));
  };

  const customStatement = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/send/customstatement", {
      CustomStatement: customStatementRef.current.value,
    }).then((res) => {
      console.log(res.data);
      setResult(res.data);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SQL Sandbox</h1>
        <form action="" method="post">
          <p>Create client</p>
          <input type="text" placeholder="First Name" ref={firstNameRef} />
          <input type="text" placeholder="Last Name" ref={lastNameRef} />
          <input type="email" placeholder="Email" ref={emailRef} />
          <button type="submit" onClick={(e) => addUser(e)}>
            Create User
          </button>
        </form>
        <form action="" method="post">
          <p>Find client with</p>
          <input type="text" placeholder="First Name" ref={firstNameFindRef} />
          <p>or</p>
          <input type="text" placeholder="Last Name" ref={lastNameFindRef} />
          <p>or</p>
          <input type="email" placeholder="Email" ref={emailFindRef} />
          <button type="submit" onClick={(e) => searchUser(e)}>
            Find User
          </button>
        </form>
        <form action="" method="post">
          <p>Custom SQL Statement</p>
          <input
            type="text"
            placeholder="Custom SQL Statement"
            ref={customStatementRef}
          />
          <button type="submit" onClick={(e) => customStatement(e)}>
            Execute
          </button>
        </form>
        <button onClick={() => getUsers()}>Read all from database</button>
      </header>
      <div className="sidebar">
        {clients?.map((client, i) => (
          <p key={client.id}>
            User {client.id} from MySQL is{" "}
            {client?.first_name +
              " " +
              client?.last_name +
              ". Their email is: " +
              client?.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sandbox;
