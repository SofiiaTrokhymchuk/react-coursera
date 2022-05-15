import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
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

const DishDetail = (props) => {
   const dish = props.dish;
   if (dish != null) {
      return (
         <div className="container">
            <div className="row">
               <RenderDish dish={props.dish} />
               <RenderComments comments={props.dish.comments} />
            </div>
         </div>
      );
   } else {
      return <div></div>;
   }
};

export default DishDetail;
