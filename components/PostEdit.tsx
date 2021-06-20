import { useEffect, useState } from 'react'
import { Post } from '../schema'
import style from '../styles/PostEdit.module.css'
import { useRecoilState } from 'recoil'
import UserStore from '../recoil/atoms/user'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function PostEdit({ threadKey, reloadPosts }: { threadKey: string, reloadPosts: () => void }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [ userState, setUserState] = useRecoilState(UserStore)

  const [ timestamp, setTimestamp ] = useState('')

  const { register, handleSubmit, reset } = useForm()

  const [ postPending, setPostPending ] = useState(false)

  type SubmitPayload = {
    content: string
  }

  const handlePost: SubmitHandler<SubmitPayload> = (payload) => {
    const postBody = {
      content: payload.content,
      thread_key: threadKey
    };
    console.debug(postBody);
    (async () => {
      setPostPending(true)
      const res = await fetch(`${API_BASE}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'jwt-token': `Bearer ${userState.token!}`
        },
        body: JSON.stringify(postBody)
      })
      setPostPending(false)
      if (res.status === 200) {
        reloadPosts()
        reset()
      }
    })()
  }

  return (
    <div className={style.container}>
      <div className={style.title}>
        rkun
      </div>
      <div className={style.timestamp}>
        { timestamp }
      </div>
      <form onSubmit={handleSubmit(handlePost)}>
        <div className={style.content}>
          <input type='text' className={style.input} {...register('content')} placeholder='今何してる？' disabled={postPending}
          ></input>
        </div>
        <input className={style.submitButton} type='submit'></input>
      </form>
    </div>
  )
}