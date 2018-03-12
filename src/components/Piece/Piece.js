import React from 'react';

/*CSS*/
import classes from './Piece.css';

const piece = (props) => (
    <div className={classes.Piece} style={props.style} onClick={props.clicked}></div>
);

export default piece;