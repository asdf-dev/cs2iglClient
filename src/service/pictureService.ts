import { Smoke } from "@/model/Smoke";

export function smokeAssets(): string {
  const directoryPath = "assets/maps/mirage";

  try {
    return "hello";
  } catch (error: any) {
    console.error("unable to index smokes");
    throw error; // You can re-throw the error or handle it
  }
}
