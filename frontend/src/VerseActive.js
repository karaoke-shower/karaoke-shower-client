import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

import  './VerseActive.css';

const VerseActive = ({words, currentWord, currentSyllable}) => {

  console.log( words );

  if( Array.isArray(words )) {
  
    // let html = "";

    let syllables = words.map( (word,wordIndex) => {
      
      let syllableGroup = word.map( (syllable,syllableIndex) => {

        let isCurrentSyllable = currentWord == wordIndex && currentSyllable == syllableIndex;
        
        return <span className={ isCurrentSyllable ? 'syllable active' : 'syllable' }>
            {syllable}
          </span>
        }
      );

    return <span className="word">{syllableGroup}&nbsp;</span>
      
      }
    );
  
  return (
    <Row>
      <Col xs={12} md={8}>
        {syllables}
      </Col>
    </Row>
  )

  } else {
    return <div>No words</div>
  }

};

export default VerseActive;
