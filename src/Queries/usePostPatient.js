import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostPatient() {
  const queryClient = useQueryClient();

  async function postPatient([patientInfo]) {
    const res = await fetch(`/api/insert/patient/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientInfo),
    });

    if (res.status >= 400) throw new Error(`${res.status}: ${res.statusText}`);

    return res.json();
  }

  return useMutation(postPatient, {
    onSuccess: (data, variables) => {
      const [_, hideModal] = variables;
      queryClient.invalidateQueries(["get"]);
      if (hideModal) hideModal();
    },
    onError: (data, variables) => {},
    onSettled: (data, variables) => {},
  });
}
