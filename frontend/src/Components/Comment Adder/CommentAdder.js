import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const CommentAdder = ({ post, setComments }) => {
  const [comment, setComment] = useState({
    content: "",
    post_id: post.post_id,
  });

  const handleChange = (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });
  };

  const API = axios.create({ baseURL: "http://localhost:8080" });

  const addComment = async (event) => {
    event.preventDefault();
    //upload image to cloudinary

    if (!(comment.content === "")) {
      axios
        .post("http://localhost:8080/comment/saveComment", comment)
        .then((res) => {
          console.log(res);
          setComments((prev) => [
            ...prev,
            [
              res.data.comment.comment_id,
              res.data.comment.content,
              new Date().toDateString(),
              new Date().toDateString(),
              res.data.comment.post_id,
            ],
          ]);
          console.log([res.data.comment.comment_id,
            res.data.comment.content,
            new Date(),
            new Date(),
            res.data.comment.post_id]);
          clearUserInputs();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Comment must be inserted!");
    }

    ///////
  };

  const clearUserInputs = () => {
    console.log("clear");
    setComment({
      content: "",
    });
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        name="content"
        value={comment.content}
        onChange={handleChange}
      />

      <button type="button" className="btn btn-primary" onClick={addComment}>
        Add Comment
      </button>
    </>
  );
};

export default CommentAdder;
