import { Grenade } from "./Grenade";

export interface MetaUser {
  online: boolean;
  name: string;
  grenadeAssignment: Grenade | null;
}
