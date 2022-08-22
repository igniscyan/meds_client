import { useMutation } from "@tanstack/react-query";

export function usePutPatientEncounterMutation() {
  async function putPatientEncounter([patient_encounter, patient_id]) {
    const res = await fetch(
      `http://localhost:3050/api/insert/patient_encounter/${patient_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient_encounter),
      }
    );

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(putPatientEncounter);
}
