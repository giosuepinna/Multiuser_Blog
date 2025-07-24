import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import PostDetail from "./pages/PostDetail";
import ActivateAccount from "./pages/ActivateAccount";
import NewPost from "./pages/NewPost";
import ForgotPassword from "./pages/ForgotPassword";


const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/activate/:token" element={<ActivateAccount />} /> {/* 👈 ROTTA */}
        <Route path="/" element={user ? <Blog /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
        <Route path="/new" element={user ? <NewPost /> : <Navigate to="/login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
