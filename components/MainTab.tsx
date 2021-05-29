import ThreadList from './ThreadList'
import PostList from './PostList'

export default function MainTab({ tab }: { tab: 'threads' | 'posts'}) {
  return tab === 'threads' ? (
    <ThreadList />
  ): (
    <PostList />
  )
}