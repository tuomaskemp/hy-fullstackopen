import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }) => {
    const style = {
        marginTop: '20px',
        backgroundColor: 'lightgray',
        padding: '5px'
    };
    const badgeStyle = {
        padding: '10px',
        backgroundColor: 'black',
        color: 'white',
        marginLeft: '10px'
    };
    switch (part.type) {
        case "normal":
            return (
                <div style={style}>
                    <p><b>{part.name}</b></p>
                    <i>{part.description}</i>
                </div>
            );
        case "groupProject":
            return (
                <div style={style}>
                    <p><b>{part.name}</b></p>
                    project excercises {part.groupProjectCount}
                </div>
            );
        case "submission":
            return (
                <div style={style}>
                    <p><b>{part.name}</b></p>
                    <i>{part.description}</i>
                    <p>{part.exerciseSubmissionLink}</p>
                </div>
            );
        case "special":
            return (
                <div style={style}>
                    <p><b>{part.name}</b></p>
                    <i>{part.description}</i>
                    <p>required skills: 
                        {part.requirements.map(requirement => (
                            <i style={badgeStyle} key={requirement}>{requirement} </i>
                        ))}
                    </p>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;