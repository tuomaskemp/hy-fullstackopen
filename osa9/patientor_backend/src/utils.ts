import { Entry, Gender, NewPatient } from "./types";

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

const parseType = (type: unknown): string => {
    if(!type || type !== ("Hospital" || "OccupationalHealthcare" || "HealthCheck")) {
        throw new Error("Incorrect or missing type: " + type);
    }
    return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Array<Entry> => {
    if (entries.type) {
        parseType(entries.type);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (obj: any): NewPatient => {
  const newEntry: NewPatient = {
      name: parseStringField(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseStringField(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseStringField(obj.occupation),
      entries: parseEntries(obj.entries),
  };

  return newEntry;
};

export default toNewPatientEntry;
