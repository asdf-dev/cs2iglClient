import { Members } from "./Members";

export interface Lobby {
  id: string;
  creator: string;
  inGameLeader: string;
  members: Members;
  createdTime: string;
}
