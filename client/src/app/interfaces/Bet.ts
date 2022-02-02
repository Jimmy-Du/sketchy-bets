import { Match } from "./Match";

export interface Bet {
  id: number,
  amount: number,
  selectedFirstTeam: boolean,
  match: Match,
  win?: boolean,
  winLoseAmount?: number
}