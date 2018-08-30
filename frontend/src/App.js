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
    } catch (e) {
      console.error(e);
    }
  }

  recursive = (input) => {
    console.log(input);
    if (Array.isArray(input)) {
      input.forEach(element => this.recursive(element));
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
    console.log(current);
    // si el hijo es la último del padre actual -> cambia al siguiente padre y resetea current[hijo]
    // sino, escoge la siguiente hijo
  }


  handleTick = () => {
    console.log("tick!");
    
  }


  handlePlay = () => {
    let pb = this.state.playback;
    pb.playing = true;
    this.setState({
      playback: pb
    });

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

    clearInterval( this.playbackTimer );

  }

  rewind() {

  }


  render() {
    // this.recursive(this.state.lyrics);

    return (
      <React.Fragment>
        <Navbar/>
        <Grid className = "grid">
          <VerseInactive text = "Verso anterior"/>
          <VerseActive text = "Verso actual"/>
          <VerseInactive text = "Verso siguiente"/>
          <footer>
            <button onClick = {this.handlePlay}>Play</button>
            <button onClick = {this.handleStop}>Stop</button>
          </footer>


          <Controls audio_url = {this.state.audio_url}/>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;