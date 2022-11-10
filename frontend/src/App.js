import { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import ViewMorePost from "./Components/ViewMorePost/ViewMorePost";
import BlogPostCreator from "./Components/Blogpost Creator/BlogPostCreator";
import BlogpostUpdate from "./Components/Blogpost Update/BlogpostUpdate";
import CommentAdder from "./Components/Comment Adder/CommentAdder";
import Search from "./Components/Search/Search";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  // const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/addComment" element={<CommentAdder />} />
        <Route
          path="/auth"
          element={
            user ? <Navigate to="../home" /> : <Auth setUser={setUser} />
          }
        />

        <Route
          path="/updateBlog"
          element={user ? <BlogpostUpdate /> : <Auth setUser={setUser} />}
        />

        <Route
          path="/addBlog"
          element={user ? <BlogPostCreator /> : <Auth setUser={setUser} />}
        />

        <Route path="/blogPost/:id" element={<ViewMorePost />} />

        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
