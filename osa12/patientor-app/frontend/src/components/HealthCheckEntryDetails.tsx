import React from "react";
import { Card, Header, Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import EntryDetailsBase from "./EntryDetailsBase";
import HealthRatingBar from "./HealthRatingBar";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
    const { healthCheckRating, ...baseEntry } = entry;

    return (
        <div>
            <Card raised fluid>
                <EntryDetailsBase entry={baseEntry} />
                <Card.Content>
                    <Card.Description>
                    <Header as='h4'>Rating</Header>
                    <HealthRatingBar rating={healthCheckRating} showText={true} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='heart' />Health Check
                </Card.Content>
            </Card>
        </div>
    );
};

export default HealthCheckEntryDetails;