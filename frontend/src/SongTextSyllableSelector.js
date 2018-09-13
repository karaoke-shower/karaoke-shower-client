import React from 'react';


const SongTextSyllableSelector = (props) => {

    return (
        <div className="SongTextSyllableSelector">
            <section className="text_result">
                {props.text}
            </section>
        </div>
    )

}

export default SongTextSyllableSelector;