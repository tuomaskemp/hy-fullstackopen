import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStateValue } from "../state";
import { DiagnosisSelection, NumberField, TextField } from "./FormField";
import { Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, UnionOmit } from "../types";

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;
export type HospitalFormValues = Omit<HospitalEntry, 'id'>;
export type OccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, 'id'>;
type FormValues = HealthCheckFormValues | HospitalFormValues | OccupationalHealthcareFormValues;
export type EntryFormValues = UnionOmit<FormValues, 'id'>;

interface HealthCheckFormProps {
    onSubmit: (values: HealthCheckFormValues) => void;
    onCancel: () => void;
}
interface HospitalFormProps {
    onSubmit: (values: HospitalFormValues) => void;
    onCancel: () => void;
}
interface OccupationalHealthcareFormProps {
    onSubmit: (values: OccupationalHealthcareFormValues) => void;
    onCancel: () => void;
}

interface BaseEntryProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
    diagnosis: Diagnosis[];
}

const baseEntryValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: []
};

const BaseEntryFields = ({setFieldValue, setFieldTouched, diagnosis}: BaseEntryProps) => {
    return (
        <>
            <Field
                label="Description"
                name="description"
                placeholder="Description"
                component={TextField}
            />

            <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
            />

            <Field
                label="Specialist"
                name="specialist"
                placeholder="John Doe"
                component={TextField}
            />
            
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
            />
        </>
    );
};

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: HealthCheckFormProps) => {
    const [{ diagnosis }] = useStateValue();
    
    return (
        <Formik
        initialValues={{
            ...baseEntryValues,
            healthCheckRating: 0,
            type: "HealthCheck",
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
            errors.description = requiredError;
            }
            if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
            }
            if (!values.date) {
            errors.date = requiredError;
            }
            if (!values.specialist) {
            errors.specialist = requiredError;
            }
            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
    
            return (
            <Form className="form ui">
                <BaseEntryFields
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnosis={diagnosis}
                />
    
                <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
                />
    
                <Grid>
                <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                    Cancel
                    </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                    <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid.Column>
                </Grid>
            </Form>
            );
        }}
    </Formik>
    );
};


export const AddHospitalEntryForm = ({ onSubmit, onCancel }: HospitalFormProps) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
          initialValues={{
            ...baseEntryValues,
            type: "Hospital",
            discharge: {
                date: "",
                criteria: ""
            },
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.discharge.date) {
              errors.discharge = requiredError;
            }
            if (!values.discharge.criteria) {
              errors.discharge = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      
            return (
              <Form className="form ui">
                  <BaseEntryFields
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnosis={diagnosis}
                  />

              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
    
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
        }}
      </Formik>
      );
};

export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: OccupationalHealthcareFormProps) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
          initialValues={{
            ...baseEntryValues,
            type: "OccupationalHealthcare",
            sickLeave: {
                startDate: "",
                endDate: ""
            },
            employerName: "",
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      
            return (
              <Form className="form ui">
                <BaseEntryFields
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnosis={diagnosis}
                />
                <Field
                    label="Employer Name"
                    placeholder="Name"
                    name="employerName"
                    component={TextField}
                />
                <Field
                    label="Sickleave Start Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                />
                <Field
                    label="Sickleave End Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                />
    
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
        }}
      </Formik>
      );
};
