import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Divider, Grid, Header } from "semantic-ui-react";
import { AddHealthCheckEntryModal, AddHospitalEntryModal, AddOccupationalHealthcareEntryModal } from "../AddPatientModal";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import DetailCard from "../components/DetailCard";
import EntriesList from "../components/EntriesList";
import GenderIcon from "../components/GenderIcon";
import { apiBaseUrl } from "../constants";
import { setDiagnosis, updatePatient, useStateValue } from "../state";
import { Diagnosis, Entry, Patient } from "../types";

const SinglePatientPage = () => {
    const [{ diagnosis, patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient>();
    const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
    const [healtcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false);
    const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    
    const openModal = (modal: string): void => {
        if (modal === "Hospital") {
            setHospitalModalOpen(true);
        }
        if (modal === "HealthCheck") {
            setHealthcheckModalOpen(true);
        }
        if (modal === "OccupationalHealthCheck") {
            setOccupationalModalOpen(true);
        }
    };
    
    const closeModal = (): void => {
        setHospitalModalOpen(false);
        setHealthcheckModalOpen(false);
        setOccupationalModalOpen(false);
        setError(undefined);
    };
    
    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
                );
            if (patient) {
                const updatedPatient = {
                    ...patient,
                    entries: patient.entries.concat(newEntry)
                };
                dispatch(updatePatient(updatedPatient));
                setPatient(updatedPatient);
            }
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };
        
    
    React.useEffect(() => {
        const fetchSinglePatient = async (id: string) => {
            if (!patients[id]?.patientPageViewed) {
                try {
                    const { data: patientFromApi } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                        );
                        const patientPageViewed = {
                            ...patientFromApi,
                            patientPageViewed: true
                        };
                        setPatient(patientPageViewed);
                        dispatch(updatePatient(patientPageViewed));
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    setPatient(patients[id]);
                }
            };
            const fetchDiagnosis = async () => {
                if (!diagnosis || diagnosis.length < 1) {
                    try {
                        const { data: diagnosis } = await axios.get<Diagnosis[]>(
                            `${apiBaseUrl}/diagnosis`
                            );
                            dispatch(setDiagnosis(diagnosis));
                        } catch (e) {
                            console.log(e);
                        }
                    }
                };
                void fetchSinglePatient(id);
                void fetchDiagnosis();
            }, [dispatch]);
            
            const style = {
                marginBottom: '20px',
            };

            if (patient) {
                return (
                    <div>
                <Header as='h2'>{patient.name}
                <GenderIcon gender={patient.gender} />
                </Header>
                <Card.Group style={style}>
                    <DetailCard header="SSN" description={patient.ssn || 'Cannot load ssn.'} />
                    <DetailCard header="Date of Birth" description={patient.dateOfBirth || 'Cannot load birthday.'} />
                    <DetailCard header="Occupation" description={patient.occupation || 'Cannot load occupation.'} />
                </Card.Group>

                <AddHospitalEntryModal
                    modalOpen={hospitalModalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <AddHealthCheckEntryModal
                    modalOpen={healtcheckModalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <AddOccupationalHealthcareEntryModal
                    modalOpen={occupationalModalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Grid>
              <Grid.Column floated="left" width={2}>
                <Header as='h3'>Entries</Header>
                
              </Grid.Column>
              <Grid.Column floated="right" width={14}>
                <Button style={style} onClick={() => openModal("Hospital")}>Add New Hospital Entry</Button>
                <Button style={style} onClick={() => openModal("HealthCheck")}>Add New Healthcheck Entry</Button>
                <Button style={style} onClick={() => openModal("OccupationalHealthCheck")}>Add New Occupational Healthcheck Entry</Button>
                
              </Grid.Column>
            </Grid>

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