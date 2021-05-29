import { atom } from 'recoil'
import { Thread } from '../../schema'

type ThreadState = {
  currentThreadKey?: string
  currentThread?: Thread,
  threads: Thread[]
}

const threadState = atom<ThreadState>({
  key: 'threadState',
  default: {
    threads: []
  }
})

export default threadState
