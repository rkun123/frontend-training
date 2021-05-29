export interface User {
  key?: string,
  name: string
  description: string,
  created_at?: number,
  updated_at?: number,
}

export interface Thread {
  key?: string,
  name: string,
  author: User,
  created_at?: number,
  updated_at?: number,
}

export interface Post {
  key?: string,
  content: string,
  author: User,
  created_at?: number,
  updated_at?: number,
}