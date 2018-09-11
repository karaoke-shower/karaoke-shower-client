import React from 'react';
import SongTextInput from './SongTextInput';
import SongTextDisplay from './SongTextDisplay';

const syllableSeparationCharacter = "·";

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

                { this.drawSongText( this.parseSongText( this.state.inputString ) ) }

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


    parseSongText( inputString ) {

        let stanzas = this.parseStanzas ( inputString );
        
        stanzas.forEach( stanza => {
            let verses = this.parseVerses( stanza )
            verses.forEach( verse => {
                let words = this.parseWords( verse )

                words.forEach( word => {
                    let syllables = this.parseSyllables( word )
                    
                    syllables.forEach( syllable => {
                        console.log( syllable )
                    });
        
                });

                
            });
    
        });

        
        let result = [];

        return result

    }

    parseStanzas( inputString ) {
        let result = [];

        let newString = inputString;
        
        // 1. limpiar el string de secuencias
        // con tres o más newLines \n
        // convertirlas en \n\n, en caso de existir


        // 2. separar string usando \n\n
        
        result = newString.split("\n\n");

        return result;

    } 

    parseVerses( inputString ) {
        let result = inputString.split("\n");
        return result;
    } 

    parseWords( inputString ) {
        let result = inputString.split(" ");
        return result;
    } 

    parseSyllables( inputString ) {
        let result = inputString.split( syllableSeparationCharacter );
        return result;
    }

    drawSongText( songTextArray ) {

        return <h1>{songTextArray}</h1>

    }


}

export default SongCapture;