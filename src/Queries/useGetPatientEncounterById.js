import { useQuery } from "@tanstack/react-query";

// const server = `${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_SERVER_PORT}`;

export function useGetPatientEncounterById(encounterId) {
  async function getEncounterById() {
    if (encounterId === "new") return -1;

    // async fetch request to the /get/ endpoint
    // const res = await fetch(`${server}/api/get/`);
    const res = await fetch(`/api/get/patient_encounter/${encounterId}`);

    // if res is an error, throw that error
    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    // json returns a promise, so our QF can return it
    return res.json();
  }

  return useQuery(["get", "patient_encounters", encounterId], getEncounterById);
}
