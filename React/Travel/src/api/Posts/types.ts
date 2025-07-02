import { z } from "zod";

export const PostItemSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  excerpt: z.string(),
  photo: z.string().optional(),
  city: z.string(),
  county: z.string(),
});

export const PostsListSchema = z.array(PostItemSchema);

export type PostItem = z.infer<typeof PostItemSchema>;

export type PostsList = z.infer<typeof PostsListSchema>;

export const PostInfoComments = z.object({
  author_name: z.string(),
  comment: z.string(),
  created_at: z.string(),
});

export const PostInfoUser = z.object({
  full_name: z.string(),
  city: z.string(),
  bio: z.string(),
});

export const PostInfoSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  country: z.string().optional(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(PostInfoComments),
  userInfo: PostInfoUser,
});

export type PostInfoProps = z.infer<typeof PostInfoSchema>;

export const ReviewDataSchema = z.object({
  full_name: z.string(),
  comment: z.string(),
});

export type ReviewDataProps = z.infer<typeof ReviewDataSchema>;

export const ReviewDataResponseSchema = z.object({
  id: z.number().int(),
  post_id: z.number().int(),
  author_name: z.string(),
  comment: z.string(),
  created_at: z.string(),
});

export type ReviewDataResponseProps = z.infer<typeof ReviewDataResponseSchema>;

export const ReviewIdSchema = z.object({
  postId: z.string().optional(),
});

export type ReviewIdProps = z.infer<typeof ReviewIdSchema>;

export const AddPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  photo: z.string().optional(),
});

export type AddPostProps = z.infer<typeof AddPostSchema>;
