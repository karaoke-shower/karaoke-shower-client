import React from 'react';

class SongTextDisplay extends React.Component {

    render = () => {
        return (
            <React.Fragment>
                
                <h4>
                    Preview
                </h4>

                <section className="text_input">
                    <div className="stanza"> 
                        <div className="verse"> 
                            <div className="word"> 
                                <div className="syllable"> 
                                    U
                                </div>
                                <span className="separator"> 
                                    ·
                                </span>
                                <div className="syllable active"> 
                                    na
                                </div>                           
                            </div>
                            <div className="word"> 
                                <div className="syllable"> 
                                    sí
                                </div>
                                <div className="syllable"> 
                                    la
                                </div>                           
                            </div>                            
                        </div>
                    </div>
                    
                
                </section>
            </React.Fragment>
        )
    }

}

export default SongTextDisplay;