import React, { Component } from 'react';
import '../index.css'


export class Message extends Component {
   
    render() {
        console.log(this.props)
        const {item} = this.props;
        if (this.props.isShow){
        return (
            
            <div className={this.props.msgClass}>
               {this.props.description}
            </div>
        )}else
        {return (<div>
     </div>)}
    }
}
