import React from "react";
import { healthCheck } from "../utils/healthcheck";
import { getToken } from "../utils/token";

export default function Main() {
  console.log(getToken());
  return (
    <div>
      <h1>MAIN</h1>
      <button onClick={healthCheck}>Check the API health</button>
    </div>
  );
}
