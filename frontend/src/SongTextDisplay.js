import React from 'react';


const SongTextDisplay = (props) => {

    return (
        <React.Fragment>
            
            <h2>
                Vista previa
            </h2>

            <section className="text_result">
                {props.text}
            </section>
        </React.Fragment>
    )

}

export default SongTextDisplay;