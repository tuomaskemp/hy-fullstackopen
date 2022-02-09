import React from "react";
import { Card, Divider, Header, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import EntryDetailsBase from "./EntryDetailsBase";

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    const { sickLeave, employerName, ...baseEntry } = entry;
    
    return (
        <div>
            <Card raised fluid>
                <EntryDetailsBase entry={baseEntry} />
                <Card.Content>
                    <Card.Description>
                        <Header as='h4'>Employer name</Header>
                            {employerName}
                            <Divider />
                        <Header as='h4'>Sick leave</Header>
                            {sickLeave?.startDate} - {sickLeave?.endDate}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='doctor' />Occupational Healthcare
                </Card.Content>
            </Card>
        </div>
    );
};

export default OccupationalHealthcareEntryDetails;