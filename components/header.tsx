import style from '../styles/Header.module.css'
import Twemoji from 'react-twemoji'

export default function Header() {
  return (
    <div className={style.container}>
      <div className={style.title}>
        Sample Frontend
        <Twemoji tag='span'>🤪</Twemoji>
      </div>
    </div>
  )
}