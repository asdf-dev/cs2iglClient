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
    console.debug("SetGrenade");
    if (this.lobby != null) {
      console.debug("SetGrenade lobby not null");
      grenadeAssignments.forEach((grenadeAssignment) => {
        console.debug("SetGrenade each");
        console.debug(
          "SetGrenade grenadeAssignment.userId: ",
          grenadeAssignment.userId
        );
        console.debug(
          "SetGrenade grenadeAssignment.assignment:",
          grenadeAssignment.assignment
        );
        this.lobby!.members[grenadeAssignment.userId].grenadeAssignment =
          grenadeAssignment.assignment;
      });
    }
  },
});
