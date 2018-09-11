import React from 'react';
import SongTextInput from './SongTextInput';
import SongTextDisplay from './SongTextDisplay';

import SyllableCapture from './SyllableCapture';


const syllableSeparationCharacter = "·";

class SongCapture extends React.Component {
    
    state = {
        inputString:
`Vie·nes ca·mi·nan·do
y no sa·bes tu des·ti·no
con·quis·tan·do sue·ños
sue·ñas lle·gar a ser dei·dad

Si·gues ca·mi·nan·do
so·bre vie·jos te·rri·to·rios
in·vo·can·do fuer·zas
que ja·más en·ten·de·rás`
    ,
    capturingTime: false
    }

    
    render = () => {
        return (
            <React.Fragment>
                <h1>
                    Song Capture
                </h1>

                {
                    ! this.state.capturingTime &&
                    <SongTextInput
                    value={this.state.inputString}
                    onChange={ (e) => this.handleChange(e) }
                    />
                }

                {
                    this.state.capturingTime &&
                    <h2>Capturar Tiempo</h2>
                }

                <button onClick={ () => this.prepareTimeCapture() }>
                    Capturar Tiempos
                </button>

                <SongTextDisplay text={ this.drawSongText( this.parseSongText( this.state.inputString ) ) }/>

                <footer className="capture_player">
                    <audio src="test.mp3" controls></audio>
                </footer>
                
            </React.Fragment>
        )
    }


    handleChange = ( event ) => {
        
        if( ! this.state.capturingTime ) {
            
            this.setState({
                inputString: event.target.value
            });

        }
        
    }

    prepareTimeCapture = () => {
        this.setState({
            capturingTime: true
        });
    }


    handleSyllableClick = ( e ) => {
        
        console.log(e.target.innerHTML)
        
    }



    drawSongText = ( songTextArray ) => {
        
        let html = songTextArray.map((stanza,i)=>{
            
            let verses = stanza.map((verse,j)=>{
                let words = verse.map((word,k)=>{
                    let syllables = word.map((syllable,l)=>{

                        return (
                            <SyllableCapture
                            key={ `${i}-${j}-${k}-${l}` }
                            text={syllable}
                            onClick={(e)=>this.handleSyllableClick(e)}
                            />
                        )
                    })
                    
                    return (
                        <span
                        key={ `${i}-${j}-${k}` }
                        className="word"
                        >
                            {syllables}
                        </span>
                    )
                })
                
                return (
                    <div
                    key={ `${i}-${j}` }
                    className="verse">
                        {words}
                    </div>
                )
            })
            return (
                <div
                key={ `${i}` }
                className="stanza">
                    {verses}
                </div>
            )
        });

        return (
            <React.Fragment>
                {html}
            </React.Fragment>
        )


    }

    cleanString = ( inputString ) => {

        let cleanString = inputString;

        // 1. limpiar el string de secuencias
        // con tres o más newLines \n
        // convertirlas en \n\n, en caso de existir


        // 2. limpiar el string de secuencias
        // con dos o más espacios
        // convertirlas en solo uno

        return cleanString;

    }

    parseStanzas = ( inputString ) => {
        let result = inputString.split("\n\n");
        return result;
    } 

    parseVerses = ( inputString ) => {
        let result = inputString.split("\n");
        return result;
    } 

    parseWords = ( inputString ) => {
        let result = inputString.split(" ");
        return result;
    } 

    parseSyllables = ( inputString ) => {
        let result = inputString.split( syllableSeparationCharacter );
        return result;
    }



    parseSongText = ( inputString ) => {

        let result = [];

        let stanzas = this.parseStanzas ( this.cleanString( inputString ) );
        
        stanzas.forEach( stanza => {

            let stanzaArray = [];

            let verses = this.parseVerses( stanza )
            
            verses.forEach( verse => {

                let verseArray = [];

                let words = this.parseWords( verse )

                words.forEach( word => {
                    
                    let wordArray = [];

                    let syllables = this.parseSyllables( word )
                    
                    syllables.forEach( syllable => {
                        
                        wordArray.push( syllable );

                    });

                    verseArray.push( wordArray );
        
                });

                stanzaArray.push( verseArray );
            });

            result.push( stanzaArray );
    
        });
        
        
        return result

    }



}

export default SongCapture;