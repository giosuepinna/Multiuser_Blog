// src/services/postService.js
import { http } from "../api/http";

export async function getPosts({ cursor = "", limit = 10, direction = "next" } = {}) {
  const params = {};
  if (cursor) params.cursor = cursor;
  if (limit) params.limit = limit;
  if (direction) params.direction = direction;

  const { data } = await http.get("/posts", { params });

  // Normalizzo i campi per il frontend
  const posts = (data.posts || []).map(p => ({
    id: p.id || p._id,
    title: p.title,
    content: p.content,
    publishDate: p.publishDate,
    authorId: p.authorId,
    tags: p.tags || [],
    totalLikes: p.total_likes ?? p.totalLikes ?? 0,
    totalComments: p.total_comments ?? p.totalComments ?? 0,
  }));

  return {
    posts,
    cursor: data.cursor ?? null,
    nextCursor: data.nextCursor ?? null,
    prevCursor: data.prevCursor ?? null,
    limit: data.limit ?? limit,
    direction: data.direction ?? direction,
  };
}
