import { User } from "./User";
import { Grenade } from "./Grenade";

export interface MetaUser {
  online: boolean;
  user: User;
  grenadeAssignment: Grenade | null;
}
