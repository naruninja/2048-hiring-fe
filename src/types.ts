export type TPlayer = {
   id: number
   name: string
   email: string
}

export type TScore = {
   id: number
   player: TPlayer
   score: number
}
