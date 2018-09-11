import React from 'react';
import SongTextInput from './SongTextInput';
import SongTextDisplay from './SongTextDisplay';

class SongCapture extends React.Component {
    
    state = {
        inputString: ''
    }

    render = () => {
        return (
            <React.Fragment>
                <h1>
                    Song Capture
                </h1>

                <SongTextInput
                value={this.state.inputString}
                onChange={ (e) => this.handleChange(e) }
                />
                <SongTextDisplay/>

                <footer className="capture_player">
                    <audio src="test.mp3" controls></audio>
                </footer>
                
            </React.Fragment>
        )
    }


    handleChange( event ) {

        this.setState({
            inputString: event.target.value
        });

    }

}

export default SongCapture;