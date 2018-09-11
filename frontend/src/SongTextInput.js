import React from 'react';

const SongTextInput = (props) => {
        return (
            <React.Fragment>
                
                <h4>
                    Song Text Input
                </h4>

                <textarea
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                />
            </React.Fragment>
        )

}

export default SongTextInput;