import logo from "./logo.svg";
import "./App.css";
import Routes from "./routing/routes.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes />
    </>
  );
}

export default App;
