import React from 'react';
import SongTextInput from './SongTextInput';
import SongTextDisplay from './SongTextDisplay';

class SongCapture extends React.Component {

    render = () => {
        return (
            <React.Fragment>
                <h1>
                    Song Capture
                </h1>

                <SongTextInput/>
                <SongTextDisplay/>

                
            </React.Fragment>
        )
    }

}

export default SongCapture;