// import React, { useState}  from "react";
import ReactDOM  from "react-dom/client";
import AppRouter from "./AppRouter";
import { StrictMode } from 'react';
function Game(){
  console.log('index.js Game rendered')
  return <>
  <AppRouter/>
  </>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<StrictMode> <Game/> </StrictMode>
)