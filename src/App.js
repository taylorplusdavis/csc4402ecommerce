import logo from "./logo.svg";

import "./App.css";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [clients, setClients] = useState([]);

  const getClients = () => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      setClients((prev) => [...prev, ...res.data]);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {clients?.map((client, i) => (
          <p>
            User {i + 1} from MySQL is{" "}
            {client?.FirstName + " " + client?.LastName}
          </p>
        ))}

        <button onClick={() => getClients()}>Read from database</button>
      </header>
    </div>
  );
}

export default App;
