import React, { Component } from 'react';
import '../index.css'


export class Error extends Component {
   
    render() {
        console.log(this.props)
        const {item} = this.props;
        if (this.props.isError){
        return (
            
            <div className='msgError'>
               {this.props.msgError}
            </div>
        )}else
        {return (<div>
     </div>)}
    }
}



//export default Error;