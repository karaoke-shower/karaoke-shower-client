import React from 'react';

import SongTextInput from './SongTextInput';

import SongTextDisplay from './SongTextDisplay';
import SongTextSyllableSelector from './SongTextSyllableSelector';

import SyllableTimeDialog from './SyllableTimeDialog';

import SyllableButton from './SyllableButton';


const syllableSeparationCharacter = "·";


const sampleLyrics = `Vie·nes ca·mi·nan·do
y no sa·bes tu des·ti·no
con·quis·tan·do sue·ños
sue·ñas lle·gar a ser dei·dad

Si·gues ca·mi·nan·do
so·bre vie·jos te·rri·to·rios
in·vo·can·do fuer·zas
que ja·más en·ten·de·rás`;


class SongCapture extends React.Component {
    
    state = {
        inputString: '',
        capturingTime: false,
        songTextArray: [],
        currentSyllable: {},
        currentTime: 0
    }

    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
        this.copyButton = React.createRef();
        this.sampleText = React.createRef();
    }
    
    render = () => {
        return (
            <React.Fragment>
                <h1>
                    Song Capture
                </h1>

                { this.state.currentTime}

                {
                    ! this.state.capturingTime &&
                    <React.Fragment>
                        <SongTextInput
                        value={this.state.inputString}
                        placeholder={sampleLyrics}
                        onChange={ (e) => this.handleSongInputChange(e) }
                        />
                        <button ref={this.copyButton} onClick={()=>this.copySampleLyrics()}>
                            Copiar letra de prueba
                        </button>


                        <button onClick={ () => this.prepareTimeCapture() }>
                            Capturar Tiempos
                        </button>
                        
                        <textarea
                        ref={this.sampleText}
                        style={{opacity:0, pointerEvents:'none'}}
                        >
                            {sampleLyrics}
                        </textarea>
                        
                        <SongTextDisplay text={ this.createSyllableButtons( this.state.songTextArray ) }/>

                    </React.Fragment>
                }

                {
                    this.state.capturingTime &&
                    <React.Fragment>
                        <h2>Capturar Tiempo</h2>
                        <button onClick={()=>this.captureTime()}>Capturar</button>
                        <button onClick={()=>this.selectNext()}>Sig.</button>
                        <button onClick={()=>this.selectPrevious()}>Ant.</button>
                        <SyllableTimeDialog
                        {...this.state.currentSyllable}
                        currentSyllable={this.state.currentSyllable}
                        onMinuteChange={ (e) => this.handleMinuteChange(e) }
                        onSecondChange={ (e) => this.handleSecondChange(e) }
                        />
                        <SongTextSyllableSelector text={ this.createSyllableButtons( this.state.songTextArray ) }/>

                    </React.Fragment>
                }



                <footer className="capture_player">

                    <button onClick={()=>this.handlePlay()}>Play</button>
                    <audio ref={this.audioRef} controls src="http://www.cri-cri.net/mp3/ca038.mp3">
                        Your browser does not support the <code>audio</code> element.
                    </audio>

                </footer>
                
            </React.Fragment>
        )
    }




  handlePlay = () => {


    this.audioRef.current.play()

    this.playbackTimer = setInterval(
      this.handleTick,
      100
    );

  }



  handleTick = () => {

    if( !! this.audioRef.current ) {

        let currentTime = this.audioRef.current.currentTime;
      
        this.setState({ currentTime });

    }
  }



    handleSongInputChange = ( event ) => {
        
        if( ! this.state.capturingTime ) {
            
            this.setState({
                inputString: event.target.value,
                songTextArray: this.parseSongText( event.target.value )
            });

        }
        
    }

    prepareTimeCapture = () => {
        this.setState({
            capturingTime: true
        });
    }


    handleSyllableClick = ( e ) => {
        
        let stanza      = e.target.attributes.stanza.value;
        let verse       = e.target.attributes.verse.value;
        let word        = e.target.attributes.word.value;
        let syllable    = e.target.attributes.syllable.value;
        let text        = e.target.innerHTML
        let time        = this.state.songTextArray[stanza][verse][word][syllable].time;


        let syllableObject = {
            stanza,
            verse,
            word,
            syllable,
            text,
            time,
        }

        this.handleCurrentSyllableSelect( syllableObject );
            

    }



    selectPrevious = () => {
        let songTextArray = this.state.songTextArray;
        let currentSyllable = this.state.currentSyllable;

        let stanzaIndex = currentSyllable.stanza;
        let verseIndex = currentSyllable.verse;
        let wordIndex = currentSyllable.word;
        let syllableIndex = currentSyllable.syllable;

        if( ( syllableIndex- 1) < 0 ) {

            if( ( wordIndex- 1) < 0 ) {
                
                if( ( verseIndex- 1) < 0 ) {
                    if( ( stanzaIndex- 1) < 0 ) {
                        stanzaIndex=songTextArray.length-1;
                    } else {
                        stanzaIndex--;
                    }
                    verseIndex=songTextArray[stanzaIndex].length-1;
                } else {
                    verseIndex--;

                }

                wordIndex=songTextArray[stanzaIndex][verseIndex].length-1;
            } else {
                wordIndex--;

            }

            
            syllableIndex=songTextArray[stanzaIndex][verseIndex][wordIndex].length-1;
        } else {
            syllableIndex--;
        }

        let newCurrentSyllable = songTextArray[stanzaIndex][verseIndex][wordIndex][syllableIndex];
        let text = newCurrentSyllable.text;
        let time = newCurrentSyllable.time;
        let syllableObject = {
            stanza: stanzaIndex,
            verse: verseIndex,
            word: wordIndex,
            syllable: syllableIndex,
            text: newCurrentSyllable.text,
            time: newCurrentSyllable.time,
        };

        
        this.handleCurrentSyllableSelect( syllableObject );
        
    }

    captureTime = () => {
        
        let currentSyllable = this.state.currentSyllable;
        let songTextArray = this.state.songTextArray;

        let currentSyllableObject = 
        songTextArray
        [currentSyllable.stanza]
        [currentSyllable.verse]
        [currentSyllable.word]
        [currentSyllable.syllable];

        if( !! currentSyllableObject ) {

            currentSyllableObject.time = (this.state.currentTime)*1000;
            
        } 

        this.selectNext()

    }

    selectNext = () => {
        let songTextArray = this.state.songTextArray;
        let currentSyllable = this.state.currentSyllable;

        let stanzaIndex = currentSyllable.stanza;
        let verseIndex = currentSyllable.verse;
        let wordIndex = currentSyllable.word;
        let syllableIndex = currentSyllable.syllable;

        if( (syllableIndex + 1) >= songTextArray[stanzaIndex][verseIndex][wordIndex].length ) {
            
            syllableIndex=0;
            
            if( (wordIndex + 1) >= songTextArray[stanzaIndex][verseIndex].length ) {

                wordIndex=0;

                if( (verseIndex + 1) >= songTextArray[stanzaIndex].length ) {
                    
                    verseIndex=0;

                    if( (stanzaIndex + 1) >= songTextArray.length ) {
                        verseIndex=0;
                    } else {
                        stanzaIndex++
                    }

                } else {
                    verseIndex++
                }

            } else {
                wordIndex++
            }

        } else {
            syllableIndex++
        }

        let newCurrentSyllable = songTextArray[stanzaIndex][verseIndex][wordIndex][syllableIndex];
        let text = newCurrentSyllable.text;
        let time = newCurrentSyllable.time;
        let syllableObject = {
            stanza: stanzaIndex,
            verse: verseIndex,
            word: wordIndex,
            syllable: syllableIndex,
            text: newCurrentSyllable.text,
            time: newCurrentSyllable.time,
        };

        
        this.handleCurrentSyllableSelect( syllableObject );
        
    }


    handleCurrentSyllableSelect = ( syllableObject ) => {
        
        console.log(syllableObject);
        
        let songTextArray = this.state.songTextArray;

        // remove active from other syllables
        songTextArray.map((stanza,i)=>{
            stanza.map((verse,j)=>{
                let words = verse.map((word,k)=>{
                    let syllables = word.map((syllable,l)=>{
                        syllable.active = null;
                    })
                })
            })
        })

        let targetSyllable = songTextArray
        [syllableObject.stanza]
        [syllableObject.verse]
        [syllableObject.word]
        [syllableObject.syllable];

        targetSyllable.active = 1;
        
        this.setState({
            currentSyllable: syllableObject ,
            songTextArray: songTextArray
        })

        console.log( this.state.songTextArray[syllableObject.stanza]
            [syllableObject.verse]
            [syllableObject.word]
            [syllableObject.syllable].active);
        

    }


    handleMinuteChange = (e) => {

        let value = e.target.value

        let currentSyllable = this.state.currentSyllable;
        let time = currentSyllable.time;
        let seconds = (time / 1000) % 60;
        let minutes = value;
        let newTime = ((minutes*60)*1000)
        newTime += (seconds*1000)
        currentSyllable.time = newTime;
        let songTextArray = this.state.songTextArray;
        songTextArray[ currentSyllable.stanza ][currentSyllable.verse][currentSyllable.word][currentSyllable.syllable].time = newTime;
        
        this.setState({
            songTextArray,
            currentSyllable
        })

    }
    handleSecondChange = (e) => {
        let value = e.target.value

        let currentSyllable = this.state.currentSyllable;
        let time = currentSyllable.time;
        let seconds = value;
        let minutes = Math.floor(time / 60000);
        let newTime = ((minutes*60)*1000)
        newTime += (seconds*1000)
        
        newTime = Math.round(newTime * 100);
        newTime = newTime / 100;

        currentSyllable.time = newTime;
        let songTextArray = this.state.songTextArray;
        songTextArray[ currentSyllable.stanza ][currentSyllable.verse][currentSyllable.word][currentSyllable.syllable].time = newTime;
        this.setState({
            songTextArray,
            currentSyllable        
        })

    }




    drawSongText = ( songTextArray ) => {
        
        let html = songTextArray.map((stanza,i)=>{
            
            let verses = stanza.map((verse,j)=>{
                let words = verse.map((word,k)=>{
                    let syllables = word.map((syllable,l)=>{

                        return (
                            <div
                            key={ `${i}-${j}-${k}-${l}` }
                            >
                            {syllable.text}
                            </div>
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



    createSyllableButtons = ( songTextArray ) => {
        
        let html = songTextArray.map((stanza,i)=>{
            
            let verses = stanza.map((verse,j)=>{
                let words = verse.map((word,k)=>{
                    let syllables = word.map((syllable,l)=>{

                        return (
                            <SyllableButton
                            key={ `${i}-${j}-${k}-${l}` }
                            text={syllable.text}
                            stanza={i}
                            verse={j}
                            word={k}
                            syllable={l}
                            isActive={syllable.active}
                            isAlreadySet={syllable.alreadySet}
                            isError={syllable.error}
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

        while( cleanString.includes("\n\n\n") ) {
            cleanString = cleanString.replace("\n\n\n","\n\n")
        }

        
        // 2. limpiar el string de secuencias
        // con dos o más espacios
        // convertirlas en solo uno
        
        while( cleanString.includes("  ") ) {
            cleanString = cleanString.replace("  "," ")
        }
        
        
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
                        
                        wordArray.push({
                            text: syllable
                            , time: 0
                        });

                    });

                    verseArray.push( wordArray );
        
                });

                stanzaArray.push( verseArray );
            });

            result.push( stanzaArray );
    
        });
        
        
        return result

    }


    copySampleLyrics = () => {

        
        let copyText = this.sampleText.current;        
        
        copyText.select();
      
        document.execCommand("copy");

        this.copyButton.current.innerHTML="Letra copiada. Pegar arriba"

    }


}

export default SongCapture;