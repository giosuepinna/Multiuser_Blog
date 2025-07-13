import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { mockPosts } from '../utils/mockPosts';

const PostDetail = () => {
  const { id } = useParams(); // id preso dall'URL
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const post = mockPosts.find(p => p.id === id);

  if (!user || !post) return null;

  return (
    <>
      <h1>{post.title}</h1>
      <p><strong>Autore:</strong> {post.author}</p>
      <p>{post.content}</p>
      <button onClick={() => navigate('/blog')}>Torna alla lista</button>
    </>
  );
};

export default PostDetail;
