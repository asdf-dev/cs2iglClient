import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { lobbyStore } from "@/store/LobbyStore";
import { GrenadeAssignment } from "@/model/GrenadeAssignment";

let connection: HubConnection | null = null;

export const connect = async (lobbyId: string) => {
  const baseUrl = process.env.VUE_APP_WS_STATIC_BASE_URL;
  const connectionUrl = `${baseUrl}/LobbyHub?lobbyId=${lobbyId
    .replaceAll('"', "")
    .trim()}`;

  connection = new HubConnectionBuilder().withUrl(connectionUrl).build();

  connection.on("Lobby", (lobby: any) => {
    console.debug(lobby);
    lobbyStore.setLobby(lobby);
  });

  connection.on(
    "GrenadeAssignmentsReceived",
    (grenadeAssignment: GrenadeAssignment[]) => {
      lobbyStore.SetGrenade(grenadeAssignment);
    }
  );

  console.debug("connecting");
  await connection.start();
  console.debug("connected to", lobbyId);
};

export const distributeGrenades = (grenadeAssignment: GrenadeAssignment[]) => {
  if (connection && connection.state === "Connected") {
    console.debug("distributeGrenades", grenadeAssignment);

    connection
      .invoke("DistributeGrenades", grenadeAssignment)
      .catch((error: any) => {
        console.error("Error sending message:", error);
      });
  } else {
    console.error("Connection is not established.");
  }
};
