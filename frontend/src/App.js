import React from 'react';
import {Grid} from 'react-bootstrap';
import Controls from './Controls';
import Navbar from './Navbar';
import VerseActive from './VerseActive';
import VerseInactive from './VerseInactive';
import './styles.css';

const URL = 'https://raw.githubusercontent.com/karaoke-shower/karaoke-shower-client/development/sample-data/lyrics.json';

class App extends React.Component {
  state =  {
    currentStanza: 0,
    currentWord: 0,
    currentVerse: 0,
    currentSyllable: 0,
    lyrics: [],
  }

  async componentDidMount () {
    try {
      const responseRaw = await fetch(URL);
      const {lyrics}= await responseRaw.json();
      this.setState({lyrics});
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
      lyrics,
    } = this.state;

    const current = lyrics[currentStanza][currentVerse][currentWord][currentSyllable];
    console.log(current);
    // si el hijo es la último del padre actual -> cambia al siguiente padre y resetea current[hijo]
    // sino, escoge la siguiente hijo
  }


  render() {
    this.recursive(this.state.lyrics);

    return (
      <React.Fragment>
        <Navbar />
        <Grid className="grid">
          <VerseInactive text="Verso anterior"/>
          <VerseActive text="Verso actual"/>
          <VerseInactive text="Verso siguiente"/>
          <Controls />
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
