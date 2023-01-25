import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Text,
  Input,
  Button,
  Checkbox,
  Card,
  Textarea,
} from "@nextui-org/react";
import AddField from "../AddField";
import DemographicsCard from "../DemographicsCard";
import { usePostPatientEncounterMutation } from "../../Queries/usePostPatientEncounterMutation";
import { usePutPatientEncounter } from "../../Queries/usePutPatientEncounterMutation";
import { useGetPatientEncounterById } from "../../Queries/useGetPatientEncounterById";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { triageTemplate } from "./constants";
import { complaintsObj } from "../utils";


const PatientEncounter = () => {
  const [encounterFields, setEncounterFields] = useState({
    chief_complaint: null,
    height: null,
    patient_weight: null,
    temp: null,
    systolic: null,
    diastolic: null,
    heart_rate: null,
    resp_rate: null,
    triage_note: triageTemplate,
    med_note: null,
    pharm_note: null,
    eye_note: null,
    dental_note: null,
    goodies_note: null,
    location: null,
    open: null,
  });
  const {patientId, encounterId} = useParams();

  const existingEncounter = useGetPatientEncounterById(encounterId);
  useEffect(() => {
    if(existingEncounter.data && existingEncounter.data !== -1) {
      setEncounterFields(existingEncounter.data[0]);
    }
  }, [existingEncounter.status]);

  
  const addPatientEncounter = usePostPatientEncounterMutation();
  const updatePatientEncounter = usePutPatientEncounter();
  const submitForm = () => {
    const mutation = encounterId === "new" ? addPatientEncounter : updatePatientEncounter;
    // TODO: need to get the patient's gyn info before making this mutation
    mutation.mutate([
      {
        chief_complaint: encounterFields.chief_complaint,
        gyn: null,
        pregnant: null,
        last_menstrual_period: null,
        height: encounterFields.height,
        patient_weight: encounterFields.patient_weight,
        temp: encounterFields.temp,
        systolic: encounterFields.systolic,
        diastolic: encounterFields.diastolic,
        heart_rate: encounterFields.heart_rate,
        resp_rate: encounterFields.resp_rate,
        triage_note: encounterFields.triage_note,
        med_note: encounterFields.med_note,
        pharm_note: encounterFields.pharm_note,
        eye_note: encounterFields.eye_note,
        dental_note: encounterFields.dental_note,
        goodies_note: encounterFields.goodies_note,
        location: encounterFields.location,
        open: encounterFields.open,
      },
      patientId,
      encounterId,
    ]);
  };

  const handleChange = (propertyName, newValue) => {
    setEncounterFields({ ...encounterFields, [propertyName]: newValue });
  };

  return (
    <Container>
      <Grid.Container gap={2.5} justify="center">
        {/* Vitals Section */}
        <Grid xs={12} justify="left">
          <Text h1>Vitals</Text>
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Temperature" value={encounterFields.temp || ""} onChange={e => handleChange("temp", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Systolic Pressure" value={encounterFields.systolic || ""} onChange={e => handleChange("systolic", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Diastolic Pressure" value={encounterFields.diastolic || ""} onChange={e => handleChange("diastolic", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Heart Rate" value={encounterFields.heart_rate || ""} onChange={e => handleChange("heart_rate", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Respiratory" value={encounterFields.resp_rate || ""} onChange={e => handleChange("resp_rate", e.target.value)} />
        </Grid>

        {/* Chief Complaint Section */}
        <Grid xs={12} justify="left">
          <Text h1>Chief Complaint</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <div style={{width: '100%'}}>
            <Select options={complaintsObj} autosize={true} value={complaintsObj[encounterFields.chief_complaint-1 || 0]} onChange={e => handleChange("chief_complaint", e.value)}/>
          </div>
        </Grid>

        {/* Add Chief Complaint Section */}
        {/* <Grid xs={12} justify="center">
          <AddField name="Chief Complaint" />
        </Grid> */}
        <Grid xs={12} height="1200px">
          <Textarea
            label="Enter Triage Notes"
            height="100%"
            value={encounterFields.triage_note || triageTemplate}
            onChange={e => handleChange("triage_note", e.target.value)}
            size="l"
            status="secondary"
            fullWidth
          />
        </Grid>

        <Grid xs={12} >
          <Textarea
            label="Enter Pharmacy Notes"
            height="auto"
            value={encounterFields.pharm_note || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("pharm_note", e.target.value)}
          />
        </Grid>
        <Grid xs={12} >
          <Textarea
            label="Dental Notes"
            height="auto"
            value={encounterFields.dental_note || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("dental_note", e.target.value)}
          />
        </Grid>
        <Grid xs={12} >
          <Textarea
            label="Optometrist Notes"
            height="auto"
            value={encounterFields.eye_note || ""}
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("eye_note", e.target.value)}
          />
        </Grid>

        {/* Submit Button */}
        <Button onPress={submitForm}>Hope this works...</Button>
      </Grid.Container>
    </Container>
  );
};

export default PatientEncounter;
