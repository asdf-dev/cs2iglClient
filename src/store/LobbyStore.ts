import { GrenadeAssignment } from "@/model/GrenadeAssignment";
import { Lobby } from "@/model/Lobby";
import { User } from "@/model/User";
import { reactive } from "vue";

export interface reactiveLobby {
  lobby: Lobby | null;
  update: number;
  SetGrenade: (grenadeAssignments: GrenadeAssignment[]) => void;
  setLobby: (lobby: Lobby | null) => void;
  setMember: (user: User) => void;
}

export const lobbyStore = reactive<reactiveLobby>({
  lobby: null,
  update: 0,

  setLobby(newLobbyState) {
    this.lobby = newLobbyState;
  },
  SetGrenade(grenadeAssignments: GrenadeAssignment[]) {
    if (this.lobby != null) {
      grenadeAssignments.forEach((grenadeAssignment) => {
        this.lobby!.members[grenadeAssignment.userId].grenadeAssignment =
          grenadeAssignment.assignment;
      });
    }
  },

  setMember(user) {
    if(this.lobby == null){
      return
    }
    (this.lobby.members as any)[user.id] = {
      online: user.online,
      name: user.name,
      grenadeAssignment: null,
    };
    this.update = Object.keys(this.lobby.members).length
  },
});
