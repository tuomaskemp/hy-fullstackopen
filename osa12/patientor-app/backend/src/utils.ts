import { BaseEntryWithoutId, Diagnose, Discharge, Entry, EntryType, Gender, HealthCheckRating, NewEntry, NewPatient, PatientWithoutId, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseStringField = (field: unknown): string => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect or missing field: ' + field);
      }
      return field;
};

const isStringArray = (value: unknown): value is string[] => {
    return (
      Array.isArray(value) && value.every(element => typeof element === "string")
    );
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose['code']> | undefined => {
    if (!codes) {
        return undefined;
    }
    if (!isStringArray(codes)) {
        throw new Error('Incorrect diagnosis codes');
    }
    return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
    return "date" in discharge && "criteria" in discharge;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing type: ' + discharge);
    }
    return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parsehealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isRating(rating)) {
        throw new Error('Incorrect rating: ' + rating);
    }
    if (typeof rating === 'undefined' || rating === null) {
        throw new Error('missing rating: ' + rating);
    }
    return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (obj: any): SickLeave | undefined => {
    if (!obj.startDate || !obj.endDate) {
        return undefined;
    }
    const sickLeave: SickLeave = {
        startDate: parseDate(obj.startDate),
        endDate: parseDate(obj.endDate)
    };
    return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseType = (type: any): type is EntryType => {
    if(!type) {
        throw new Error("Incorrect or missing type: " + type);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(type);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Array<Entry> => {
    if (entries.length < 1 && Array.isArray(entries)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return entries;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (! entries || !(entries.every((entry: any) => parseType(entry.type)))) { // eslint-disable-line @typescript-eslint/no-unsafe-call
        throw new Error('Missing entries' + entries);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

/**
 * Parsing full entries
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatientEntry = (obj: any): PatientWithoutId => {
    const newEntry: PatientWithoutId = {
        name: parseStringField(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseStringField(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseStringField(obj.occupation),
        entries: parseEntries(obj.entries)
    };
  
    return newEntry;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (obj: any): NewPatient => {
  const newEntry: NewPatient = {
      name: parseStringField(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseStringField(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseStringField(obj.occupation)
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): NewEntry => {
    const baseEntry: BaseEntryWithoutId = {
        description: parseStringField(obj.description),
        date: parseDate(obj.date),
        specialist: parseStringField(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    };
    switch (obj.type) {
        case "Hospital":
            const newHospitalEntry: NewEntry = {
                ...baseEntry,
                type: obj.type as "Hospital",
                discharge: parseDischarge(obj.discharge),
            };
            return newHospitalEntry;

        case "OccupationalHealthcare":
            const newOccupationalHealthcareEntry: NewEntry = {
                ...baseEntry,
                type: obj.type as "OccupationalHealthcare",
                employerName: parseStringField(obj.employerName),
                sickLeave: parseSickLeave(obj.sickLeave)
            };
            return newOccupationalHealthcareEntry;

        case "HealthCheck":
            const newHealthCheckEntry: NewEntry = {
                ...baseEntry,
                type: obj.type as "HealthCheck",
                healthCheckRating: parsehealthCheckRating(obj.healthCheckRating),
            };
            return newHealthCheckEntry;
        default:
            throw new Error(
                `Unhandled discriminated union member: ${JSON.stringify(obj.type)}`
            );
    }
};
