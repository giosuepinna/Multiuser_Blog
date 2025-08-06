import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileEdit from "./components/ProfileEdit";   // correggi import
import Profile from "./pages/Profile";                // aggiungi import
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import Nav from "./components/Nav";
import EditPost from "./pages/EditPost";



const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile/edit"
              element={
                <PrivateRoute>
                  <ProfileEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <PostDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-post/:id"
              element={
                 <PrivateRoute>
                  <EditPost />
                 </PrivateRoute>
               }
             />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
