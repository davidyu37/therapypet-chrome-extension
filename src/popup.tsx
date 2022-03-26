import React from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  return (
    <>
      <div style={{display: 'flex', padding: 40, justifyContent: 'center', alignItems: 'center'}}>
        Cheer up!
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
