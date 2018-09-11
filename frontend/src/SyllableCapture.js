import React from 'react';

const SyllableCapture = (props) => {

    return (
        <span
        className="syllable"
        onClick={props.onClick}>
            {props.text}
        </span>
    )

}

export default SyllableCapture;