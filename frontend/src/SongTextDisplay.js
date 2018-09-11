import React from 'react';


const SongTextDisplay = (props) => {

    return (
        <React.Fragment>
            
            <h4>
                Preview
            </h4>

            <section className="text_result">
                {props.text}
            </section>
        </React.Fragment>
    )

}

export default SongTextDisplay;