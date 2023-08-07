import { User, lobby } from "@/model/User";
import { ServiceResponse } from "@/model/ServiceResponse";
import axios, { AxiosResponse, AxiosError } from "axios";

const REST_BASE_URL = process.env.VUE_APP_NADE_STATIC_BASE_URL;

export async function fetchData(): Promise<string> {
  try {
    const response: AxiosResponse<string> = await axios.get(
      REST_BASE_URL + "/api/data"
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error; // You can re-throw the error or handle it
  }
}

export async function createUser(name: string): Promise<User> {
  const requestBody = {
    name: name,
  };

  try {
    const response = await axios.post<ServiceResponse<User>>(
      REST_BASE_URL + "/user",
      requestBody,
      {
        withCredentials: true,
      }
    );

    return response.data.data!;
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function createLobby(): Promise<lobby> {
  try {
    const response = await axios.post<ServiceResponse<lobby>>(
      REST_BASE_URL + "/lobby",
      null,
      {
        withCredentials: true,
      }
    );
    return response.data.data!;
  } catch (error: any) {
    console.error("Error creating lobby:", error);
    throw error;
  }
}
export async function joinLobby(lobbyId: string): Promise<string> {
  try {
    const response: AxiosResponse<string> = await axios.put(
      REST_BASE_URL + "/lobby/" + lobbyId,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating lobby:", error);
    throw error;
  }
}
