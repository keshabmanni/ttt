import React from 'react';

function calculateWinner(moves) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
        return moves[a];
      }
    }
    return null;
  }

class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            squares: Array(9).fill(null),
            movesX: [],
            movesO: [],
            trunX: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.winnerResetGame = this.winnerResetGame.bind(this);
        
    }
    
    handleClick(i){
        if(this.state.movesX.indexOf(i) > -1 || this.state.movesO.indexOf(i) > -1){
            
        }
        else{
            //add moves to respective player's moves array
            this.state.trunX ? (this.setState({movesX: [...this.state.movesX, i]})) : (this.setState({movesO: [...this.state.movesO, i]}));

            //update moves to board i.e squares array
            
            const sign = this.state.trunX ? 'X' : 'O';
            const newSquares = this.state.squares;
            newSquares[i] = sign;

            this.setState({squares:  newSquares})

            //see if anyone have won
            this.setState({winner: calculateWinner(this.state.squares)})
            
           
            //flip the next player
            this.setState({trunX: !this.state.trunX})


        }
    }

    resetGame(){
        this.setState({squares: Array(9).fill(null),})
        this.setState({trunX: true})
        this.setState({movesO: []})
        this.setState({movesX: []})
        this.setState({winner: null})
    }
    winnerResetGame(){
        this.setState({squares: Array(9).fill(null),})
        this.setState({trunX: true})
        this.setState({movesO: []})
        this.setState({movesX: []})
        this.setState({winner: null})
        document.getElementById("announcer").classList.add("hidden")
    }
    render(){
        
        return(
            
            <div className="game">
                {this.state.winner ? document.getElementById("announcer").classList.remove("hidden") :  ''}
                <div id="announcer" className="hidden">
                <div className="announcerBG"></div>
                <div className="announcer">
                    <h2>WINNER</h2>
                    <h1>{this.state.winner}</h1>
                    <button name="ok_button" className="okBtn" onClick={this.winnerResetGame.bind(this)}>OK</button>
                </div>
                </div>
                <h2>XX Tic-Tac-Toe OO</h2>
                <span><i>- By Kesu M.</i></span>
                <div className="board">
                    {this.state.squares.map((square, i) => (
                        <button name={square+"square"} className="square" key={i.toString()} 
                            onClick={this.handleClick.bind(this, i)}>
                                {this.state.squares[i]}
                        </button>
                    ))}
                </div>
                <button name="reset_button" className="resetButton" onClick={this.resetGame.bind(this)}>Reset Game</button>
                <div className="bottomPanel">
                    <div className={"playX " + (this.state.trunX ? 'nowPlay': '')}>X</div>
                    <div className={"playO " + (this.state.trunX ? '': 'nowPlay')}>O</div>
                </div>
                
            </div>
        )
    }
}
export default Board;