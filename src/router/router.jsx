import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "../components/Nav";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";
import ActivationPage from "../pages/ActivationPage";
import CreatePost from "../pages/CreatePost";



const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/user/activate/:token" element={<ActivationPage />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
