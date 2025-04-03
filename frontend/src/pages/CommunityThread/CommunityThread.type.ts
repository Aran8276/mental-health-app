import { RefObject } from "react";

export interface CommunityThreadProps {
  error: string;
  loading: boolean;
  submitThread: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  createCommentOpen: boolean;
  setTextareaStatus: (value: boolean) => void;
  thread: Thread | null;
  threadsList: Payload[];
  safeThread: Partial<Thread>;
  comments: ThreadComment[];
  safeThreadsList: Payload[];
  loggedIn: boolean;
}

export interface PostThreadCommentResponse {
  msg: string;
  payload: Payload;
}

export interface Payload {
  id: number;
  owner_id: number;
  title: string;
  body: string;
}

export interface FetchAllThreadsResponse {
  msg: string;
  payload: Payload[];
}

export interface Payload {
  id: number;
  owner_id: number;
  title: string;
  body: string;
  owner: Owner;
  thread_comments: ThreadComment[];
}

export interface Owner {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  username: string;
  password: string;
  role: string;
}

export interface ThreadComment {
  id: number;
  owner_id: number;
  thread_id: number;
  body: string;
  role: string;
  owner: Owner;
  thread_comment_replies: ThreadCommentReply[];
}

export interface ThreadCommentReply {
  id: number;
  owner_id: number;
  comment_id: number;
  body: string;
  owner: Owner;
}

export interface FetchThreadDetailResponse {
  msg: string;
  payload: Thread;
}

export interface Thread {
  id: number;
  owner_id: number;
  title: string;
  body: string;
  owner: Owner;
  thread_comments: ThreadComment[];
}

export interface Owner {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface ThreadComment {
  id: number;
  owner_id: number;
  thread_id: number;
  body: string;
  role: string;
  owner: Owner;
  thread_comment_replies: ThreadCommentReply[];
}

export interface ThreadCommentReply {
  id: number;
  owner_id: number;
  comment_id: number;
  body: string;
  owner: Owner;
}
