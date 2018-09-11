import React from 'react';

import {
    Grid
} from 'react-bootstrap';

import Navbar from './Navbar';
import VerseActive from './VerseActive';
import VerseInactive from './VerseInactive';


class SongPlayback extends React.Component {

  

  
  
  constructor(props) {
    
    super(props);
    
    this.playbackTimer = null;
    this.timeSyllables = {};
    
    this.hierarchyIndexTracker = {
      hierarchyLevel: -1,
      currentStanza: 0,
      currentWord: 0,
      currentVerse: 0,
      currentSyllable: 0
    };



    this.state = {
      audio_url: '',
  
      lyrics: [],
      playback: {
        currentTime: 0,
  
        currentSyllable: 0,
        
        currentStanzaIndex: 0,
        currentWordIndex: 0,
        currentVerseIndex: 0,
        currentSyllableIndex: 0,
  
        playing: false
      }
    }
    
    this.audioRef = React.createRef();




  }

  async componentDidMount() {
    try {
      const responseRaw = await fetch(URL);
      const {
        lyrics,
        audio_url
      } = await responseRaw.json();
      this.setState({
        lyrics,
        audio_url
      });

      this.flattenSongToArray(this.state.lyrics);

      
      
    } catch (e) {
      console.error(e);
    }
  }


  // recursive function:
  flattenSongToArray = (input) => {

    
    if (Array.isArray(input)) {
      
      this.hierarchyIndexTracker.hierarchyLevel++
      
      input.forEach(element => {
        this.flattenSongToArray(element)
      });
      
      this.hierarchyIndexTracker.hierarchyLevel--
      
      switch( this.hierarchyIndexTracker.hierarchyLevel) {
        case 0:
          this.hierarchyIndexTracker.currentStanza++ 

          this.hierarchyIndexTracker.currentVerse=0;
          this.hierarchyIndexTracker.currentWord=0;
          this.hierarchyIndexTracker.currentSyllable=0;

          break;
        case 1:
          this.hierarchyIndexTracker.currentVerse++ 

          this.hierarchyIndexTracker.currentWord=0;
          this.hierarchyIndexTracker.currentSyllable=0;

          break;        
        case 2:
          this.hierarchyIndexTracker.currentWord++ 

          this.hierarchyIndexTracker.currentSyllable=0;

          break;  
          
        default:
            null
         
      }

    } else {
      
      this.timeSyllables[input.time] = {
        text: input.text,
        stanza: this.hierarchyIndexTracker.currentStanza,
        verse: this.hierarchyIndexTracker.currentVerse,
        word: this.hierarchyIndexTracker.currentWord,
        syllableIndex: this.hierarchyIndexTracker.currentSyllable,

      };

      this.hierarchyIndexTracker.currentSyllable++ 

    }

    


  }

  


  handleTick = () => {

    if( !! this.audioRef.current ) {

      let currentTime = this.audioRef.current.currentTime;
      
      let currentSyllable = this.timeSyllables[
        this.findNearestKey( this.timeSyllables, Math.round( currentTime * 1000 ))
      ]

      
      if( !! currentSyllable ) {
        let pb = this.state.playback;
        
        pb.currentSyllable = currentSyllable;

        pb.currentStanzaIndex = currentSyllable.stanza;
        pb.currentVerseIndex = currentSyllable.verse;
        pb.currentWordIndex = currentSyllable.word;
        pb.currentSyllableIndex = currentSyllable.syllableIndex;
        
        this.setState({ playback: pb });

      }




    }
  }


  handlePlay = () => {
    let pb = this.state.playback;
    pb.playing = true;
    this.setState({
      playback: pb
    });

    this.audioRef.current.play()
    this.audioRef.current.playbackRate = 11.0;
    
    this.playbackTimer = setInterval(
      this.handleTick,
      100
    );

  }

  handleStop = () => {

    let pb = this.state.playback;
    pb.playing = false;
    this.setState({
      playback: pb
    });

    this.audioRef.current.pause()

    clearInterval( this.playbackTimer );

  }




  getCurrentSyllableText() {
    if( !! this.state.playback.currentSyllable ) {      
      return this.state.playback.currentSyllable.text
    } else {
      return null;
    }
  }


  getVerseText( verse ) {
    let text = "";

    if( Array.isArray( verse ) ) {
      verse.forEach( word => {
        if( Array.isArray( word ) ) {
          word.forEach( syllable => {
            text += syllable.text;
          });
          text += " ";          
        }
            
      })
    }

    return text;

  }

  getVerseWordsArray( verse ) {
    let words = [];
    
    if( Array.isArray( verse ) ) {
      verse.forEach( word => {
        if( Array.isArray( word ) ) {
          let syllables = [];

          word.forEach( syllable => {
            syllables.push( syllable.text );
          });
          
          words.push( syllables );
        }
            
      })
    }

    return words;

  }


  getVerse( stanza, verse ) {

    if( Array.isArray(this.state.lyrics[stanza]) ) {

      let currentStanza = this.state.lyrics[ stanza ];

      let currentVerse = currentStanza[ verse ];

      if( Array.isArray( currentVerse ) ) {
        return currentVerse
      }

    }

    return null;

  }






  render() {

    let pastVerseText;
    let currentVerseWordsArray;
    let nextVerseText;

    let currentSyllable = this.state.playback.currentSyllable;
    
    if( !! currentSyllable ) {

      let currentVerse = this.getVerse( currentSyllable.stanza, currentSyllable.verse );

      let pastVerse;
      let nextVerse;

      // get past verse
      // check if first verse of stanza
      if( currentSyllable.verse === 0 ) {
        if( currentSyllable.stanza > 0 ) {

          let lastStanza = currentSyllable.stanza - 1;
          
          if( Array.isArray( this.state.lyrics[ lastStanza ] )) {
          
            pastVerse = this.getVerse( lastStanza, this.state.lyrics[ lastStanza ].length - 1 );
          
          }
          
        }
      } else {
    
        pastVerse = this.getVerse( currentSyllable.stanza, currentSyllable.verse - 1 );
    
      }

      // get next verse

      if( currentSyllable.verse >= this.state.lyrics[currentSyllable.stanza].length - 1 ) {
        if( currentSyllable.stanza < this.state.lyrics.length - 1 ) {
         
          nextVerse = this.getVerse( currentSyllable.stanza + 1, 0 );
          
        }
      } else {

        nextVerse = this.getVerse( currentSyllable.stanza, currentSyllable.verse + 1 );

      }




      pastVerseText = this.getVerseText( pastVerse );
      currentVerseWordsArray = this.getVerseWordsArray( currentVerse );
      nextVerseText = this.getVerseText( nextVerse );
      
    }  
    
    return (
      <React.Fragment>
        <Navbar/>
        <Grid className = "grid">
          <VerseInactive text = {pastVerseText}/>
          <VerseActive
          words = {currentVerseWordsArray}
          currentWord={this.state.playback.currentWordIndex}
          currentSyllable={this.state.playback.currentSyllableIndex}
          />
          <VerseInactive text = {nextVerseText}/>

          <h1>
            {this.getCurrentSyllableText()}
          </h1>
          <h2>
            
          </h2>
          <h4>
            Stanza:
            {this.state.playback.currentStanzaIndex}
          </h4>
          <h4>
            Verse:
            {this.state.playback.currentVerseIndex}
          </h4>
          <h4>
            Word:
            {this.state.playback.currentWordIndex}
          </h4>
          <h4>
            Syllable:
            {this.state.playback.currentSyllableIndex}
          </h4>
          
          <footer>
            <button onClick = {this.handlePlay}>Play</button>
            <button onClick = {this.handleStop}>Stop</button>
          </footer>


          <audio ref={this.audioRef} controls src={this.state.audio_url}>
            Your browser does not support the <code>audio</code> element.
          </audio>


        </Grid>
      </React.Fragment>
    );
    
  }

  

  findNearestKey = (array, time) => {
    var prev = -1;
    var i;
    for (i in array) {
        var n = parseInt(i);
        if ((prev !== -1) && (time < n))
            return prev;
        else 
            prev = n;
    }    
  }


}

export default SongPlayback;