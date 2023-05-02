import React, { useRef } from "react"
import { useEffect, useState } from "react"
import svg from "../assets/merge-comp.svg"
import HoverInfo from "./HoverInfo"

function Algorithm(props) {
    const img = new Image()
    img.src = props.algo.src

	return (
		<>
            <div className="sort-img-wrapper">
                <div className="sort-img-hover">
                    <HoverInfo algo={props.algo} index={props.index}/>
                </div>
                <img className="sort-img-img" src={ props.item.img } alt=""/>
                <img className="sort-img-big" src={ props.item.img } alt=""/>
            </div>
		</>
	)
}

export default Algorithm
