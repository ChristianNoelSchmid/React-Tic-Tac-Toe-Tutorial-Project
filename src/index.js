import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// A shorthand way of creating a Component
// which only calls the render function
function Square(props) {
    return (
        <button className="square" 
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {

    // The constructor carries the props parameter 
    // with it. The Square Component, for instance, is
    // assigned properties from the Board class. Calling
    // super(props) ensures that the properties are properly
    // carried over.
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            status: 'Next player: X',
        };
    }

    handleClick(i) {
        if(this.state.squares[i] == null) {
            // Grab the whole squares array, to be
            // assigned to state at end. This ensures
            // maximum immutability (assigning whole objects
            // instead of parts of the object)
            const squares = this.state.squares.slice();
            let playerChar = this.state.xIsNext ? 'X' : 'O';
            let nextStatus = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');

            squares[i] = playerChar;
            if(this.checkIfWinner(playerChar, squares)) {
                nextStatus = playerChar + " player wins!";
            }

            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
                status: nextStatus,
            });
        }
    }

    checkIfWinner(playerChar, squares) {

        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for(let win in wins) {
            let complete = true;
            for(let i = 0; i < 3; ++i) {
                if(squares[win[i]] !== playerChar) {
                    complete = false;
                    break;
                }
            } 
            if(complete) { return true; }
        }

        return false;
    }

    renderSquare(i) {
        // In the creation of the square, we set it's "value"
        // in its properties to squares' index value, to be accessed
        // by the square in its rendering process.
        // These values are accessed via the squares "prop" parameter.
        return <Square 
            value={this.state.squares[i]}

            // If the square is clicked, add the correct shape 
            // to the board (depending on player turn)
            onClick={ () => this.handleClick(i) }
        />;
    }

    render() {

        return (
        <div>
            <div className="status">{this.state.status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);