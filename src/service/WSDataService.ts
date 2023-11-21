import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { lobbyStore } from "@/store/LobbyStore";
import { GrenadeAssignment } from "@/model/GrenadeAssignment";
import { Lobby } from "@/model/Lobby";
import { User } from "@/model/User";

let connection: HubConnection | null = null;


export const connect = async (lobbyId: string) => {
  const baseUrl = process.env.VUE_APP_WS_STATIC_BASE_URL;
  const connectionUrl = `${baseUrl}/LobbyHub?lobbyId=${lobbyId
    .replaceAll('"', "")
    .trim()}`;

  connection = new HubConnectionBuilder().withUrl(connectionUrl).build();

  connection.on("Lobby", (lobby: any) => {
    lobbyStore.setLobby(lobby);
  });

  connection.on(
    "UserInfo",
    (user: User) => {
      lobbyStore.setMember(user)
    }
  );

  connection.on(
    "GrenadeAssignmentsReceived",
    (grenadeAssignment: GrenadeAssignment[]) => {
      lobbyStore.SetGrenade(grenadeAssignment);
    }
  );

  await connection.start();
};

export const distributeGrenades = (grenadeAssignment: GrenadeAssignment[]) => {
  if (connection && connection.state === "Connected") {
    connection
      .invoke("DistributeGrenades", grenadeAssignment)
      .catch((error: any) => {
        console.error("Error sending message:", error);
      });
  } else {
    console.error("Connection is not established.");
  }
};

export const closeConnection = () => {
  if (connection && connection.state === "Connected") {
    connection.stop();
    connection = null;
  } else {
    console.error("Connection is not established.");
  }
};