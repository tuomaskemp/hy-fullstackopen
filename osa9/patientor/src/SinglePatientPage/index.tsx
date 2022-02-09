import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, Divider, Header } from "semantic-ui-react";
import DetailCard from "../components/DetailCard";
import EntriesList from "../components/EntriesList";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { setDiagnosis, setPatientPageViewed, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";

const SinglePatientPage = () => {
    const [{ viewedPatients, diagnosis }, dispatch] = useStateValue();
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
        const fetchDiagnosis = async () => {
            try {
                const { data: diagnosis } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnosis`
                );
                dispatch(setDiagnosis(diagnosis));
            } catch (e) {
                console.log(e);
            }
        };
        if (!patient) {
            void fetchSinglePatient(id);
        }
        if (!diagnosis || diagnosis.length < 1) {
            void fetchDiagnosis();
        }
    }, [dispatch]);

    if (patient) {
        return (
            <div>
                <Header as='h2'>{patient.name}
                <GenderIcon gender={patient.gender} />
                </Header>
                <Card.Group>
                    <DetailCard header="SSN" description={patient.ssn || 'Cannot load ssn.'} />
                    <DetailCard header="Date of Birth" description={patient.dateOfBirth || 'Cannot load birthday.'} />
                    <DetailCard header="Occupation" description={patient.occupation || 'Cannot load occupation.'} />
                </Card.Group>

                <Header as='h3'>Entries</Header>
                <EntriesList entries={patient.entries} />
                <Divider />
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