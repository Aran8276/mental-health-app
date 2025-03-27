export interface CommunityProps {
  threads: Thread[];
}

export interface FetchThreadResponse {
  msg: string;
  payload: Thread[];
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
}
