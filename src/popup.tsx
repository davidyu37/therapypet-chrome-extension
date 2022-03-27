import React from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  return (
    <>
      <div style={{ padding: 20, width: 120, fontSize: 16, textAlign: 'center' }}>
        Cheer up!😁
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
