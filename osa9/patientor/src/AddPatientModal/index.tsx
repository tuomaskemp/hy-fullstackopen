import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import { AddHealthCheckEntryForm, AddHospitalEntryForm, AddOccupationalHealthcareEntryForm, HealthCheckFormValues, HospitalFormValues, OccupationalHealthcareFormValues } from './AddEntryForm';

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

interface Props extends EntryProps {
  onSubmit: (values: PatientFormValues) => void;
}

interface HospitalEntryProps extends EntryProps {
  onSubmit: (values: HospitalFormValues) => void;
}
interface HealtCheckEntryProps extends EntryProps {
  onSubmit: (values: HealthCheckFormValues) => void;
}
interface OccupationalHealthcareEntryProps extends EntryProps {
  onSubmit: (values: OccupationalHealthcareFormValues) => void;
}

export const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: HospitalEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add New Hospital Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: HealtCheckEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add New Healthcheck Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalHealthcareEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add New Occupational Healthcare Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

