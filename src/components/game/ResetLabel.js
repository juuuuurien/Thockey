import React from "react";
import { GoMarkGithub } from "react-icons/go";

const ResetLabel = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="reset-label" />
      <div
        id="reset-label"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <span id="key">alt</span> + <span id="key">enter</span> to reset
      </div>
      <div
        id="reset-label"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <div style={{ marginRight: "1rem" }}>Created by @Juuuuurien</div>
        <a href="https://github.com/juuuuurien/thockey">
          <GoMarkGithub size="1.5rem" />
        </a>
      </div>
    </div>
  );
};

export default ResetLabel;
