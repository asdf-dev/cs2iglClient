// smoke jpg format TEAM_PLACE_description-space_NUMBER.jpg
export interface Smoke {
  map: string;
  team: TEAM;
  place: string;
  description: string;
  fullpath: string;
}

export enum TEAM {
  CT = "ct",
  T = "t",
}
