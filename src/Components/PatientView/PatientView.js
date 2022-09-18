import React, { useState, useEffect } from 'react';
import { useGetPatientsQuery as GetPatients } from '../../Services/api';
import { Button, Table } from '@nextui-org/react';
import DemographicsCard from '../DemographicsCard';
import Modal from './Modal';

const PatientView = () => {
  const patients = GetPatients();

  const [activePatient, setActivePatient] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = (patient = undefined) => {
    setActivePatient(patient);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
    // Using a timeout to hide the undefined UI while the moddal is closing
    // This happens because the modal closes with an animation, which takes time
    setTimeout(() => {
      setActivePatient(undefined);
    }, 100);
  };

  console.log(patients.data);

  if (patients.isLoading) return <div>Loading patients...</div>;

  if (patients.isError)
    return <div>Error loading patients: {patients.error.message}</div>;

  if (patients.data)
    return (
      <div>
        <Table
          aria-label="Patient Entry Table"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}>
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>DOB</Table.Column>
            <Table.Column>Gender</Table.Column>
            <Table.Column>Smoker?</Table.Column>
            <Table.Column>View Demographics</Table.Column>
            <Table.Column>Add Encounter</Table.Column>
          </Table.Header>

          <Table.Body>
            {patients.data.map((patient) => (
              <Table.Row key={patient.id}>
                <Table.Cell>
                  {patient.first_name} {patient.last_name}
                </Table.Cell>
                <Table.Cell>{patient.dob}</Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.smoker ? 'yes' : 'no'}</Table.Cell>
                <Table.Cell>
                  <Button
                    bordered
                    color="primary"
                    auto
                    onClick={() => showModal(patient)}>
                    view
                  </Button>
                </Table.Cell>
                <Table.Cell></Table.Cell>
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
};

export default PatientView;
