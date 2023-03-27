import { useQuery } from "@tanstack/react-query";

export default function useGetQueues() {
  async function getQueues() {
    const response = await fetch(`/api/test/queues/`);

    if (response.status >= 400)
      throw new Error(`${response.status}: ${response.statusText}`);
    return response.json();
  }

  const { data, status, error } = useQuery(["test", "queues"], getQueues);
  console.log("Data:", data);
  console.log("Status:", status);

  return { data, status, error };
}
