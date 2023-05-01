import React from "react"
import svg from "../assets/merge-comp.svg"

function HoverInfo(props) {
    switch(props.index){
        case 0 :
            return <p>{props.algo.kor_desc}</p>
        case 1 :
            return <img src={require('../assets/complexity/'+props.algo.type+'.svg')} alt={props.algo.title}/>
        case 2 :
            return <p className="algo-code">{props.algo.code?props.algo.code:"hello world"}</p>
        default:
            return <img src={props.algo.img} alt={props.algo.title}/>
    }
}

export default HoverInfo