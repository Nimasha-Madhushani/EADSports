import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ViewBlogPost from "../ViewBlogPost/ViewBlogPost";
import "./HomeStyles.css";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CommentAdder from "../Comment Adder/CommentAdder";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/post/all")
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  }, []);

  return (

    <div>
      <Navbar />
      <Grid container>
        {posts?.map((post) => (
          <Grid item md={4} lg={4} xl={3} key={post.post_id}>
            <ViewBlogPost post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
