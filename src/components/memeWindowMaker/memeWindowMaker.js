import React,{Component} from 'react';
import '../Redditmemes/Redditmeme.css'

class MemeWindowMaker extends Component{
    render(){
        return(
            <div className="memePageWindow" onClick={this.props.clicked}>
                    <div className="boxText">{this.props.typeOfMeme}</div>
                    <img  src={this.props.source} width='120px' height="120px" style={{marginTop:'15px'}} />  
            </div>
        )
    }
}

export default MemeWindowMaker;