import React, { Component } from "react";
import {
   Card,
   CardImg,
   CardText,
   CardBody,
   CardTitle,
   Breadcrumb,
   BreadcrumbItem,
   Button,
   Modal,
   ModalBody,
   ModalHeader,
   Col,
   Row,
   Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

class CommentForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false,
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen,
      });
   }

   handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(
         this.props.dishId,
         values.rating,
         values.author,
         values.comment
      );
   }

   render() {
      return (
         <React.Fragment>
            <Button outline color="secondary" onClick={this.toggleModal}>
               <span className="fa fa-pencil fa-lg mr-1"></span>Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}>
                  Submit Comment
               </ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group m-1">
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select
                           model={".rating"}
                           name="rating"
                           className="form-control"
                           defaultValue={1}
                        >
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                        </Control.select>
                     </Row>
                     <Row className="form-group m-1">
                        <Label htmFor="author">Your Name</Label>
                        <Control.text
                           model=".author"
                           name="author"
                           className="form-control"
                           placeholder="Your Name"
                           validators={{
                              required,
                              minLength: minLength(3),
                              maxLength: maxLength(15),
                           }}
                        />
                        <Errors
                           className="text-danger"
                           model={".author"}
                           show="touched"
                           messages={{
                              required: "Required field",
                              minLength: "Must be greater than 2 characters",
                              maxLength: "Must be 15 characters or less",
                           }}
                        />
                     </Row>
                     <Row className="form-group m-1">
                        <Label htmFor="comment">Comment</Label>
                        <Control.textarea
                           model=".comment"
                           name="comment"
                           className="form-control"
                           rows="6"
                           validators={{
                              required,
                           }}
                        />
                        <Errors
                           className="text-danger"
                           model=".comment"
                           show="touched"
                           messages={{
                              required: "Required field",
                           }}
                        />
                     </Row>
                     <Row className="form-group m-1">
                        <Button type="submit" value="submit" color="primary">
                           Submit
                        </Button>
                     </Row>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </React.Fragment>
      );
   }
}

function RenderDish({ dish }) {
   if (dish != null) {
      return (
         <div className="col-12 col-md-5 m-1">
            <Card>
               <CardImg
                  top
                  width="100%"
                  src={baseUrl + dish.image}
                  alt={dish.name}
               />
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

function RenderComments({ comments, postComment, dishId }) {
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
            <CommentForm dishId={dishId} postComment={postComment} />
         </div>
      );
   } else {
      return <div></div>;
   }
}

const DishDetail = (props) => {
   const dish = props.dish;
   if (props.isLoading) {
      return (
         <div className="container">
            <div className="row">
               <Loading />
            </div>
         </div>
      );
   } else if (props.errMess) {
      return (
         <div className="container">
            <div className="row">
               <h4>{props.errMess}</h4>
            </div>
         </div>
      );
   } else if (dish != null) {
      return (
         <div className="container">
            <div className="row">
               <Breadcrumb>
                  <BreadcrumbItem>
                     <Link to={"/menu"}>Menu</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
               </Breadcrumb>
               <div className="col-12">
                  <h3>Menu</h3>
                  <hr />
               </div>
            </div>
            <div className="row">
               <RenderDish dish={props.dish} />
               <RenderComments
                  comments={props.comments}
                  postComment={props.postComment}
                  dishId={props.dish.id}
               />
               <div></div>
            </div>
         </div>
      );
   } else {
      return <div></div>;
   }
};

export default DishDetail;
