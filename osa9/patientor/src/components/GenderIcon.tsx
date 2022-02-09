import React from "react";
import { Icon } from "semantic-ui-react";
import { Gender } from "../types";

const GenderIcon = ({ gender }: { gender: Gender }) => {
    switch (gender) {
        case "male":
            return <Icon name="man" size='big' />;
        case "female":
            return <Icon name="woman" size='big' />;
        case "other":
            return <Icon name="other gender" size='big' />;
        default:
            return null;
    }
};

export default GenderIcon;