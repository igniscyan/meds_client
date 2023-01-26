import React, { useState } from "react";
import {
  Grid,
  Text,
  Input,
  Button,
  Checkbox,
  Card,
  Textarea,
  Row,
  Table,
  Container
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import { useGetEncounters as getEncounters } from "../../Queries/useGetPatientEncounters";
import {formatDateString} from "../../utils/stringUtils";
import {complaintsObj} from "../utils";
import { useGetPatientName  as getPatientName } from "../../Queries/useGetPatientName";
const EncounterViewer = (props) => {
  const {patientId} = useParams();
  const encounters = getEncounters(patientId);
  const patientName = getPatientName(patientId);
  

  if (encounters.isLoading) return <div>Loading encounters...</div>;

  if (encounters.isError) return <div>Error loading </div>;

  if (patientName.isLoading) return <div>Loading patient name...</div>;
  if (patientName.isError) return <div>Error loading patient name</div>;


  console.log(patientName);

  // if (encounters?.data.length > 0) {
  //   return (
  //     <Grid.Container gap={1}>
  //       {encounters.data.map((encounter) => {
  //         console.log(encounter);
  //         return (
  //           <Grid sm={12} md={4} key={encounter.id}>
  //             <Card isHoverable variant="bordered" css={{ mw: "330px" }}>
  //               <Card.Header>
  //                 <Text b>{formatDateString(encounter.created_at)}</Text>
  //               </Card.Header>
  //               <Card.Divider />
  //               <Card.Body css={{ py: "$10" }}>
  //                 <Text h1>Chief Complaints</Text>
  //                 <Text> {complaintsObj[encounter.chief_complaint-1].label}</Text>
  //               </Card.Body>
  //               <Card.Divider />
  //               <Card.Footer>
  //                 <Row justify="flex-end">
  //                   <Link to={`${encounter.id}`}>
  //                     <Button size="sm">View Encounter</Button>
  //                   </Link>
  //                 </Row>
  //               </Card.Footer>
  //             </Card>
  //           </Grid>
  //         );
  //       })}
  //     </Grid.Container>
  //   );
  // }
      if (encounters?.data.length > 0) {
        return (
          <Container fluid>
            <Text h1>Encounter View: {patientName.data[0].first_name}  {patientName.data[0].last_name} </Text>
            <Table>
              <Table.Header>
                <Table.Column key="date" alignContent="center">DATE</Table.Column>
                <Table.Column key="chief_complaint" alignContent="center">CHIEF COMPLAINT</Table.Column>
                <Table.Column key="Edit" alignContent="center">EDIT</Table.Column>
              </Table.Header>

              <Table.Body>
                {encounters.data.map((encounter) => {
                  return (
                    <Table.Row key={encounter.id}>
                      <Table.Cell>{formatDateString(encounter.created_at)}</Table.Cell>
                      <Table.Cell>{complaintsObj[encounter.chief_complaint-1].label}</Table.Cell>
                      <Table.Cell>
                        <Link to={`${encounter.id}`}>
                          <Button size="sm">View Encounter</Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>

            </Table>
          </Container>
        )
      }

};

export default EncounterViewer;