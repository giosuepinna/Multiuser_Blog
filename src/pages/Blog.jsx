import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { mockPosts } from '../utils/mockPosts';

const Blog = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>Blog Page</h1>
      <p>Benvenuto, {user.email}!</p>
      <button onClick={() => {
        logout();
        navigate('/login');
      }}>Logout</button>

      <h2>Lista Post</h2>
      <ul>
        {mockPosts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link> - <em>{post.author}</em>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
