import { useEffect } from 'react'
import { Thread } from '../schema'
import style from '../styles/ThreadCard.module.css'

export default function ThreadCard({ thread }: { thread: Thread }) {
  useEffect(() => {
    console.debug(thread)
  })
  return (
    <div className={style.container}>
      <div className={style.title}>
        { thread.name }
      </div>
    </div>
  )
}