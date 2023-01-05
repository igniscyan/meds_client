import React, { useState } from "react";
import { Grid, Text, Input, Button, Checkbox, Card, Textarea } from "@nextui-org/react";
import AddField from "../AddField";
import DemographicsCard from "../DemographicsCard";
import { usePostPatientEncounterMutation } from "../../Queries/usePostPatientEncounterMutation";

const PatientEncounter = () => {
  const [encounterFields, setEncounterFields] = useState({
    height: null,
    weight: null,
    temperature: null,
    systolic: null,
    diastolic: null,
    heartRate: null,
    respRate: null,
    triageNote: null,
    medNote: null,
    pharmNote: null,
    eyeNote: null,
    dentalNote: null,
    goodiesNote: null,
    location: null,
    open: null,
  });

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
    <Card>
      <Grid.Container gap={2.5} justify="center">
        {/* Vitals Section */}
        <Grid xs={12} justify="left">
          <Text h1>
            Vitals
          </Text>
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Temperature" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Systolic Pressure" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Diastolic Pressure" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Heart Rate" />
        </Grid>
        <Grid xs={2}>
          <Input bordered type="number" labelPlaceholder="Respiratory" />
        </Grid>

        {/* Chief Complaint Section */}
        <Grid xs={12} justify="left">
          <Text h1>Chief Complaint</Text>
        </Grid>
        <Grid xs={12} justify='center'>
          <Checkbox.Group
            size='xs'
            orientation='horizontal'>
            <Checkbox value="ABDOMINAL PAIN" label="ABDOMINAL PAIN" />
            <Checkbox value="ANXIETY/NERVOUSNESS" label="ANXIETY/NERVOUSNESS" />
            <Checkbox value="BACK PAIN" label="BACK PAIN" />
            <Checkbox value="CHEST PAIN" label="CHEST PAIN" />
            <Checkbox value="COUGH" label="COUGH" />
            <Checkbox value="DEPRESSION" label="DEPRESSION" />
            <Checkbox value="DIARRHEA" label="DIARRHEA" />
          </Checkbox.Group>
        </Grid>
        <Grid xs={12} justify="center">
          <Checkbox.Group
            size='xs'
            orientation='horizontal'>
            <Checkbox value="DIZZINESS" label="DIZZINESS" />
            <Checkbox value="EARACHE" label="EARACHE" />
            <Checkbox value="FATGIUE" label="FATIGUE" />
            <Checkbox value="FEVER/CHILLS/SWEATS" label="FEVER/CHILLS/SWEATS" />
            <Checkbox value="HEADACHE" label="HEADACHE" />
            <Checkbox value="JOINT PAIN" label="JOINT PAIN" />
            <Checkbox value="NAUSEA" label="NAUSEA" />
          </Checkbox.Group>
        </Grid>
        <Grid xs={12} justify='center'>
          <Checkbox.Group
            size='xs'
            orientation='horizontal'>
            <Checkbox value="NECK MASS" label="NECK MASS" />
            <Checkbox value="NUMBNESS" label="NUMBNESS" />
            <Checkbox value="PALPITATIONS" label="PALPITATIONS" />
            <Checkbox value="RASH" label="RASH" />
            <Checkbox value="SHORTNESS OF BREATH" label="SHORTNESS OF BREATH" />
            <Checkbox value="SOFT TISSUE INJURY" label="SOFT TISSUE INJURY" />
            <Checkbox value="SORE THROAT" label="SORE THROAT" />
          </Checkbox.Group>
        </Grid>
        <Grid xs={12} justify='center'>
          <Checkbox.Group
            size='xs'
            orientation='horizontal'>
            <Checkbox value="TENDER NECK" label="TENDER NECK" />
            <Checkbox value="UPPER RESPIRATORY SYMPTOMS" label="UPPER RESPIRATORY SYMPTOMS" />
            <Checkbox value="URINARY SYMPTOMS" label="URINARY SYMPTOMS" />
            <Checkbox value="VAGINAL DISCHARGE" label="VAGINAL DISCHARGE" />
            <Checkbox value="VOMITING" label="VOMITING" />
            <Checkbox value="VISION CHANGES" label="VISION CHANGES" />
          </Checkbox.Group>
        </Grid>

        {/* Add Chief Complaint Section */}
        <Grid xs={12} justify="center">
          <AddField name="Chief Complaint" />
        </Grid>
        <Grid xs={12} height='1200px'>
          <Textarea
            label='Enter Triage Notes'
            height='100%'
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
            size='l'
            status='secondary'
            fullWidth />
        </Grid>
        
        <Grid xs={12} height>
          <Textarea
            label='Enter Pharmacy Notes'
            height='auto'
            value=''
            size='l'
            status='secondary'
            fullWidth />
        </Grid>
        <Grid xs={12} height>
          <Textarea
            label='Dental Notes'
            height='auto'
            value=''
            size='l'
            status='secondary'
            fullWidth />
        </Grid>
        <Grid xs={12} height>
          <Textarea
            label='Optometrist Notes'
            height='auto'
            value=''
            size='l'
            status='secondary'
            fullWidth />
        </Grid>

        {/* Submit Button */}
        {/* <Button onPress={submitForm}>Hope this works...</Button> */}
      </Grid.Container>
    </Card>
  );
};

export default PatientEncounter;
