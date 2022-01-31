import React from "react";
import { CoursePart } from "../types";

const Total = ({ courseParts }: {courseParts: Array<CoursePart>}) => (
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
);

export default Total;