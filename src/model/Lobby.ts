import { Member } from "./Member";

export interface Lobby {
  id: string;
  creator: string;
  inGameLeader: string;
  members: Member;
}
