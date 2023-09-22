import { GrenadeAssignment } from "@/model/GrenadeAssignment";
import { Lobby } from "@/model/Lobby";
import { reactive } from "vue";

export interface reactiveLobby {
  lobby: Lobby | null;
  SetGrenade: (grenadeAssignments: GrenadeAssignment[]) => void;
  setLobby: (lobby: Lobby | null) => void;
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
});
