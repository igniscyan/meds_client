import React, { useState, useEffect, useMemo } from "react";
import { useGet as GetPatients } from "../../Queries/useGet";
import useGetQueues from "../../Queries/useGetQueues";
import { Container, Button, Table, Spacer, Input } from "@nextui-org/react";
import DemographicsCard from "../DemographicsCard";
import Select from "react-select";
import Modal from "../PatientView/Modal";
import {Link} from "react-router-dom";
import { formatDateString } from "../../utils/stringUtils";

const Queue  = () => {
  const patients = GetPatients();
  const allQueues = useGetQueues();

  // TODO: Implement this mutation, and pull it into this file
  // const moveQueueMutation = useMoveQueueMutation();
  // ^^^ ACTUALLY FUCK THAT ^^^
  // Instead, you can just call the update patient mutation, sending along a copy of the patient with an updated `queue` attr
  let moveQueueOptions = [];
  if(allQueues.data && allQueues.succeeded) {
    moveQueueOptions = allQueues.map(q => ({
      label: q.name,
      value: q.id,
      onClick: () => {
        const patientId = patients.filter(p => p.queue = q.id).id;
        // moveQueueMutation.mutate(patientId, q.id);
      }
    }))
  }

  const [activePatient, setActivePatient] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredResults, setFilteredResults] = useState([])

  const showModal = (patient = undefined) => {
    setActivePatient(patient);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
    setActivePatient(undefined);
  };

  function filterRows(rows, queue) {
    //Filter rows by queue, then search by name
    const filteredRows = rows.filter((row) =>{
      if(row.queue === queue) return row;
    } );
    console.log("filteredRows", filteredRows);

    if (searchTerm) {
      return filteredRows.filter((row) => {
        row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }
    else return filteredRows;

  }

  // Get all queues which currently have a patient in them
  // Currently this pulls data from patients, but we ideally want to filter allQueues
  function getUniqueActiveQueues(data){
    const queues = data.map((patient) => patient.queue)
    return [...new Set(queues)]
  }
  

  if (patients.isLoading) return <div>Loading patients...</div>;

  if (patients.isError)
    return <div>Error loading patients: {patients.error.message}</div>;

  if (patients.data) {
    const rows = patients.data.map((patient) => ({
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      dob: patient.dob,
      gender: patient.gender,
      smoker: patient.smoker,
      queue: patient.queue,
    }));

    const uniqueActiveQueues = getUniqueActiveQueues(patients.data);


    //const filteredRows = filterRows(rows);

    return (
      <Container>
        <Spacer y={4} />
        <Input
          size="lg"
          bordered
          clearable
          placeholder="Search entries..."
          value={searchTerm}
          aria-label="Search patients by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {uniqueActiveQueues.map((queue) => {
          console.log(queue);
          const filteredRows = filterRows(rows, queue);
          console.log("filteredRows", filteredRows);

          return (
            <React.Fragment key={queue}>
              <Spacer y={2}/>
              <h2>Queue: {queue}</h2>

              <Table
                css={{
                  height: "auto",
                  minWidth: "100%"
                }}>

                <Table.Header>
                  <Table.Column key="name">NAME</Table.Column>
                  <Table.Column key="dob">DOB</Table.Column>
                  <Table.Column key="gender">GENDER</Table.Column>
                  <Table.Column key="tobacco">TOBACCO</Table.Column>
                  <Table.Column key="demographics">DEMOGRAPHICS</Table.Column>
                  <Table.Column key="history">VIEW ENCOUNTER(S)</Table.Column>
                  <Table.Column key="history">NEW ENCOUNTER</Table.Column>
                  <Table.Column key="changeQueue">CHANGE QUEUE</Table.Column>
                </Table.Header>

                <Table.Body>
                  {filteredRows.map((patient) => (
                    <Table.Row key={patient.id}>
                      <Table.Cell>
                        {patient.first_name} {patient.last_name}
                      </Table.Cell>
                      <Table.Cell>{formatDateString(patient.dob)}</Table.Cell>
                      <Table.Cell>{patient.gender}</Table.Cell>
                      <Table.Cell>{patient.smoker ? "yes" : "no"}</Table.Cell>
                      <Table.Cell>
                        <Button
                          bordered
                          color="primary"
                          auto
                          onClick={() => showModal(patient)}>
                            Edit
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/${patient.id}/encounters`}>
                          <Button
                            bordered
                            color="primary"
                            auto>
                            View
                            </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/${patient.id}/encounters/new`}>
                          <Button
                            bordered
                            color="primary"
                            auto>
                            + Add
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Select options={moveQueueOptions} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </React.Fragment>
          )
        })}

        {/* Modal */}
        <Modal
          activePatient={activePatient}
          visible={modalVisible}
          hideModal={hideModal}
        />
      </Container>
    );
  }
};

export default Queue;
