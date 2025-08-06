import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";
import ActivationPage from "../pages/ActivationPage";
import CreatePost from "../pages/CreatePost";
import ProfileEdit from "../components/ProfileEdit";
import Profile from "../pages/Profile";
import NewPost from "../pages/NewPost";
import PostManager from "../pages/PostManager";

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
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<div>TEST ROUTE FUNZIONANTE</div>} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/manage-posts" element={<PostManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
