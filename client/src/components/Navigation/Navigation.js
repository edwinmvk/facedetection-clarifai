import React from "react";
import "tachyons"

const Navigation= (props) =>{
    if(props.isSignedIn){
        return(
            <div className="flex justify-end">
                <p 
                onClick= {() =>{ props.routechange('signin') }}
                className="f3 mr3 link pointer dim underline-hover">
                Sign out
                </p>
            </div>
        )
    }
    else{
        return(
            <div className="flex justify-end">
                <p 
                onClick= {() =>{ props.routechange('signin') }}
                className="f3 mr3 link pointer dim underline-hover">
                Sign In
                </p>
                <p 
                onClick= {() =>{ props.routechange('register') }}
                className="f3 mr3 link pointer dim underline-hover">
                Register
                </p>
            </div>
        )
    }
}

export default Navigation;