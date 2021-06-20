import { useEffect, useState } from 'react'
import { Post } from '../schema'
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
    <div className="shadow rounded-lg container flex h-auto p-4 mb-4">
      <div className="flex-shrink flex items-center">
        <div className="text-lg font-bold mr-3">
          { post.author.name }
        </div>
        <div className="flex-shrink">
          { post.content }
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex-shrink">
        <div className="text-gray-500">
          { timestamp }
        </div>
      </div>
    </div>
  )
}