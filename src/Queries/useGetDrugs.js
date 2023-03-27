import { useQuery } from "@tanstack/react-query";

export function useGetDrugs() {
  async function getDrugs() {
    const response = await fetch(`/api/get/drugs`);

    if (response.status >= 400)
      throw new Error(`${response.status}: ${response.statusText}`);
    return response.json();
  }
  return useQuery(["get", "drugs"], getDrugs);
}
