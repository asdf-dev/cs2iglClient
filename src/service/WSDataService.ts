import { Lobby } from "@/model/Lobby";
import { User } from "@/model/User";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { lobbyStore } from "@/store/LobbyStore";
import { GrenadeAssignment } from "@/model/GrenadeAssignment";

let connection: HubConnection | null = null;

export const connect = async (lobbyId: string) => {
  const baseUrl = "https://stratapi.currentcapitalism.com";
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
      console.debug("GrenadeAssignmentsReceived", grenadeAssignment);
    }
  );

  connection.on("MessageReceieved", (user: User, message: string) =>
    console.log("MessageReceieved", user, message)
  );

  console.log("connecting...");
  await connection.start();
  console.debug("connected to", lobbyId);
};

export const sendMessage = (event: string, message: string) => {
  if (connection && connection.state === "Connected") {
    connection.invoke(event, message).catch((error: any) => {
      console.error("Error sending message:", error);
    });
  } else {
    console.error("Connection is not established.");
  }
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
