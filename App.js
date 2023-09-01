import React from "react";
import Navigation from "./Navigation";
// deixar barra de status transparente
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <Navigation />
    </>
  );
}
