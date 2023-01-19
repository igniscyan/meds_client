import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostPatientEncounterMutation(patientInfo) {
  const queryClient = useQueryClient();
  
  async function postPatient() {
    const pid = patient_id || 0
    const res = await fetch(
      `http://localhost:3050/api/insert/patient/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientInfo),
      }
    );

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(postPatient, {
    onSuccess: (data, variables) => {
      // This might not work at all:
      queryClient.invalidateQueries(["get"]);
    },
    onError: (data, variables) => {},
    onSettled: (data, variables) => {},
  });
}
