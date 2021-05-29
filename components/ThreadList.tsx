import style from '../styles/ThreadList.module.css'
import { Thread } from '../schema'
import React, { useEffect, useState } from 'react'
import ThreadCard from './ThreadCard'
import { useRecoilState } from 'recoil'
import threadStore from '../recoil/atoms/thread'
import 'process'

export default function ThreadList() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE

  const [threadState, setThreadState] = useRecoilState(threadStore)

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/api/v1/threads`, {
        method: 'GET'
      })

      const t = await res.json() as Thread[]
      setThreadState({
        threads: t
      })
    })()
  }, [setThreadState])

  return (
    <div className={style.container}>
      {
        threadState.threads.map((t) => (
          <ThreadCard thread={t} />
        ))
      }
    </div>
  )
}