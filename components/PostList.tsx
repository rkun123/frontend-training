import { useState, useEffect } from 'react'
import { Post } from '../schema'
import PostCard from './PostCard'
import style from '../styles/PostList.module.css'
import Twemoji from 'react-twemoji'

type Props = {
  threadKey?: string
}

export default function PostList({ threadKey }: Props) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(async () => {
    if(threadKey !== undefined) {
      const res = await fetch(`${API_BASE}/api/v1/threads/${threadKey}/posts`, {
        method: 'GET'
      })

      const p = await res.json() as Post[]
      setPosts(p)
    }
  }, [setPosts, threadKey])

  return (
    <div className={style.container}>
      {
        posts.map((p) => (
          <PostCard post={p} />
        ))
      }
      {
        threadKey === undefined ? (
          <div className={style.notThreadSelectedWarningContainer}>
            <Twemoji>��</Twemoji>
          </div>
        ) : null
      }
    </div>
  )
}