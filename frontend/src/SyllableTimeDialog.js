import React from 'react';

const SyllableTimeDialog = (props) => {
    return (
        <div className="syllable-time-capture">
            
            <div className="text-time">
                <div className="text">
                    ...
                </div>
                <div className="time">
                    <input
                    className="minutes"
                    name="minutes"
                    placeholder="00"
                    />
                    :
                    <input
                    className="seconds"
                    name="seconds"
                    placeholder="00"
                    />
                </div>
                
            </div>

            <div className="position">
                <div className="stanza">
                    stanza:
                    <span>
                        0
                    </span>
                </div>
                <div className="verse">
                    verse:
                    <span>
                        0
                    </span>
                </div>
                <div className="word">
                    word:
                    <span>
                        0
                    </span>
                </div>
                <div className="syllable">
                    syllable:
                    <span>
                        0
                    </span>
                </div>                                                
            </div>

        </div>
    )
}

export default SyllableTimeDialog;