import { useState, useEffect } from 'react'
import { Post } from '../schema'
import PostCard from './PostCard'
import style from '../styles/PostList.module.css'
import { useRecoilState } from 'recoil'
import threadStore from '../recoil/atoms/thread'
import postStore from '../recoil/atoms/post'
import Twemoji from 'react-twemoji'

export default function PostList() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [posts, setPosts] = useState<Post[]>([])
  const [threadState, setThreadState] = useRecoilState(threadStore)
  const [postState, setPostState] = useRecoilState(postStore)

  useEffect(async () => {
    if(threadState.currentThreadKey !== undefined) {
      const res = await fetch(`${API_BASE}/api/v1/threads/${threadState.currentThreadKey}/posts`, {
        method: 'GET'
      })

      const p = await res.json() as Post[]
      setPosts(p)
    }
  }, [setPosts, threadState])

  return (
    <div className={style.container}>
      {
        posts.map((p) => (
          <PostCard post={p} />
        ))
      }
      {
        threadState.currentThreadKey === undefined ? (
          <div className={style.notThreadSelectedWarningContainer}>
            <Twemoji>😇</Twemoji>
            You need to select some thread.
          </div>
        ) : null
      }
    </div>
  )
}