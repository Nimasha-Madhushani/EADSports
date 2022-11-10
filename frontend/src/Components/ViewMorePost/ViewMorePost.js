import { LocationSearching } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ViewMorePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(location);
  const API = axios.create({ baseURL: "http://localhost:8080" });

  const deleteHandler = async () => {
    API.interceptors.request.use((req) => {
      if (sessionStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${JSON.parse(
          sessionStorage.getItem("token")
        )}`;
      }
    });

    axios
      .delete(`http://localhost:8080/post/deletePost/${location.state.post_id}`)
      .then((res) => {
        console.log(res);
        window.location.href = '/home';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div>
        <Card sx={{ p: 5, m: 6 }}>
          <CardMedia
            component="img"
            height="140"
            image={location.state.imageURL}
            alt="green iguana"
          />
          <CardContent>
            <Grid container>
              <Grid item md={6}>
                <Typography gutterBottom variant="paragraph" component="div">
                  {new Date(location.state.createdAt).toDateString()}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {location.state.title}
                </Typography>
              </Grid>
              <Grid item md={6} alignItems="center">
                <Avatar>{user.firstName.charAt(0)}</Avatar>
                <Typography variant="body2" color="text.secondary">
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {location.state.description}
            </Typography>
          </CardContent>
          <Grid container>
            <Grid item md={6}>
              {" "}
              <Button
                component={Link}
                to={`/updateBlog`}
                state={{ location }}
                sx={{
                  mt: 1,
                  backgroundColor: "#183d78",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#4d5575",
                    color: "#fff",
                  },
                }}
                variant="contained"
                size="medium"
              >
                Update Post
              </Button>
            </Grid>
            <Grid item md={6} sx={{ textAlign: "right" }}>
              <Button
                onClick={deleteHandler}
                sx={{
                  mt: 1,
                  backgroundColor: "red",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "darkred",
                    color: "#fff",
                  },
                }}
                variant="contained"
                size="medium"
              >
                Delete Post
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
};

export default ViewMorePost;
