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
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";

const App = () => {
  const { user, loadingUser } = useAuth();
  console.log("👤 user:", user);

  if (loadingUser) {
    return <p className="text-center mt-10">Caricamento utente...</p>;
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* Rotte pubbliche */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/activate/:token" element={<ActivateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rotte protette */}
        <Route path="/" element={user ? <Blog /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={user ? <PostDetail /> : <Navigate to="/login" />} />
        <Route path="/new-post" element={user ? <NewPost /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={
            user
              ? (!user.username || !user.avatar)
                ? <Navigate to="/profile/edit" />
                : <Profile />
              : <Navigate to="/login" />
          }
        />
        <Route path="/profile/edit" element={user ? <EditProfile /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
