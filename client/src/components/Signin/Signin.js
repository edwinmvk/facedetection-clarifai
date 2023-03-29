import React from "react";
import "tachyons"

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            signInEmail: '',
            signInPassword: ""
        }
    }

    onEmailChange= (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange= (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn= () => {
        fetch("http://localhost:3000/signin", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(userdata => {
            if(userdata.id){ // if we recieve a user's data with id as response
                this.props.loadUser(userdata);
                this.props.routechange('home')
            }
        })
    }

    render(){
        const props= this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure tc">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  id="email-address"
                                onChange= {this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  id="password"
                                onChange= {this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div>
                            <input 
                            onClick= {this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                            onClick= {() => { props.routechange('register') }}
                            className="f6 link dim black db pointer">Register
                            </p>
                            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;