import React from "react";
import { Card } from "semantic-ui-react";

const DetailCard = ({ header, description }: { header: string, description: string}) => {
    return (
        <>
            <Card color='yellow'>
                <Card.Content>
                <Card.Header color='yellow'>{header}</Card.Header>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    );
};

export default DetailCard;