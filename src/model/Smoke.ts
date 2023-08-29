// smoke jpg format TEAM_PLACE_description-space_NUMBER.jpg
export interface Smoke {
  map: string;
  team: TEAM;
  place: string;
  description: string;
  version: string; //benyttes til kontrol imod cahce
}

export enum TEAM {
  CT = "ct",
  T = "t",
}
