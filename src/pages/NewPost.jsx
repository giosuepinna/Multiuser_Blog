import React from "react";
import PostForm from "../components/PostForm";

const NewPost = () => {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">Crea un nuovo post</h1>
      <PostForm />
    </div>
  );
};

export default NewPost;
