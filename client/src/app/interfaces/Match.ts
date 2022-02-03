import { Team } from "./Team";

export interface Match {
  id: number,
  matchDate: string,
  tournament: string,
  firstTeam: Team,
  secondTeam: Team,
  firstTeamOdds: number,
  secondTeamOdds: number,
  winner?: Team
}