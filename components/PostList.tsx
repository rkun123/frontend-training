import { useState, useEffect, useCallback } from 'react'
import { Post } from '../schema'
import PostCard from './PostCard'
import style from '../styles/PostList.module.css'
import { useRecoilState } from 'recoil'
import threadStore from '../recoil/atoms/thread'
import postStore from '../recoil/atoms/post'
import userStore from '../recoil/atoms/user'
import Twemoji from 'react-twemoji'
import PostEdit from '../components/PostEdit'
import Spinner from '../components/Spinner'

export default function PostList() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [posts, setPosts] = useState<Post[]>([])
  const [ fetchPostPending, setFetchPostPending ] = useState(false)
  const [threadState, setThreadState] = useRecoilState(threadStore)
  const [postState, setPostState] = useRecoilState(postStore)
  const [userState, setUserState] = useRecoilState(userStore)

  async function loadPosts() {
    if(threadState.currentThreadKey !== undefined) {
      setFetchPostPending(true)
      const res = await fetch(`${API_BASE}/api/v1/threads/${threadState.currentThreadKey}/posts`, {
        method: 'GET'
      })

      setFetchPostPending(false)

      const p = await res.json() as Post[]
      setPosts(p)
    }
  }

  useEffect(async () => {
    await loadPosts()
  }, [setPosts, threadState])

  const reloadPosts = useCallback(async () => {
    await loadPosts()
  }, [setPosts, threadState])

  function postLists() {
    return (
      <>
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
      </>
    )
  }

  return (
    <div className={style.container}>
      {
        userState.token !== undefined && threadState.currentThreadKey !== undefined && (
          <PostEdit threadKey={threadState.currentThreadKey} reloadPosts={reloadPosts}/>
        )
      }
      {
        fetchPostPending ? (
          <Spinner />
        ):(
          postLists()
        )
      }
    </div>
  )
}