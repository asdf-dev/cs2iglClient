import { GrenadeAssignment } from "@/model/GrenadeAssignment";
import { Lobby } from "@/model/Lobby";
import { User } from "@/model/User";
import { reactive } from "vue";

export interface reactiveLobby {
  lobby: Lobby | null;
  SetGrenade: (grenadeAssignments: GrenadeAssignment[]) => void;
  setLobby: (lobby: Lobby | null) => void;
  setMember: (user: User) => void;
}

export const lobbyStore = reactive<reactiveLobby>({
  lobby: null,

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
    for (const memberId in this.lobby?.members) {
      if (Object.prototype.hasOwnProperty.call(this.lobby.members, memberId)) {
        const member = this.lobby.members[memberId]
        member.online = user.online
      }
    }
  },
});
