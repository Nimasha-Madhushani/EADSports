import axios from "axios";
import React, { useState } from "react";
import Navbar from '../Navbar/Navbar';
import { useLocation, useNavigate } from "react-router-dom";

const BlogPostCreator = () => {
    const [blog, setBlog] = useState({
        title: "",
        description: "",
        image: "",
        imageURL:"",
    });

    const handleChange = (event) => {
      setBlog({ ...blog, [event.target.name]: event.target.value });
     
    };

    const handleImage = (event) => {
      setBlog({ ...blog, image: event.target.files[0] });
     
    };

    const API = axios.create({ baseURL: "http://localhost:8080" });

  

    const addBlog = async (event) => {
        event.preventDefault();
        //upload image to cloudinary
         
            if(!(blog.image===""))
            {

                const data = new FormData();
                data.append('file', blog.image);
                data.append('upload_preset', 'sports_blog');
                data.append("cloud_name", "khan98");
              //  console.log(data);
                fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
                  method: "post",
                  body: data
              }).then(res => res.json())
                .then(data => {
                console.log(data.url)
                let url = data.url;
                blog.imageURL = url;
                console.log(blog);
                API.interceptors.request.use((req) => {
            if (sessionStorage.getItem("token")) {
              req.headers.Authorization = `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`;
              console.log(req);
            }
          });
                axios
                .post("http://localhost:8080/post/savePost", blog)
                .then((res) => {
                  // console.log(res);
                  clearUserInputs();
                  window.location.href = '/';
                })
                .catch((err) => {
                  console.log(err);
                });
              
              }).
                catch(err => {
                    console.log(err)
                })
            }else{
              window.alert("Image must be inserted!")
            }
            
            ///////

        


        
        

      };

      const clearUserInputs = () => {
        console.log("clear");
        setBlog({
          title: "",
          description: "",
          image: "",
          imageURL:""
        });
      };

  return (
    <>
    <Navbar/>
    <div className="container" style={{marginTop:40}}>
      <h3 style={{textAlign:"center",margin:5}}>Add a Blog Post</h3>
      <form>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Title</label>
            <input type="text" className="form-control" id="formGroupExampleInput" name="title" value={blog.title} onChange={handleChange}/>
        </div><br/><br/>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" cols="100" rows="3" name="description" value={blog.description} onChange={handleChange}></textarea>
        </div><br/><br/>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Image</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1" name="image" onChange={handleImage}/>
        </div><br/><br/>
        <button type="button" className="btn btn-danger" onClick={clearUserInputs}>Clear</button><br/>
        <button type="button" className="btn btn-primary" onClick={addBlog}>Add Blog Post</button>
        
        </form>
    </div>
    </>
  );
  };

export default BlogPostCreator;