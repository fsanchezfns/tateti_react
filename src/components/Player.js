import React, { Component } from 'react';
import Board from './Board'
import { createBoard } from '../service';

class Player extends Component {
    state ={
        idBoard:null,
        name:"",
        playing:false,
        token:""

    }

    playBoard = async () => {
        console.log('jugar')
        const res= await createBoard();
        console.log(res)
        if (res.status.flag=='S'){
            const idBoard = res.payload.idBoard
            const token = res.payload.token
        this.setState({idBoard:idBoard,name:"franco",playing:true,token:token})
    }
    else{
        console.log(res.status.message)
    }

    }

    render() {
        if(!this.state.playing){
        return (
            <div>
                <label> Jugador </label>
                <input type="text" id="name"></input>
                <button onClick={this.playBoard}> Jugar </button>
            </div>
            
        )
    }else{
        return(
            <div>
                <label> JUGANDO {this.state.name} </label>
                <Board idBoard={this.state.idBoard} token={this.state.token}/>
            </div>
            )
        }
    }
}


export default Player;