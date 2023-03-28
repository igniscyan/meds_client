import React, { useState } from "react";
import { useGet as GetPatients } from "../../Queries/useGet";
import useMoveQueueOptions from "../../utils/useMoveQueueOptions";
import useUpdatePatientQueue from "../../Queries/useUpdatePatientQueue";
import {
  Container,
  Button,
  Table,
  Spacer,
  Input,
  Dropdown,
} from "@nextui-org/react";
import DemographicsCard from "../DemographicsCard";
import Select from "react-select";
import Modal from "../PatientView/Modal";
import { Link } from "react-router-dom";
import { formatDateString } from "../../utils/stringUtils";

const Queue = () => {
  const patients = GetPatients();
  const updatePatientQueueMutation = useUpdatePatientQueue();

  const { moveQueueOptions, loading } = useMoveQueueOptions();

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

  const queueToString = (queue) => {
    switch (queue) {
      case 1:
        return "Not in Queue";
      case 2:
        return "CHECK-IN";
      case 3:
        return "MED TEAM";
      case 4:
        return "PHARMACY";
      case 5:
        return "GOODIES";
    }
  };

  function filterRows(rows, queue) {
    //Filter rows by queue, then search by name
    const filteredRows = rows.filter((row) => {
      if (row.queue === queue) return row;
    });
    console.log("filteredRows", filteredRows);

    if (searchTerm) {
      return filteredRows.filter((row) => {
        return (
          row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    } else {
      return filteredRows;
    }
  }

  // Get all queues which currently have a patient in them
  // Currently this pulls data from patients, but we ideally want to filter allQueues
  function getUniqueActiveQueues(data) {
    const queues = data.map((patient) => patient.queue);
    return [...new Set(queues)];
  }

  if (patients.isLoading) return <div>Loading patients...</div>;

  if (patients.isError)
    return <div>Error loading patients: {patients.error.message}</div>;

  if (patients.data) {
    const rows = patients.data.map((patient) => ({
      id: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      age: patient.age,
      dob: patient.dob,
      gender: patient.gender,
      smoker: patient.smoker,
      queue: patient.queue,
    }));

    const uniqueActiveQueues = getUniqueActiveQueues(patients.data);

    function handleQueueChange(patientId, newQueueId) {
      updatePatientQueueMutation.mutate([patientId, newQueueId]);
    }

    function handleClick(patientId, value) {
      handleQueueChange(patientId, value)
    }

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
              <Spacer y={2} />
              <h2>{queueToString(queue)}</h2>

              <Table
                css={{
                  overflow: "visible",
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column key="name">NAME</Table.Column>
                  <Table.Column key="dob">DOB</Table.Column>
                  <Table.Column key="gender">GENDER</Table.Column>
                  <Table.Column key="tobacco">TOBACCO</Table.Column>
                  <Table.Column key="demographics">DEMOGRAPHICS</Table.Column>
                  <Table.Column key="history">VIEW ENCOUNTER(S)</Table.Column>
                  <Table.Column key="addEncounter">NEW ENCOUNTER</Table.Column>
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
                          onClick={() => showModal(patient)}
                        >
                          Edit
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/${patient.id}/encounters`}>
                          <Button bordered color="primary" auto>
                            View
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/${patient.id}/encounters/new`}>
                          <Button bordered color="primary" auto>
                            + Add
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown>
                          <Dropdown.Button flat>
                            {queueToString(patient.queue)}
                          </Dropdown.Button>
                          <Dropdown.Menu
                            selectionMode="single"
                            aria-label="Dynamic Actions"
                            items={moveQueueOptions}
                            onSelectionChange={(value) => {
                              handleClick(patient.id,value.currentKey);
                            }}
                          >
                            {(item) => (
                              <Dropdown.Item key={item.key}>
                                {item.name}
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </React.Fragment>
          );
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
