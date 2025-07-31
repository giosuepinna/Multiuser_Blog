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

  if (loadingUser) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Caricamento utente...</p>;
  }

  return (
    <BrowserRouter>
      <div style={styles.wrapper}>
        <Nav />
        <main style={styles.main}>
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
        </main>
      </div>
    </BrowserRouter>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // ✅ mantiene altezza fissa
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  main: {
    flex: 1,
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
};

export default App;
