import React from "react";
const ThockeyLogo = ({ state }) => {
  return (
    <h1 className={state.finished ? "ThockeyLogo finished" : "ThockeyLogo"}>
      Thockey
    </h1>
  );
};

export default ThockeyLogo;
