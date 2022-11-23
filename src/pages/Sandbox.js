import Axios from "axios";
import React, { useRef, useState } from "react";

function Sandbox() {
  const [clients, setClients] = useState([]);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const firstNameFindRef = useRef();
  const lastNameFindRef = useRef();
  const emailFindRef = useRef();
  const customStatementRef = useRef();

  const getClients = () => {
    console.log("Clicked");
    Axios.get("http://localhost:3002/api/get").then((res) => {
      setClients(res.data);
    });
  };

  const addClients = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/create", {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Email: emailRef.current.value,
    }).then((res) => console.log(res));
  };

  const findClients = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/get", {
      FirstName: firstNameFindRef.current.value,
      LastName: lastNameFindRef.current.value,
      Email: emailFindRef.current.value,
    }).then((res) => setClients(res.data));
  };

  const customStatement = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3002/api/get", {
      CustomStatement: customStatementRef.current.value,
    }).then((res) => setClients(res.data));
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
          <button type="submit" onClick={(e) => addClients(e)}>
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
          <button type="submit" onClick={(e) => findClients(e)}>
            Find User
          </button>
        </form>
        <form action="" method="post">
          <p>Custom SQL Statement</p>
          <input
            type="text"
            placeholder="First Name"
            ref={customStatementRef}
          />
          <button type="submit" onClick={(e) => customStatement(e)}>
            Execute
          </button>
        </form>
        <button onClick={() => getClients()}>Read all from database</button>
      </header>
      <div className="sidebar">
        {clients?.map((client, i) => (
          <p key={client.ID}>
            User {client.ID} from MySQL is{" "}
            {client?.FirstName +
              " " +
              client?.LastName +
              ". Their email is: " +
              client?.Email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sandbox;
