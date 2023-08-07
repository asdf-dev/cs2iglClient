import axios, { AxiosResponse, AxiosError } from "axios";

export async function fetchData(): Promise<string> {
  const REST_BASE_URL = "";

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
