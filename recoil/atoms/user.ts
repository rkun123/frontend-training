import { atom } from 'recoil'
import { User } from '../../schema'

type UserState = {
  me?: User,
  token?: string
}

const userState = atom<UserState>({
  key: 'userState',
  default: {}
})

export default userState