import React, { useState, useEffect } from "react";
import DemographicsCard from "../DemographicsCard";
import { Modal as NextModal, Text } from "@nextui-org/react";

const Modal = ({ activePatient, visible, hideModal }) => {
  const [demographicsFields, setDemographicsFields] = useState({
    firstName: activePatient?.["first_name"],
    lastName: activePatient?.["last_name"],
    dateOfBirth: activePatient?.["dob"],
    sex: activePatient?.["gender"],
    smoker: activePatient?.["smoker"] === 1,
    // Need to get these values via a query:
    gyn: undefined,
    pregnant: undefined,
    lastPeriod: undefined,
  });

  useEffect(() => {
    if (activePatient)
      setDemographicsFields((fields) => ({
        ...fields,
        firstName: activePatient?.["first_name"],
        lastName: activePatient?.["last_name"],
        dateOfBirth: activePatient?.["dob"],
        sex: activePatient?.["gender"],
        smoker: activePatient?.["smoker"] === 1,
      }));

    return () => {
      setDemographicsFields({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        sex: "",
        smoker: false,
        gyn: "",
        pregnant: "",
        lastPeriod: "",
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
          {demographicsFields.firstName && demographicsFields.lastName
            ? `${demographicsFields.firstName} ${demographicsFields.lastName}`
            : "Add New Patient"}
        </Text>
      </NextModal.Header>

      <NextModal.Body>
        <DemographicsCard
          patientInfo={demographicsFields}
          setPatientInfo={setDemographicsFields}
        />
      </NextModal.Body>
    </NextModal>
  );
};

export default Modal;
