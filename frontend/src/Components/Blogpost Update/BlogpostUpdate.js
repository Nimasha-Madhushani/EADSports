import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const BlogpostUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { blogpost } = location.state.location.state;
  console.log(location);
  const [inputs, setInputs] = useState({
    post_id: location.state.location.state.post_id,
    title: location.state.location.state.title,
    description: location.state.location.state.description,
    imageURL: location.state.location.state.imageURL,
  });
  const [showAvatar, setShowAvatar] = useState(true);
  let avatarImage = location.state.location.state.imageURL;
  const handleImage = (event) => {
    setInputs({ ...inputs, imageURL: event.target.files[0] });
    setShowAvatar(false);
  };

  const updateHandler = async () => {
    console.log(inputs);

    const data = new FormData();
    data.append("file", inputs.imageURL);
    data.append("upload_preset", "sports_blog");
    data.append("cloud_name", "khan98");
    //  console.log(data);
    fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data.url);
        let url = data.url;
        inputs.imageURL = url;
        avatarImage = url;
        console.log(inputs);
        await axios
          .put(
            `http://localhost:8080/post/updatePost/${location.state.location.state.post_id}`,
            inputs
          )
          .then((res) => {
            console.log(res);
            console.log(inputs);
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch((error) => console.log(error));
  };

  const handleChange = async (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clearUserInputs = () => {
    console.log("clear");
    setInputs({
      title: "",
      description: "",
      image: "",
      imageURL: "",
    });
  };
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: 40 }}>
        <h3 style={{ textAlign: "center", margin: 5 }}>
          <b>Update Blog Post</b>
        </h3>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Title</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
          </div>
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              cols="100"
              rows="3"
              name="description"
              value={inputs.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Image</label>
            <div className="d-flex align-items-center">
              {showAvatar && <Avatar src={avatarImage} />}
              <input
                type="file"
                className="form-control-file m-3"
                id="exampleFormControlFile1"
                name="image"
                onChange={handleImage}
              />
            </div>
          </div>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearUserInputs}
          >
            Clear
          </button>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={updateHandler}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};
export default BlogpostUpdate;
