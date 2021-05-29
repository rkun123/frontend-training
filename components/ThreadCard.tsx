import { useEffect } from 'react'
import { Thread } from '../schema'
import style from '../styles/ThreadCard.module.css'

export default function ThreadCard({ thread, onSelect }: { thread: Thread, onSelect: (thread_key?: string) => void }) {
  useEffect(() => {
    console.debug(thread)
  })

  function handleSelect() {
    onSelect(thread.key)
  }

  return (
    <div className={style.container} onClick={handleSelect}>
      <div className={style.title}>
        { thread.name }
      </div>
    </div>
  )
}