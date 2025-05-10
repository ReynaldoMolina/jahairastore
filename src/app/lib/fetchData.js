import { baseUrl } from "@/app/lib/menuOptions";

export default async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}