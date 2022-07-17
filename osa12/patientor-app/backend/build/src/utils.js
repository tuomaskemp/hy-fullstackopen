"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatientEntry = exports.toPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseStringField = (field) => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect or missing field: ' + field);
    }
    return field;
};
const isStringArray = (value) => {
    return (Array.isArray(value) && value.every(element => typeof element === "string"));
};
const parseDiagnosisCodes = (codes) => {
    if (!codes) {
        return undefined;
    }
    if (!isStringArray(codes)) {
        throw new Error('Incorrect diagnosis codes');
    }
    return codes;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge) => {
    return "date" in discharge && "criteria" in discharge;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing type: ' + discharge);
    }
    return discharge;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parsehealthCheckRating = (rating) => {
    if (!isRating(rating)) {
        throw new Error('Incorrect rating: ' + rating);
    }
    if (typeof rating === 'undefined' || rating === null) {
        throw new Error('missing rating: ' + rating);
    }
    return rating;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (obj) => {
    if (!obj.startDate || !obj.endDate) {
        return undefined;
    }
    const sickLeave = {
        startDate: parseDate(obj.startDate),
        endDate: parseDate(obj.endDate)
    };
    return sickLeave;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseType = (type) => {
    if (!type) {
        throw new Error("Incorrect or missing type: " + type);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.EntryType).includes(type);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries) => {
    if (entries.length < 1 && Array.isArray(entries)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return entries;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!entries || !(entries.every((entry) => parseType(entry.type)))) { // eslint-disable-line @typescript-eslint/no-unsafe-call
        throw new Error('Missing entries' + entries);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};
/**
 * Parsing full entries
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPatientEntry = (obj) => {
    const newEntry = {
        name: parseStringField(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseStringField(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseStringField(obj.occupation),
        entries: parseEntries(obj.entries)
    };
    return newEntry;
};
exports.toPatientEntry = toPatientEntry;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (obj) => {
    const newEntry = {
        name: parseStringField(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseStringField(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseStringField(obj.occupation)
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (obj) => {
    const baseEntry = {
        description: parseStringField(obj.description),
        date: parseDate(obj.date),
        specialist: parseStringField(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    };
    switch (obj.type) {
        case "Hospital":
            const newHospitalEntry = Object.assign(Object.assign({}, baseEntry), { type: obj.type, discharge: parseDischarge(obj.discharge) });
            return newHospitalEntry;
        case "OccupationalHealthcare":
            const newOccupationalHealthcareEntry = Object.assign(Object.assign({}, baseEntry), { type: obj.type, employerName: parseStringField(obj.employerName), sickLeave: parseSickLeave(obj.sickLeave) });
            return newOccupationalHealthcareEntry;
        case "HealthCheck":
            const newHealthCheckEntry = Object.assign(Object.assign({}, baseEntry), { type: obj.type, healthCheckRating: parsehealthCheckRating(obj.healthCheckRating) });
            return newHealthCheckEntry;
        default:
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify(obj.type)}`);
    }
};
exports.toNewEntry = toNewEntry;
