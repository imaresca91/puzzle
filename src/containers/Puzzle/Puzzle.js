import React, {Component} from 'react';
import Piece from '../../components/Piece/Piece';
import Reference from '../../components/Reference/Reference';
import { RED, GREEN, BLUE, WHITE, SKYBLUE, YELLOW, MAGENTA } from '../../Utilities/Constants';

/*CSS*/
import classes from './Puzzle.css';

class Puzzle extends Component {
    state = {
        moves: 0,
        rows: 3, //This defines how many rows has the puzzle.
        columns: 3, //This defines how many columns has the puzzle.
        selectedPieces: [], //This array is being used to save te pieces that are selected.
        colors: [BLUE, RED, BLUE, GREEN, RED, GREEN, GREEN, BLUE, RED], //This array contains the default set of colors for a 3x3 puzzle.
        pieces: [] //This array contains all the pieces of the puzzle.
    }

    componentDidMount() {
        /*This function initialize the puzzle with the corresponding pieces. 
        If the puzzle has more than 9 pieces, the colors are set randomly.*/
        let pieces = [];
        const rows = this.state.rows;
        const columns = this.state.columns;
        for(let i=0; i<rows*columns; i++) {
            pieces.push(
                <Piece 
                    key={i}
                    style={{backgroundColor: this.state.colors[rows*columns > 9 ? Math.floor(Math.random() * 9) : i]}}
                    clicked={() => this.pieceSelected(i)}/>
            );
        }
        this.setState({
            ...this.state,
            pieces: pieces
        });
    }

    markPiece = (key) => {
        //This function is responsible for marking a piece with black border when it is selected.
        const style = { ...this.state.pieces[key].props.style, borderColor: 'black' }
        let pieces = [...this.state.pieces];
        let piecePosition = this.getPiecePosition(pieces, key);
        pieces.splice(piecePosition, 1);
        pieces.splice(
            piecePosition, 
            0,
            <Piece 
                key={key}
                style={style}
                clicked={() => this.pieceSelected(key)}/>
        );
        return pieces;
    }

    getPiecePosition = (pieces, key) => {
        //This function return the piece position in the array of pieces which is defined above in the state.
        for(let i=0; i<pieces.length; i++) {
            if(parseInt(pieces[i].key, 10) === key){
                return i;
            }
        }
    }

    setBackgroundToPieces = (backgroundColor, selectedPieces) => {
        //This function sets the new background color for the pieces that were selected.
        let pieces = [...this.state.pieces];
        pieces = this.setBackgroundToPiece(pieces, backgroundColor, selectedPieces[0]);
        pieces = this.setBackgroundToPiece(pieces, backgroundColor, selectedPieces[1]);
        return pieces;
    }

    setBackgroundToPiece = (pieces, backgroundColor, key) => {
        const style = {
            ...this.state.pieces[key].props.style,
            backgroundColor: backgroundColor,
            borderColor: '#CFD0CF'
        }
        let piecePosition = this.getPiecePosition(pieces, key);
        pieces.splice(piecePosition, 1);
        pieces.splice(
            piecePosition, 
            0,
            <Piece 
                key={key}
                style={style}
                clicked={() => this.pieceSelected(key)}/>
        );
        return pieces;
    }

    pieceSelected = (key) => {
        //This function runs when a pieces is being selected.
        const pieceStyle = this.state.pieces[key].props.style
        if(pieceStyle.backgroundColor !== WHITE) {
            let updatedPieces = this.markPiece(key); //This set the border to black.
            let updatedSelectedPieces = [...this.state.selectedPieces];
            updatedSelectedPieces.push(key); //This saves the key of the current piece.
    
            this.setState({ ...this.sate, selectedPieces: updatedSelectedPieces, pieces: updatedPieces }, () => {
                if(this.state.selectedPieces.length === 2) { //It enters to the if, if the there are 2 pieces selected.
                    const backgroundColor = this.calculateBackgroundColor(this.state.selectedPieces); //This function calculates the new background color (first piece + second piece)
                    let updatedPieces = this.setBackgroundToPieces(backgroundColor, this.state.selectedPieces); //This function sets the new background color to the pieces.
                    let moves = this.state.moves;
                    if(this.state.selectedPieces[0] !== this.state.selectedPieces[1]) { //If the same piece is being clicked twice, it will not increments the moves.
                        moves = moves + 1;
                    }
                    this.setState({...this.state, moves: moves, selectedPieces: [], pieces: updatedPieces});
                }
            });
        }
    }

    calculateBackgroundColor = (selectedPieces) => {
        //This function calculates the new background color for the pices that are selected.
        const firstColor = this.state.pieces[selectedPieces[0]].props.style.backgroundColor;
        const secondColor = this.state.pieces[selectedPieces[1]].props.style.backgroundColor;
        let combinatedColor = null;
        if(firstColor === secondColor) {
            combinatedColor = firstColor;
        }else if((firstColor === RED && secondColor === GREEN) || (firstColor === GREEN && secondColor === RED)) {
            combinatedColor = YELLOW;
        } else if((firstColor === GREEN && secondColor === BLUE) || (firstColor === BLUE && secondColor === GREEN)) {
            combinatedColor = SKYBLUE;
        } else if((firstColor === BLUE && secondColor === RED) || (firstColor === RED && secondColor === BLUE)) {
            combinatedColor = MAGENTA;
        }else {
            combinatedColor = WHITE;
        }
        return combinatedColor;
    }

    render() { 
        let count=-1;
        let rows=[];
        for (let i = 0; i < this.state.rows; i++) {
            rows.push(i);
        }
        let columns = [];
        for (let i = 0; i < this.state.columns; i++) {
            columns.push(i);
        }
        let table = (
            rows.map(row => {
                return (
                    <div className={classes.TableRow}>
                        {columns.map(col => {
                            count += 1;
                            return(
                                <div className={classes.TableCell}>
                                    {this.state.pieces[count]}
                                </div>
                            );
                        })}
                    </div>
                );
            })
        );
        return (
            <div className={classes.Puzzle}>
                <div className={classes.Table}>
                    {table}
                </div>
                <div className={classes.Reference}>
                    <p>Moves: {this.state.moves}</p>
                    <p>Refereces</p>
                    <Reference />
                </div>
            </div>
        )
    }
}

export default Puzzle;