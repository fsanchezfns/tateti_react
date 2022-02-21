import React, { Component } from 'react';
import Board from './Board'
import { createBoard } from '../service';

class Player extends Component {
    state ={
        idBoard:null,
        name:"",
        isPlaying:false,
        token:""

    }


    playBoard = async () => {
        const res= await createBoard();
        console.log(res)
        if (res.status.flag=='S'){
            const idBoard = res.payload.idBoard
            const token = res.payload.token
            const name = res.status.message
        this.setState({idBoard:idBoard,isPlaying:true,name:name,token:token})
    }
    else{
        console.log(res.status.message)
    }

    }

    render() {
        if(!this.state.isPlaying){
        return (
            <div>
                <div>BIENVENIDOS AL JUEGO DEL TATETI</div>
                <button onClick={this.playBoard}> Jugar </button>
            </div>
            
        )
    }else{
        return(
            <div>
                <label> {this.state.name} </label>
                <Board idBoard={this.state.idBoard} token={this.state.token}/>
            </div>
            )
        }
    }
}


export default Player;