import React, { useState, useEffect } from "react";
import DemographicsCard from "../DemographicsCard";
import { Modal as NextModal, Text, Button } from "@nextui-org/react";
import { usePostPatient } from "../../Queries/usePostPatient";
import { usePutPatient } from "../../Queries/usePutPatient";


const Modal = ({ activePatient, visible, hideModal }) => {
  const [demographicsFields, setDemographicsFields] = useState({
    first_name: activePatient?.["first_name"],
    last_name: activePatient?.["last_name"],
    dob: activePatient?.["dob"],
    gender: activePatient?.["gender"],
    smoker: activePatient?.["smoker"] === 1,
    // Need to get these values via a query:
    gyn: undefined,
    pregnant: undefined,
    last_period: undefined,
  });

  const postPatient = usePostPatient();
  const putPatient = usePutPatient();
  const saveMutation = activePatient ? putPatient : postPatient;

  useEffect(() => {
    if (activePatient)
      setDemographicsFields((fields) => ({
        ...fields,
        first_name: activePatient?.["first_name"],
        last_name: activePatient?.["last_name"],
        dob: activePatient?.["dob"],
        gender: activePatient?.["gender"],
        smoker: activePatient?.["smoker"] === 1,
      }));

    return () => {
      setDemographicsFields({
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        smoker: false,
        gyn: "",
        pregnant: "",
        last_period: "",
      });
    };
  }, [activePatient]);

  return (
    <NextModal
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={hideModal}
      width="40%">
      <NextModal.Header>
        <Text id="modal-title" size={18}>
          {demographicsFields.first_name || demographicsFields.last_name
            ? `${demographicsFields?.first_name} ${demographicsFields?.last_name}`
            : "Add New Patient"}
        </Text>
      </NextModal.Header>

      <NextModal.Body>
        <DemographicsCard
          patientInfo={demographicsFields}
          setPatientInfo={setDemographicsFields}
          hideModal={hideModal}
          saveMutation={saveMutation}
          patientId={activePatient?.id}
        />
      </NextModal.Body>

    </NextModal>
  );
};

export default Modal;
