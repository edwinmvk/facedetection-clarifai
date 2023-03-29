import React from "react";
import "tachyons";
import './FaceRecognition.css'

const FaceRecognition= ({url, box}) =>{
    return(
        <div className= "flex justify-center">
            <div className="absolute mt2">
                <img id= "inputimage" alt="" src= {url} width= "500px" height= "auto" />
                <div className="bounding-box" style= {{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;