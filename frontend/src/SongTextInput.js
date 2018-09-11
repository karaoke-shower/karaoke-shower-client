import React from 'react';

class SongTextInput extends React.Component {

    render = () => {
        return (
            <React.Fragment>
                
                <h4>
                    Song Text Input
                </h4>

                <textarea placeholder="Song text here"></textarea>

            </React.Fragment>
        )
    }

}

export default SongTextInput;