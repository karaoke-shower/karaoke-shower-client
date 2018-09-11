import React from 'react';
import SongPlayback from './SongPlayback';
import SongCapture from './SongCapture';

import './styles.css';

const URL = 'http://localhost:4000/songs/0';

class App extends React.Component {

  
  render = () => {

    //<SongPlayback/>
    return (
      <SongCapture/>      
    )
  }


}

export default App;