import style from '../styles/ThreadList.module.css'
import { Thread } from '../schema'
import { useEffect, useState } from 'react'
import ThreadCard from './ThreadCard'
import 'process'

export default function ThreadList({ setCurrentThread }: { setCurrentThread: (thread_key?: string) => void}) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(async () => {
    const res = await fetch(`${API_BASE}/api/v1/threads`, {
      method: 'GET'
    })

    const t = await res.json() as Thread[]
    setThreads([...threads, ...t])
  }, [setThreads])

  return (
    <div className={style.container}>
      {
        threads.map((t) => (
          <ThreadCard thread={t} onSelect={setCurrentThread}/>
        ))
      }
    </div>
  )
}