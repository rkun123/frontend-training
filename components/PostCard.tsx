import { useEffect, useState } from 'react'
import { Post } from '../schema'
import style from '../styles/PostCard.module.css'
import date from 'date-and-time'

export default function PostCard({ post }: { post: Post }) {

  const [ timestamp, setTimestamp ] = useState('')

  useEffect(() => {
    const d = new Date(0)
    if ( post.created_at ?? true) setTimestamp('-')
    d.setUTCSeconds(post.created_at!)
    setTimestamp(date.format(d, 'YYYY/MM/DD HH:mm:ss'))

  }, [post, setTimestamp])
  return (
    <div className={style.container}>
      <div className={style.leftBox}>
        <div className={style.title}>
          { post.author.name }
        </div>
        <div className={style.content}>
          { post.content }
        </div>
      </div>
      <div className={style.rightBox}>
        <div className={style.timestamp}>
          { timestamp }
        </div>
      </div>
    </div>
  )
}