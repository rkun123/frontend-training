import { useState, useEffect } from 'react'
import { Post } from '../schema'
import PostCard from './PostCard'
import style from '../styles/PostList.module.css'

type Props = {
  threadKey: string
}

export default function PostList({ threadKey }: Props) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(async () => {
    const res = await fetch(`${API_BASE}/api/v1/threads/${threadKey}/posts`, {
      method: 'GET'
    })

    const p = await res.json() as Post[]
    setPosts([...posts, ...p])
  }, [setPosts])

  return (
    <div className={style.container}>
      {
        posts.map((p) => (
          <PostCard post={p} />
        ))
      }
    </div>
  )
}