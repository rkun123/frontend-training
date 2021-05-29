import { atom } from 'recoil'
import { Post } from '../../schema'

type PostState = {
  edit: Post,
  posts: Post[]
}

const postState = atom<PostState>({
  key: 'postState',
  default: {
    edit: {
      content: '',
      author: {
        name: '',
        description: ''
      }
    },
    posts: []
  }
})

export default postState
