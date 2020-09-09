import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Horizontal, Card } from '../utils'
import 'styled-components/macro'
import { Link } from 'react-router-dom'

const NEW_GAME = gql`
   query {
      newGame {
         state
         score
         finished
      }
   }
`

const PROCESS_GAME = gql`
   mutation($input: GameInput!) {
      processGame(game: $input) {
         state
         score
         finished
      }
   }
`

const CREATE_SCORE = gql`
   mutation($input: ScoreCreateInput!) {
      createScore(data: $input) {
         id
      }
   }
`

type TGame = {
   state: number[][]
   score: number
   finished: boolean
}

type TGameDirection = 'Left' | 'Right' | 'Up' | 'Down'

type TGameInput = {
   state: TGame['state']
   score: TGame['score']
   direction: TGameDirection
}

type TScoreInput = {
   score: number
}

export const GameScreen = () => {
   return (
      <div
         css={`
            display: flex;
            justify-content: center;
            padding-top: 100px;
         `}>
         <Card>
            <div
               css={`
                  margin-bottom: 8px;
               `}>
               <Link to="/">Go to leaderboard</Link>
            </div>
            <GameBoard />
         </Card>
      </div>
   )
}

const colorsByValue: { [key: string]: string } = {
   '0': '#eee',
   '2': '#0078ff',
   '4': '#bd00ff',
   '8': '#ff9a00',
   '16': '#01ff1f',
   '32': '#e3ff00',
   '64': '#ff0000',
   '128': '#00ff11',
   '256': '#458eef',
   '512': '#8e45ef',
   '1024': '#ef458e',
   '2048': '#8900ff',
}

const GameField = ({ value }: { value: number }) => {
   const color = colorsByValue[value.toString()]
   return (
      <div
         style={{ backgroundColor: color }}
         css={`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 64px;
            height: 64px;
            border-radius: 4px;
            color: white;
            font-size: 32px;
            font-weight: 700;
         `}>
         {value}
      </div>
   )
}

const GameState = ({ state }: { state: TGame['state'] }) => {
   return (
      <div>
         {state.map((row, i) => {
            return (
               <Horizontal
                  key={i}
                  css={`
                     &:not(:last-child) {
                        margin-bottom: 8px;
                     }
                  `}>
                  {row.map((field, i) => {
                     return (
                        <div
                           key={i}
                           css={`
                              &:not(:last-child) {
                                 margin-right: 8px;
                              }
                           `}>
                           <GameField value={field} />
                        </div>
                     )
                  })}
               </Horizontal>
            )
         })}
      </div>
   )
}

const GameBoard = () => {
   const [game, setGame] = React.useState<TGame | null>(null)
   const { loading, error } = useQuery<{ newGame: TGame }>(NEW_GAME, {
      onCompleted: ({ newGame }) => {
         setGame(newGame)
      },
   })
   const refMutating = React.useRef(false)
   const [processGame] = useMutation<{ processGame: TGame }, { input: TGameInput }>(PROCESS_GAME)
   const [createScore] = useMutation<{}, { input: TScoreInput }>(CREATE_SCORE)

   React.useEffect(() => {
      const handler = async (e: KeyboardEvent) => {
         const match = e.key.match(/^Arrow(Up|Right|Down|Left)$/)
         if (!match || !game || refMutating.current || game.finished) return
         const direction = match[1] as TGameDirection
         refMutating.current = true
         const { data } = await processGame({
            variables: { input: { score: game.score, direction, state: game.state } },
         })
         refMutating.current = false
         if (data) {
            const { processGame } = data
            setGame(processGame)
            if (processGame.finished) {
               const res = await createScore({ variables: { input: { score: processGame.score } } })
               console.log('res', res)
            }
         }
      }
      document.addEventListener('keydown', handler)
      return () => {
         document.removeEventListener('keydown', handler)
      }
   }, [game, processGame, createScore])

   if (loading || !game) return <div>Loading</div>
   if (error) return <div>Error</div>

   const { state, finished, score } = game
   return (
      <div>
         <div
            css={`
               margin-bottom: 32px;
               font-size: 48px;
               font-family: monospace;
            `}>
            {score.toString().padStart(5, '0')}
         </div>
         {finished && (
            <div
               css={`
                  margin-bottom: 16px;
                  font-size: 32px;
                  font-family: monospace;
               `}>
               Game over!
            </div>
         )}
         <div
            css={`
               background-color: #333;
               padding: 8px;
               border-radius: 4px;
            `}>
            <GameState state={state} />
         </div>
      </div>
   )
}
