import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import UserStore from '../recoil/atoms/user'
import style from '../styles/Signin.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'

function Signin() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE
  const [ userState, setUserState ] = useRecoilState(UserStore)
  const { handleSubmit, register } = useForm()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  type SigninPayload = {
    email: string,
    password: string
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if ( token !== null) {
      setUserState({ ...userState, token })
    }
  })

  const handleSignin: SubmitHandler<SigninPayload> = (payload) => {
    (async () => {
      const res = await fetch(`${API_BASE}/api/v1/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      if(res.status === 200) {
        const resBody = await res.json()
        const token = resBody.jwt
        localStorage.setItem('jwt', token)
        setUserState({ ...userState, token })
      }
    })()
  }
  
  return (
    <div className={style.container}>
      <h3 className={style.title}>Signin</h3>
      <form onSubmit={handleSubmit(handleSignin)}>
        <div className={style.formEntry}>
          <label className={style.label}>EMail</label>
          <input type='email' className={style.formTextInput} placeholder='user@example.com'
          {...register('email', {
            required: '必須',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'メールアドレスを入力してください。'
            }
          })}></input>
        </div>
        <div className={style.formEntry}>
          <label className={style.label}>Password</label>
          <input type='password' className={style.formTextInput}
          {...register('password', {
            required: '必須',
          })}></input>
        </div>
        <div className={style.formEntry}>
          <input type='submit' />
        </div>
      </form>
    </div>
  )
}

export default Signin