import React from 'react';
import {
  Grid
} from 'react-bootstrap';
import Controls from './Controls';
import Navbar from './Navbar';
import VerseActive from './VerseActive';
import VerseInactive from './VerseInactive';
import './styles.css';

const URL = 'http://localhost:4000/songs/0';

class App extends React.Component {

  

  
  
  constructor(props) {
    
    super(props);
    
    this.playbackTimer = null;
    this.timeSyllables = {};
    
    this.hierarchyIndexTracker = {
      hierarchyLevel: 0,
      currentStanza: 0,
      currentWord: 0,
      currentVerse: 0,
      currentSyllable: 0,
    };



    this.state = {
      audio_url: '',
  
      lyrics: [],
      playback: {
        currentTime: 0,
  
        currentStanza: 0,
        currentWord: 0,
        currentVerse: 0,
        currentSyllable: 0,
  
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

      console.log(this.timeSyllables);
      
      
    } catch (e) {
      console.error(e);
    }
  }

  // recursive function:
  flattenSongToArray = (input) => {
    console.log( "hierarchy level: ", this.hierarchyIndexTracker )
    if (Array.isArray(input)) {
      input.forEach(element => {
        this.flattenSongToArray(element)
      });
      this.hierarchyIndexTracker.hierarchyLevel++
    } else {
      this.timeSyllables[input.time] = {
        text: input.text,
        currentStanza: 0,
        currentVerse: 0,
        currentWord: 0,
      };
    }

  }

  forward = () => {
    const {
      currentStanza,
      currentWord,
      currentVerse,
      currentSyllable,
      lyrics


    } = this.state;

    const current = lyrics[currentStanza][currentVerse][currentWord][currentSyllable];
    // console.log(current);
    // si el hijo es la último del padre actual -> cambia al siguiente padre y resetea current[hijo]
    // sino, escoge la siguiente hijo
  }


  handleTick = () => {
    if( !! this.audioRef.current ) {
      let currentTime = this.audioRef.current.currentTime;
      let currentSyllable = this.timeSyllables[
        this.findNearestKey( this.timeSyllables, Math.round( currentTime * 1000 ))
      ]

      let pb = this.state.playback;
      pb.currentSyllable = currentSyllable;
      this.setState({ playback: pb });

      console.log(
        "tesxt", currentSyllable.text
      );
    }
  }


  handlePlay = () => {
    let pb = this.state.playback;
    pb.playing = true;
    this.setState({
      playback: pb
    });

    this.audioRef.current.play()

    this.playbackTimer = setInterval(
      this.handleTick,
      200
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

  rewind() {

  }


  render() {

    return (
      <React.Fragment>
        <Navbar/>
        <Grid className = "grid">
          <VerseInactive text = "Verso anterior"/>
          <VerseActive text = "Verso actual"/>
          <VerseInactive text = "Verso siguiente"/>

          <h1>
            {this.state.playback.currentSyllable.text}
          </h1>

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
        if ((prev != -1) && (time < n))
            return prev;
        else 
            prev = n;
    }    
  }


}

export default App;