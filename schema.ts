export interface Thread {
  key?: string,
  name: string
  created_at?: number,
  updated_at?: number,
}

export interface Post {
  key?: string,
  content: string,
  created_at?: number,
  updated_at?: number,
}