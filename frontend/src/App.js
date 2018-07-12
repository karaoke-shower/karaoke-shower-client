import React from 'react';
import {Grid} from 'react-bootstrap';
import Controls from './Controls';
import Navbar from './Navbar';
import VerseActive from './VerseActive';
import VerseInactive from './VerseInactive';
import './styles.css';

class App extends React.Component {
  render() {
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
