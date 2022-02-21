
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import { markBoard, getBoard } from '../service';
import { Error } from './Error';
import { Message } from './Message';

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
            isWin: false,
            isPlay: false,
            stateBoad: "",

            //manejador de mensaje
            isShow: false,
            msgClass: '',
            description: '',

        };
    }

    componentDidMount() {
        if (!this.state.idBoard) return;

        setInterval(async () => {

            const res = await getBoard(this.props.token, this.props.idBoard)

            if (res.status.flag == 'S') {
                this.setState({
                    squares: res.payload.board,
                    isWin: res.payload.isWin,
                    isPlay: res.payload.isPlay,
                    stateBoad: res.payload.state,
                    isShow: false
                });

            } else {
                console.log(res.status.message)
                this.setState({
                    isShow: true,
                    description: res.status.message,
                    msgClass: "msgError",
                })
            }
        }, 1000)
    }

    checkBoard = async () => {
        const res = await getBoard(this.props.token, this.props.idBoard)

        if (res.status.flag == 'S') {
            const isWin = res.payload.isWin
            const stateBoard = res.payload.state

            if (stateBoard == 'W') {
                if (isWin) {
                    this.setState({
                        isShow: true,
                        description: 'GANASTE!!',
                        msgClass: "msgOK",
                    });
                } else {
                    this.setState({
                        isShow: true,
                        description: 'PERDISTE',
                        msgClass: "msgInfo",
                    });

                }
            }


        }
    }



    handleClick = async (i) => {
        console.log('marcando')
        console.log(this.props.token)
        const res = await markBoard(this.props.token, this.props.idBoard, i)

        if (res.status.flag == 'S') {
            const squarenew = res.payload.board
            this.setState({
                squares: squarenew,
                isShow: false
            });


            //checkBoard


        } else {
            console.log(res.status.message)
            this.setState({
                isShow: true,
                description: res.status.message,
                msgClass: "msgError",
            })
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        if (this.state.stateBoad=='W'){

            if (this.state.isWin){


            return(
                    <div> <Message
                        isShow={true}
                        msgClass={'msgOk'}
                        description={'GANASTE'} />
                    </div>
                    )
                }else{
                    return(
                    <div> <Message
                        isShow={true}
                        msgClass={'msgInfo'}
                        description={'PERDISTE'} />
                    </div>
                    )
                
            }

        }else{
        
        return (
            <div>
                <div> <Message
                    isShow={this.state.isShow}
                    msgClass={this.state.msgClass}
                    description={this.state.description} />
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
    }}
}



export default Board;