
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import { markBoard } from '../service';
import { Error } from './Error';;

function Square(props) {
    return (
        <button className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idBoard: props.idBoard,
            token: props.token,
            squares: Array(9).fill(''),
            isError: false,
            msgError: "",
        };
    }

    handleClick = async (i) => {
        console.log('marcando')
        console.log(this.props.token)
        const res = await markBoard(this.props.token, this.props.idBoard, i)



        if (res.status.flag == 'S') {          
            //const squares = this.state.squares.slice();
            const squarenew = res.payload.board
            this.setState({
                squares: squarenew,
                isError: false
            });


        } else {
            console.log(res.status.message)
            this.setState({
                isError: true,
                msgError: res.status.message

            })
        };
    }

    /* handleClick(i){
         const squares = this.state.squares.slice();
        // if (calculateWinner(squares) || squares[i]){
         //    return;
         //}
         
         squares[i] = 'X';
         this.setState({
             squares: squares,
         });
     }*/

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div> <Error
                    isError={this.state.isError}
                    msgError={this.state.msgError} />
                </div>


                <div>
                    <div className="">{ }</div>
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
            </div>
        );
    }
}


export default Board;