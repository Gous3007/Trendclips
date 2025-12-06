import React, { useEffect, useState } from "react";

const App = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("https://trendclips-lxyg.onrender.com/api/users")   // <-- Backend URL put here
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="bg-amber-900">
        Welcome to the React Application!
      </h1>

      <h2 className="text-amber-300" style={{ marginTop: "20px", fontSize: "24px" }}>
        Backend Message: {msg}
      </h2>
    </div>
  );
};

export default App;
