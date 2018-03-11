import React from 'react';
import Piece from '../Piece/Piece';
import { RED, GREEN, BLUE, WHITE, SKYBLUE, YELLOW, MAGENTA } from '../../Utilities/Constants';

/*CSS*/
import classes from './Reference.css';

const reference = () => {
    const referenceColors = [
        [RED, GREEN, YELLOW],
        [GREEN, BLUE, SKYBLUE],
        [BLUE, RED, MAGENTA],
        [RED, SKYBLUE, WHITE],
        [GREEN, MAGENTA, WHITE],
        [BLUE, YELLOW, WHITE]
    ]

    let references = referenceColors.map(referenceColor => (
        <div className={classes.Reference}>
            <Piece style={{
                            backgroundColor: referenceColor[0], 
                            borderColor: 'transparent',
                            width: '20px', 
                            height: '20px'}} />
            +
            <Piece style={{
                            backgroundColor: referenceColor[1], 
                            borderColor: 'transparent',
                            width: '20px', 
                            height: '20px'}} />
            =
            <Piece style={{
                            backgroundColor: referenceColor[2], 
                            borderColor: 'transparent',
                            width: '20px', 
                            height: '20px'}} />
                            
        </div>
    ));

    return (
        <div className={classes.ReferenceContainer}>
            {references}
        </div>
    );
}

export default reference;