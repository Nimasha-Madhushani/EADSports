import axios from "axios";
import React, { useState } from "react";
import BlogList from "./BlogList";
import UserList from "./UserList";
import "./Search.css";
import Navbar from "../Navbar/Navbar";

const Search = () => {
  const [key, setKey] = useState("");
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isAuth, setIsAuth] = useState(true);

  const searchByName = () => {
    isAuth
      ? axios
          .get(`http://localhost:8080/api/search/user/${key}`)
          .then((res) => {
            console.log(res);
            setUsers(res.data);
          })
          .catch((err) => console.log(err))
      : axios
          .get(`http://localhost:8080/api/search/post/${key}`)
          .then((res) => {
            setBlogs(res.data);
          })
          .catch((err) => console.log(err));
  };
  return (
    <>
      <Navbar />
      <div className="search-container">
        <input
          name="name"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <div style={{ width: "20%", margin: "auto" }}>
          <label>
            <input
              type="radio"
              value="option1"
              checked={isAuth}
              className="form-check-input"
              onClick={() => setIsAuth(true)}
            />
            Authors
          </label>
          <label>
            <input
              type="radio"
              value="option1"
              checked={!isAuth}
              className="form-check-input"
              onClick={() => setIsAuth(false)}
            />
            BlogPosts
          </label>
        </div>
        <button style={{ marginLeft: "43%" }} onClick={searchByName}>
          Search
        </button>
        {isAuth ? <UserList users={users} /> : <BlogList blogs={blogs} />}
      </div>
    </>
  );
};

export default Search;
