import { useState } from "react";
import Request from "./components/Request";
import Input from "./components/Input";

function App() {
  const [username, setUsername] = useState("");

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    minWidth: "40rem",
    alignItems: "center",
  };

  return (
    <div style={divStyle}>
      <h3>Anilist 3by3 recent favourites</h3>
      <p>example usernames: KorudoKohi, jabjibjam</p>
      <Input setUsername={setUsername} />
      <Request username={username} />
    </div>
  );
}

export default App;
