import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

export function usePutPatientEncounter() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  async function putPatientEncounter([patient_encounter, patient_id, encounter_id]) {
    const res = await fetch(
      `/api/update/patient_encounter/${encounter_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient_encounter),
      }
    );

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(putPatientEncounter, {
    onSuccess: (data, variables) => {
        const {patient_id} = variables;
        queryClient.invalidateQueries(["get", "patient_encounter", patient_id])

        navigate("../");
    },
    onError: (data, variables) => {},
    onSettled: (data, variables) => {
    },
  });
}
