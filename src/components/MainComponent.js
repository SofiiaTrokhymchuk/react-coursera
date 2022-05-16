import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes.js";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotion";
import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "./ContactComponent";

class Main extends Component {
   constructor(props) {
      super(props);

      this.state = {
         dishes: DISHES,
         comments: COMMENTS,
         promotions: PROMOTIONS,
         leaders: LEADERS,
      };
   }

   render() {
      const HomePage = () => {
         return (
            <Home
               dish={
                  this.state.dishes.filter((dish) => dish.featured == true)[0]
               }
               promotion={
                  this.state.promotions.filter(
                     (promotion) => promotion.featured == true
                  )[0]
               }
               leader={
                  this.state.leaders.filter(
                     (leader) => leader.featured == true
                  )[0]
               }
            />
         );
      };
      return (
         <div>
            <Header />
            <Switch>
               <Route path={"/home"} component={HomePage} />
               <Route
                  exact
                  path={"/menu"}
                  component={() => <Menu dishes={this.state.dishes} />}
               />
               <Route exact path={"/contactus"} component={Contact} />
               <Redirect to={"/home"} />
            </Switch>
            <Footer />
         </div>
      );
   }
}

export default Main;
