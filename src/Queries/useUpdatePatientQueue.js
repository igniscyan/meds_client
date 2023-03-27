import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdatePatientQueue() {
  const queryClient = useQueryClient();

  async function updatePatientQueue([patientId, newQueueId]) {
    console.log("PatientId:", patientId);
    console.log("NewQueueId:", newQueueId);
    const res = await fetch(`/api/update/patient_queue/${patientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queueStatus: newQueueId }),
    });

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(updatePatientQueue, {
    onSuccess: (data, variables) => {
      // Invalidate the patient queue query to refetch the data with the updated values
      queryClient.invalidateQueries(["get"]);
    },
    onError: (error, variables) => {
      console.error(error);
    },
    onSettled: (data, error, variables) => {
      // Optionally do something when the mutation is settled
    },
  });
}
