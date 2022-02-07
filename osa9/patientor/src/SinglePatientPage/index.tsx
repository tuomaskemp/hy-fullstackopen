import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatientPageViewed, useStateValue } from "../state";
import { Patient } from "../types";

const SinglePatientPage = () => {
    const [{ viewedPatients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const patient = viewedPatients.find(patient => patient.id !== id ? null : patient);

    React.useEffect(() => {
        const fetchSinglePatient = async (id: string) => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch(setPatientPageViewed(patientFromApi));
                } catch (e) {
                    console.error(e);
                }
            };
        if(!patient) {
            void fetchSinglePatient(id);
        }
    }, [dispatch]);

    if (patient) {
        return (
            <div>
                <Header as='h2'>{patient.name}
                {patient.gender === "male" ? <Icon name="man" size='big' /> : null}
                {patient.gender === "female" ? <Icon name="woman" size='big' /> : null}
                {patient.gender === "other" ? <Icon name="other gender" size='big' /> : null}
                </Header>
                <Card.Group>
                    <Card color='yellow'>
                        <Card.Content>
                        <Card.Header color='yellow'>SSN</Card.Header>
                            <Card.Description>
                                {patient.ssn}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card color='yellow'>
                        <Card.Content>
                        <Card.Header color='yellow'>Date of Birth</Card.Header>
                            <Card.Description>
                                {patient.dateOfBirth}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card color='yellow'>
                        <Card.Content>
                        <Card.Header color='yellow'>Occupation</Card.Header>
                            <Card.Description>
                                {patient.occupation}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        );
    }
    return (
        <div>
            Patient not found.
        </div>
    );
};

export default SinglePatientPage;