import React from 'react';
import 'tachyons';
import './Form.css'

const Form= (props) =>{
    return(
        <div className='tc'>
           
            <div className= "f4 flex justify-center">
                <div className= "formcss flex justify-center pa4 br3 shadow-5">
                    <input className= "w-70" type= 'text' onChange= {props.inputchange}/>
                    <button className=" w-30 link grow white bg-light-purple pointer" onClick= {props.submitchange}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Form;