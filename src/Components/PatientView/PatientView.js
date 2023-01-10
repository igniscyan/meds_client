import React, { useState, useEffect, useMemo} from "react";
import { useGet as GetPatients } from "../../Queries/useGet";
import { Container, Button, Table, Spacer, Input} from "@nextui-org/react";
import DemographicsCard from "../DemographicsCard";
import Modal from "./Modal";

const PatientView = () => {
  const patients = GetPatients();

  const [activePatient, setActivePatient] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredResults, setFilteredResults] = useState([])
  
  const showModal = (patient = undefined) => {
    setActivePatient(patient);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
    setActivePatient(undefined);
  };



  console.log(patients.data);

  if (patients.isLoading) return <div>Loading patients...</div>;

  if (patients.isError)
    return <div>Error loading patients: {patients.error.message}</div>;

  if (patients.data){
    
    let id = 1;
    const rows = patients.data.map(patient =>({
      id: patient.id++,
      first_name: patient.first_name,
      last_name: patient.last_name,
      dob: patient.dob,
      gender: patient.gender,
      smoker: patient.smoker
    }));

    const filteredRows = useMemo(() => {
      if (!searchTerm) return rows;

      if (rows.length > 0) {
        const attributes = Object.keys(rows[0]);

        const list = [];

        for (const current of rows) {
          for (const attribute of attributes) {
            if (attribute === "key") {
              continue;
            }

            const value = current[attribute];
            if (value && value.toLowerCase() === searchTerm.toLowerCase()) {
              const found = rows.find((row) => row.key === current.key); 
              if (found) {
                list.push(found);
              }
            }
          }
        }
        return list;
      }

      return [];
    }, [searchTerm, rows]);



    return (
      <div>
        <Spacer y={4} />
        <Input
          size = "lg"
          bordered
          clearable
          placeholder = "Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <Table
          aria-label="Patient Entry Table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}>
          <Table.Header>
            <Table.Column key='name'>NAME</Table.Column>
            <Table.Column key='dob'>DOB</Table.Column>
            <Table.Column key='gender'>GENDER</Table.Column>
            <Table.Column key='tobacco'>TOBACCO</Table.Column>
            <Table.Column key='demographics'>VIEW DEMOGRAPHICS</Table.Column>
            <Table.Column key='history'></Table.Column>
            <Table.Column key='addEncounter'>Add Encounter</Table.Column>
          </Table.Header>

          <Table.Body>
            {filteredRows.map((patient) => (
              <Table.Row key={patient.id}>
                <Table.Cell>
                  {patient.first_name} {patient.last_name}
                </Table.Cell>
                <Table.Cell>{patient.dob}</Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.smoker ? "yes" : "no"}</Table.Cell>
                <Table.Cell>
                  <Button
                    bordered
                    color="primary"
                    auto
                    onClick={() => showModal(patient)}>
                    Demographics
                  </Button>
                </Table.Cell>
                <Table.Cell>
                <Button
                    bordered
                    color="primary"
                    auto
                    onClick={() => showModal(patient)}>
                    View Encounters
                  </Button>
                </Table.Cell>
                <Table.Cell>
                <Button
                    bordered
                    color="primary"
                    auto
                    onClick={() => showModal(patient)}>
                    + Add
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Add New Patient Button */}
        <Button shadow color="primary" auto onClick={() => showModal()}>
          Add New Patient
        </Button>

        {/* Modal */}
        <Modal
          activePatient={activePatient}
          visible={modalVisible}
          hideModal={hideModal}
        />
      </div>
    );
  }
};

export default PatientView;
