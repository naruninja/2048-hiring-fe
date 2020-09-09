import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LeaderboardScreen } from './screens/LeaderboardScreen'
import { RegisterScreen } from './screens/RegisterScreen'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as ___ from 'styled-components/cssprop'
import { GameScreen } from './screens/GameScreen'
import 'styled-components/macro'

const App = () => {
   return (
      <BrowserRouter>
         <div
            className="App"
            css={`
               button {
                  background-color: #ddd;
                  border: 0;
                  border-radius: 4px;
                  padding: 8px 16px;

                  &:not([disabled]) {
                     cursor: pointer;
                  }
                  &:hover {
                     &:not([disabled]) {
                        background-color: #ccc;
                     }
                  }
               }
               a {
                  text-decoration: none;
                  color: #0078ff;
               }
            `}>
            <Switch>
               <Route path={'/'} exact>
                  <LeaderboardScreen />
               </Route>
               <Route path={'/register'} exact>
                  <RegisterScreen />
               </Route>
               <Route path={'/game'} exact>
                  <GameScreen />
               </Route>
            </Switch>
         </div>
      </BrowserRouter>
   )
}

export default App
