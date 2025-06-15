import React from "react";

const Loading: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>Loading...</h1>
      <p>Please wait while we fetch the data.</p>
      <p>This may take a few seconds depending on your internet connection.</p>
    </div>
  );
};
export default Loading;
