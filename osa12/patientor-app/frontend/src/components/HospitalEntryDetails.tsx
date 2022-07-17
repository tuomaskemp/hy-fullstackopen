import React from "react";
import { Card, Feed, Header, Icon } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import EntryDetailsBase from "./EntryDetailsBase";


const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
    const { discharge, ...baseEntry } = entry;
    
    return (
        <div>
            <Card raised fluid>
                <EntryDetailsBase entry={baseEntry} />
                <Card.Content>
                    <Card.Description>
                    <Header as='h4'>Discharge</Header>
                    <Feed>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                <Feed.User>{discharge.criteria}</Feed.User>
                                <Feed.Date>{discharge.date}</Feed.Date>
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='hospital' />Hospital
                </Card.Content>
            </Card>
        </div>
    );
};

export default HospitalEntryDetails;