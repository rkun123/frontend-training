import { useEffect, useState } from 'react'
import { Thread } from '../schema'
import style from '../styles/ThreadCard.module.css'
import { useRecoilState } from 'recoil'
import ThreadStore from '../recoil/atoms/thread'
import clsx from 'clsx'

export default function ThreadCard({ thread }: { thread: Thread }) {

  const [threadState, setThreadState] = useRecoilState(ThreadStore)
  const [isCurrentState, setIsCurrentState] = useState(false)

  useEffect(() => {
    console.debug(thread)
    setIsCurrentState(thread.key === threadState.currentThreadKey)
  }, [threadState, setIsCurrentState])

  function handleSelect() {
    setThreadState({
      ...threadState,
      currentThread: threadState.threads.find(t => t.key === thread.key),
      currentThreadKey: thread.key
    })
  }

  return (
    <div className={clsx("flex px-4 py-1 cursor-pointer", isCurrentState && style.selected)} onClick={handleSelect}>
      <div className={style.title}>
        { thread.name }
      </div>
    </div>
  )
}