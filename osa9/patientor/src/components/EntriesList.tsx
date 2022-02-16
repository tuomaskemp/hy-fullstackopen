import React from "react";
import { Entry } from "../types";
import EntryDetails from "./EntryDetails";

const EntriesList = ({ entries }: {entries: Entry[]}) => {
    const style = {
        marginBottom: '20px',
    };
    return (
        <div>
            {entries?.length > 0 ? entries.map(entry => (
                <div key={entry.id} style={style}>
                    <EntryDetails entry={entry} />
                </div>
                )) : <p>No entries.</p>}
        </div>
    );
};

export default EntriesList;