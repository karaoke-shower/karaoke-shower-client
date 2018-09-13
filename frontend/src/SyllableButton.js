import React from 'react';

const SyllableButton = (props) => {
    
    return (
        <span
        stanza={props.stanza}
        verse={props.verse}
        word={props.word}
        syllable={props.syllable}
        className="syllable"
        is-active={props.isActive}
        is-already-set={props.isAlreadySet}
        is-error={props.isError}
        onClick={props.onClick}>
            {props.text}
        </span>
    )

}

export default SyllableButton;