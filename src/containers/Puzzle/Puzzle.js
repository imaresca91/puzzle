import React, {Component} from 'react';
import Piece from '../../components/Piece/Piece';
import Reference from '../../components/Reference/Reference';
import { RED, GREEN, BLUE, WHITE, SKYBLUE, YELLOW, MAGENTA } from '../../Utilities/Constants';

/*CSS*/
import classes from './Puzzle.css';

class Puzzle extends Component {
    state = {
        moves: 0,
        rows: 3,
        columns: 3,
        selectedPieces: [],
        colors: [BLUE, RED, BLUE, GREEN, RED, GREEN, GREEN, BLUE, RED],
        pieces: []
    }

    componentDidMount() {
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
        for(let i=0; i<pieces.length; i++) {
            if(parseInt(pieces[i].key, 10) === key){
                return i;
            }
        }
    }

    setBackgroundToPieces = (backgroundColor, selectedPieces) => {
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
        const pieceStyle = this.state.pieces[key].props.style
        if(pieceStyle.backgroundColor !== WHITE) {
            let updatedPieces = this.markPiece(key);
            let updatedSelectedPieces = [...this.state.selectedPieces];
            updatedSelectedPieces.push(key);
    
            this.setState({ ...this.sate, selectedPieces: updatedSelectedPieces, pieces: updatedPieces }, () => {
                if(this.state.selectedPieces.length === 2) {
                    const backgroundColor = this.calculateBackgroundColor(this.state.selectedPieces);
                    let updatedPieces = this.setBackgroundToPieces(backgroundColor, this.state.selectedPieces);
                    let moves = this.state.moves;
                    if(this.state.selectedPieces[0] !== this.state.selectedPieces[1]) {
                        moves = moves + 1;
                    }
                    this.setState({...this.state, moves: moves, selectedPieces: [], pieces: updatedPieces});
                }
            });
        }
    }

    calculateBackgroundColor = (selectedPieces) => {
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
                    <div style={{display: 'table-row'}}>
                        {columns.map(col => {
                            count += 1;
                            return(
                                <div style={{display: 'table-cell'}}>
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
                <div style={{display: 'table'}}>
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