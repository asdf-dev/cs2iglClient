export interface Player {
  id: string;
  name: string;
  color: PLAYERCOLOR;
}

export enum PLAYERCOLOR {
  //Value er hex
  PURPLE = "#a46bff",
  GREEN = "#00ff08",
  YELLOW = "#f6ff00",
  ORANGE = "#ff6f00",
  BLUE = "#007bff",
}
