import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { TScore } from '_/types'
import { Card, SpaceBetweenRow, Horizontal, Vertical } from '../utils'
import 'styled-components/macro'
import { Link } from 'react-router-dom'
import { LoginModal } from './LoginModal'

const HIGH_SCORES = gql`
   query GetHighScores {
      allScores(orderBy: "score_DESC") {
         player {
            name
         }
         score
         id
      }
   }
`

const Leaderboard = () => {
   const { loading, error, data } = useQuery(HIGH_SCORES)
   if (error) {
      console.error(error)
   }

   return (
      <>
         {loading ? (
            <div>Loading...</div>
         ) : (
            <div>
               {data.allScores.slice(0, 10).map((score: TScore, i: number) => (
                  <SpaceBetweenRow
                     key={score.id}
                     css={`
                        &:not(:last-child) {
                           padding-bottom: 8px;
                           margin-bottom: 8px;
                           border-bottom: 1px solid #eee;
                        }
                     `}>
                     <Horizontal>
                        <div
                           css={`
                              width: 32px;
                              text-align: right;
                              padding-right: 16px;
                           `}>
                           {i + 1}
                        </div>
                        {score.player.name}
                     </Horizontal>
                     <div>{score.score}</div>
                  </SpaceBetweenRow>
               ))}
            </div>
         )}
      </>
   )
}

export const LeaderboardScreen = () => {
   const isAuthed = !!sessionStorage.getItem('token')
   const [isShowingLoginModal, setShowingLoginModal] = React.useState(false)

   return (
      <div
         css={`
            display: flex;
            justify-content: center;
            padding-top: 48px;
         `}>
         {isShowingLoginModal && (
            <LoginModal
               onResolve={() => {
                  setShowingLoginModal(false)
               }}
            />
         )}
         <Card
            css={`
               width: 400px;
            `}>
            <div
               css={`
                  font-size: 48px;
                  text-align: center;
                  font-weight: 700;
               `}>
               2048
            </div>
            <div
               css={`
                  font-size: 24px;
                  text-align: center;
                  margin-bottom: 32px;
               `}>
               Leaderboard
            </div>
            <div
               css={`
                  margin-bottom: 32px;
               `}>
               <Leaderboard />
            </div>
            {isAuthed ? (
               <Vertical
                  css={`
                     align-items: center;
                  `}>
                  <div
                     css={`
                        font-size: 24px;
                        margin-bottom: 8px;
                     `}>
                     Welcome back!
                  </div>
                  <Link to={'/game'}>
                     <button>New Game</button>
                  </Link>
               </Vertical>
            ) : (
               <Vertical>
                  <Horizontal
                     css={`
                        justify-content: center;
                        margin-bottom: 8px;
                     `}>
                     <div
                        css={`
                           margin-right: 8px;
                        `}>
                        <button
                           onClick={() => {
                              setShowingLoginModal(true)
                           }}>
                           Login
                        </button>
                     </div>

                     <Link to={'/register'}>
                        <button>Register</button>
                     </Link>
                  </Horizontal>
                  <div
                     css={`
                        text-align: center;
                     `}>
                     Login or register to start a new game.
                  </div>
               </Vertical>
            )}
         </Card>
      </div>
   )
}
