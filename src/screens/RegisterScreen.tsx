import React from 'react'
import 'styled-components/macro'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { Horizontal, Vertical, Card } from '../utils'

const REGISTER_ME = gql`
   mutation RegisterMe($data: UserCreateInput!) {
      createUser(data: $data) {
         id
         name
      }
   }
`

type TUserCreateInput = {
   name: string
   email: string
   password: string
}

type TUserWithoutEmail = {
   id: number
   name: string
}

export const RegisterScreen = () => {
   return (
      <Horizontal
         css={`
            padding: 64px;
            display: flex;
            justify-content: center;
         `}>
         <Horizontal>
            <RegisterCard />
         </Horizontal>
      </Horizontal>
   )
}

const RegisterCard = () => {
   const [registerMe] = useMutation<{ createUser: TUserWithoutEmail }, { data: TUserCreateInput }>(
      REGISTER_ME
   )
   const [name, setName] = React.useState('')
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
   const containsCorrectData = name !== '' && email !== '' && password.length >= 8
   const history = useHistory()
   return (
      <Card
         css={`
            width: 700px;
            padding: 64px;
            input {
               padding: 8px;
               border-radius: 4px;
               border: 1px solid #ddd;
            }
         `}>
         <div
            css={`
               font-size: 32px;
               font-weight: 700;
               margin-bottom: 32px;
            `}>
            Sign up for a free account
         </div>
         <Vertical
            css={`
               & > input {
                  margin-bottom: 16px;
               }
            `}>
            <input
               placeholder="Your name or nickname"
               value={name}
               onChange={e => setName(e.target.value)}
            />
            <input
               placeholder="E-mail address"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
            <input
               placeholder="Password"
               type="password"
               onChange={e => setPassword(e.target.value)}
            />
            <button
               disabled={!containsCorrectData}
               onClick={async () => {
                  await registerMe({
                     variables: {
                        data: {
                           email,
                           name,
                           password,
                        },
                     },
                  })
                  history.push('/')
               }}>
               Register me
            </button>
         </Vertical>
      </Card>
   )
}
