import { useRecoilState } from 'recoil'
import UserStore from '../recoil/atoms/user'

export default function Header() {

  const [ userState, setUserState] = useRecoilState(UserStore)

  return (
    <nav className="container rounded-b-lg bg-gray-800 text-white">
      <div className="flex items-center text-xl h-16 px-8">
        <div className="flex-shrink">
          ひろゆきも絶賛
        </div>
        <div className="flex-grow">
        </div>
        <div className="flex-shrink">
          { userState.me?.name }
        </div>
      </div>
    </nav>
  )
}