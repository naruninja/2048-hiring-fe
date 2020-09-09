import React from 'react'
import 'styled-components/macro'
import { gql, useMutation } from '@apollo/client'
import { Horizontal, Vertical, Card } from '../utils'

const AUTH_ME = gql`
   mutation AuthMe($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
         token
      }
   }
`

const LoginCard = ({ onResolve }: { onResolve: () => void }) => {
   const [authMe] = useMutation<
      { authenticateUserWithPassword: { token: string } },
      { email: string; password: string }
   >(AUTH_ME)
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')

   return (
      <Card
         css={`
            input {
               width: 300px;
               padding: 8px;
               border-radius: 4px;
               border: 1px solid #ddd;
            }
         `}>
         <div
            css={`
               font-size: 32px;
               font-weight: 700;
               margin-bottom: 16px;
            `}>
            Login
         </div>
         <Vertical>
            <input
               placeholder="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               css={`
                  margin-bottom: 8px;
               `}
            />
            <input
               placeholder="password"
               type="password"
               onChange={e => setPassword(e.target.value)}
               css={`
                  margin-bottom: 16px;
               `}
            />
            <button
               onClick={async () => {
                  const res = await authMe({
                     variables: {
                        email,
                        password,
                     },
                  })
                  if (res.data) {
                     const {
                        data: {
                           authenticateUserWithPassword: { token },
                        },
                     } = res
                     sessionStorage.token = token
                     onResolve()
                     // TODO: save token
                  }
               }}>
               Login
            </button>
         </Vertical>
      </Card>
   )
}

export const LoginModal = ({ onResolve }: { onResolve: () => void }) => {
   return (
      <Horizontal
         css={`
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            justify-content: center;
            padding-top: 40px;
         `}>
         <Vertical>
            <LoginCard onResolve={onResolve} />
         </Vertical>
      </Horizontal>
   )
}
