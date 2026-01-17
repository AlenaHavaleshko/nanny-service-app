import type { Nanny } from "../types/types";
import axios from "axios";

const API_URL =
  "https://nanny-servies-app-default-rtdb.europe-west1.firebasedatabase.app/.json";

export async function getNannies(): Promise<Nanny[]> {
  const res = await axios.get(API_URL);
  const data = res.data;

  if (!data) return [];

  return Object.entries(data).map(([key, nanny]: [string, any]) => ({
    ...nanny,
    id: key,
  }));
}
