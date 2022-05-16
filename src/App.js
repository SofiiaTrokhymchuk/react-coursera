import { Navbar, NavbarBrand } from "reactstrap";
import Main from "./components/MainCompinent";
import "./App.css";
import { Component } from "react";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
   render() {
      return (
         <BrowserRouter>
            <div>
               <Main />
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
