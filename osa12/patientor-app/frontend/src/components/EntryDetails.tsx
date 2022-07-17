import React from "react";
import { Entry } from "../types";
import { assertNever } from "../utils";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDetails = ({ entry }: { entry: Entry}) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;