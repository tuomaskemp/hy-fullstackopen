"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatientSsnExluded = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id, entries: [] }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatientById = (id) => {
    const patient = patients_1.default.find(patient => patient.id === id);
    if (patient) {
        return patient;
    }
    else {
        throw new Error('Cannot find patient');
    }
};
const addEntry = (entryId, entry) => {
    const patients = getPatientSsnExluded();
    const patient = patients.find(patient => patient.id === entryId);
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id }, entry);
    if (patient) {
        patient.entries.push(newEntry);
    }
    else {
        throw new Error('Cannot add entry');
    }
    return newEntry;
};
exports.default = { getPatientSsnExluded, addPatient, getPatientById, addEntry };
