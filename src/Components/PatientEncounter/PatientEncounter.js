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
import { useGetPatientEncounterById } from "../../Queries/useGetPatientEncounterById";
import Select from "react-select";
import { useParams } from "react-router-dom";

const complaintsObj = [
  {
    value: 1,
    label: "ABDOMINAL PAIN",
  },
  {
    value: 2,
    label: "ANXIETY/NERVOUSNESS",
  },
  {
    value: 3,
    label: "BACK PAIN",
  },
  {
    value: 4,
    label: "CHEST PAIN",
  },
  {
    value: 5,
    label: "COUGH",
  },
  {
    value: 6,
    label: "DEPRESSION",
  },
  {
    value: 7,
    label: "DIARRHEA",
  },
  {
    value: 8,
    label: "DIZZINESS",
  },
  {
    value: 9,
    label: "EARACHE",
  },
  {
    value: 10,
    label: "FATIGUE",
  },
  {
    value: 11,
    label: "FEVER/CHILLS/SWEATS",
  },
  {
    value: 12,
    label: "HEADACHE",
  },
  {
    value: 13,
    label: "JOINT PAIN",
  },
  {
    value: 14,
    label: "NECK MASS",
  },
  {
    value: 15,
    label: "PALPITATIONS",
  },
  {
    value: 16,
    label: "RASH",
  },
  {
    value: 17,
    label: "SHORTNESS OF BREATH",
  },
  {
    value: 18,
    label: "SOFT TISSUE INJURY",
  },
  {
    value: 19,
    label: "SORE THROAT",
  },
  {
    value: 20,
    label: "TENDER NECK",
  },
  {
    value: 21,
    label: "UPPER RESPIRATORY SYMPTOMS",
  },
  {
    value: 22,
    label: "URINARY SYMPTOMS",
  },
  {
    value: 23,
    label: "VAGINAL DISCHARGE",
  },
  {
    value: 24,
    label: "VOMITING",
  },
  {
    value: 25,
    label: "VISION CHANGES",
  },
];

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
    triage_note: null,
    med_note: null,
    pharm_note: null,
    eye_note: null,
    dental_note: null,
    goodies_note: null,
    location: null,
    open: null,
  });

  const {encounterId} = useParams();
  const existingEncounter = useGetPatientEncounterById(encounterId);
  useEffect(() => {
    if(existingEncounter.data && existingEncounter.data !== -1) {
      const encounterFieldLabels = Object.keys(encounterFields);
      encounterFieldLabels.forEach(field => setEncounterFields({...encounterFields, [field]: existingEncounter.data[0][field]}));
    }
  }, [existingEncounter.status]);

  const addPatientEncounter = usePostPatientEncounterMutation();

  const submitForm = () => {
    // todo: need to get the patient's gyn info before making this mutation
    addPatientEncounter.mutate([
      {
        gyn: null,
        pregnant: null,
        lastPeriod: null,
        ...encounterFields,
      },
      1,
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
          <Input bordered type="number" labelPlaceholder="Temperature" onChange={e => handleChange("temp", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Systolic Pressure" onChange={e => handleChange("systolic", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Diastolic Pressure" onChange={e => handleChange("diastolic", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Heart Rate" onChange={e => handleChange("heartRate", e.target.value)} />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Respiratory" onChange={e => handleChange("respRate", e.target.value)} />
        </Grid>

        {/* Chief Complaint Section */}
        <Grid xs={12} justify="left">
          <Text h1>Chief Complaint</Text>
        </Grid>
        <Grid xs={12} justify="left">
          <div style={{width: '100%'}}>
            <Select options={complaintsObj} autosize={true} onChange={e => handleChange("chief_complaint", e.value)}/>
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
            value={`CHIEF COMPLAINT: 
            
            HPI: 
            
            ALLERGIES
            MEDICATION:
            ENVIRONMENTAL:
            FOOD ALLERGIES:
            
            MEDICATIONS/SUPPLEMENTS/OTC
            MEDICATIONS: 
            OTC: 
            SUPPLEMENTS: 
            
            PAST MEDICAL HISTORY: 
            ONGOING MEDICAL PROBLEMS: 
            PAST SURGERIES/HOSPITALIZATIONS: 
            RESOLVED MEDICAL PROBLEMS: 
            
            HEALTH MAINTENANCE
            VACCINATIONS (Pneumo 65 y/o): 
            MAMMOGRAM (40 y/o):  
            PAP SMEAR: 
            COLONOSCOPY (45 y/o): 
            
            GYN HX
            LMP: 
            SEXUALLY ACTIVE: 
            METHOD OF CONTRACEPTION: 
            GTPAL (GRAVIDA, TERM, PRETERM, ABORTION, LIVING): 
            
            SOCIAL HX
            SUBSTANCE USE: 
            SMOKING: 
            ETOH: 
            RECREATIONAL DRUGS: 
            LIVING SITUATION: 
            OCCUPATION: 
            DIET: 
            SEXUAL HX: 
            SLEEP: 
            TRAVEL: 
            EXCERCISE: 
            HOBBIES: 
            SAFETY: 
            RELIGION:
            
            FAMILY HX
            MOTHER: 
            FATHER: 
            SIBLINGS: 
            OTHER FIRST DEGREE RELATIVES: 
            
            ROS
            CONSTITUTIONAL:
            EYES:
            INTEGUMENTARY: 
            NEUROLOGIC: 
            RESPIRATION: 
            CARDIOVASCULAR: 
            GASTROINTESTINAL: 
            GENITOURINARY: 
            ENDOCRINE: 
            PSYCHIATRIC: 
            MUSCULOSKELTAL: 
            HEMATOLOGIC/LYMPHATIC:`}
            size="l"
            status="secondary"
            fullWidth
          />
        </Grid>

        <Grid xs={12} >
          <Textarea
            label="Enter Pharmacy Notes"
            height="auto"
            value=""
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("pharmNote", e.target.value)}
          />
        </Grid>
        <Grid xs={12} >
          <Textarea
            label="Dental Notes"
            height="auto"
            value=""
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("dentalNote", e.target.value)}
          />
        </Grid>
        <Grid xs={12} >
          <Textarea
            label="Optometrist Notes"
            height="auto"
            value=""
            size="l"
            status="secondary"
            fullWidth
            onChange={e => handleChange("eyeNote", e.target.value)}
          />
        </Grid>

        {/* Submit Button */}
        <Button onPress={submitForm}>Hope this works...</Button>
      </Grid.Container>
    </Container>
  );
};

export default PatientEncounter;
