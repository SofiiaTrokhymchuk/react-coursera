import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
   constructor(props) {
      super(props);
   }

   renderDish(dish) {
      if (dish != null) {
         return (
            <div className="col-12 col-md-5 m-1">
               <Card>
                  <CardImg top width="100%" src={dish.image} alt={dish.name} />
                  <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                  </CardBody>
               </Card>
            </div>
         );
      } else {
         return <div></div>;
      }
   }

   renderComments(comments) {
      if (comments != null) {
         const commentsList = comments.map((comment) => {
            return (
               <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                     --{comment.author},&nbsp;
                     {new Date(comment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                     })}
                  </p>
               </li>
            );
         });

         return (
            <div className="col-12 col-md-5 m-1">
               <h4>Comments</h4>
               <ul className="list-unstyled">{commentsList}</ul>
            </div>
         );
      } else {
         return <div></div>;
      }
   }

   render() {
      const dish = this.props.dish;
      if (dish != null) {
         return (
            <div className="container">
               <div className="row">
                  {this.renderDish(dish)}
                  {this.renderComments(dish.comments)}
               </div>
            </div>
         );
      } else {
         return <div></div>;
      }
   }
}

export default DishDetail;
