import { useEffect } from 'react'
import { Post } from '../schema'
import style from '../styles/PostCard.module.css'

export default function ThreadCard({ post }: { post: Post }) {
  useEffect(() => {
    console.debug(post)
  })
  return (
    <div className={style.container}>
      <div className={style.title}>
        { post.content }
      </div>
    </div>
  )
}