import React from 'react';

const SyllableTimeDialog = (props) => {
    return (
        <div className="syllable-time-capture">
            

            <div className="text-time">
                <div className="text">
                    {props.text}
                </div>
                <div className="time">
                    <input
                    type="number"
                    step="1"
                    className="minutes"
                    name="minutes"
                    placeholder="00"
                    value={!!props.time ? Math.floor(props.time/60000) : 0 }
                    onChange={props.onMinuteChange}
                    />
                    :
                    <input
                    type="number"
                    step=".01"
                    className="seconds"
                    name="seconds"
                    placeholder="00"
                    value={!!props.time ? (props.time/1000)%60 : 0 }
                    onChange={props.onSecondChange}
                    />
                </div>
                
            </div>

            
            <div className="position">
                <div className="stanza">
                    stanza:
                    <span>
                        {props.stanza}
                    </span>
                </div>
                <div className="verse">
                    verse:
                    <span>
                        {props.verse}
                    </span>
                </div>
                <div className="word">
                    word:
                    <span>
                        {props.word}
                    </span>
                </div>
                <div className="syllable">
                    syllable:
                    <span>
                        {props.syllable}
                    </span>
                </div>                                                
            </div>


        </div>
    )
}

export default SyllableTimeDialog;