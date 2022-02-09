import React from "react";
import { Card, Grid, Header, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { BaseEntry } from "../types";

const EntryDetailsBase = ({ entry }: { entry: BaseEntry}) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <>
            <Card.Content>
                <Card.Header>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Icon name="calendar alternate outline" />
                            {entry.date}
                        </Grid.Column>
                        <Grid.Column>{entry.specialist}</Grid.Column>
                    </Grid>
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <Header as='h4'>Description</Header>
                    {entry.description}
                    
                    {entry.diagnosisCodes?.map(code => (
                        <li key={code}>{code} {diagnosis.find(diagnose => diagnose.code === code)?.name}</li>
                    ))}
                </Card.Description>
            </Card.Content>
        </>
    );
};

export default EntryDetailsBase;