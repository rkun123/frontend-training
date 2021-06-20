import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Post } from '../schema'
import style from '../styles/PostEdit.module.css'
import { useRecoilState } from 'recoil'
import UserStore from '../recoil/atoms/user'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function PostEdit({ threadKey, reloadPosts }: { threadKey: string, reloadPosts: () => void }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [ userState, setUserState] = useRecoilState(UserStore)

  const [ timestamp, setTimestamp ] = useState('')

  const submitRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset } = useForm()

  const [ postPending, setPostPending ] = useState(false)

  type SubmitPayload = {
    content: string
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.ctrlKey && e.key === 'Enter') {
      if(submitRef.current !== null) submitRef.current.click()
    }
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
    <div className="shadow rounded-lg p-4 flex items-center mb-4">
      <form onSubmit={handleSubmit(handlePost)} onKeyDown={handleKeyDown} className="flex-grow">
        <label className="text-xl font-bold mb-2">投稿</label>
        <textarea rows={4} className="shadow-sm p-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none w-full sm:text-sm border border-gray-300 rounded-lg" {...register('content')} placeholder='今何してる？' disabled={postPending}
        ></textarea>
        <div className="flex">
          <div className="flex-grow"></div>
          <div className="flex-shrink text-sm text-gray-500">Ctrl+Enterで送信</div>
        </div>
        <input className="hidden" type='submit' ref={submitRef}></input>
      </form>
    </div>
  )
}