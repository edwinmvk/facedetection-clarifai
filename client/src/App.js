import React from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Form from "./components/Form/Form";
import EntryCount from "./components/EntryCount/EntryCount.js";
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";

class App extends React.Component{
  constructor(){
    super()
    this.state= {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {  
        // this temporarily stores the data of the current userprofile in the frontend, when user does signin or register
        // Don't store the password in frontend
        id: '',
        name: '',
        email: '' ,
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser= (userdata) => {
    this.setState({ user: {
      id: userdata.id,
      name: userdata.name,
      email: userdata.email ,
      entries: userdata.entries,
      joined: userdata.joined
    }})
  }

  onRouteChange= (newroute) => {
    this.setState({ route: newroute })
    if((newroute === 'signin'))
      this.setState({ isSignedIn: false })
    else if(newroute === 'home')
      this.setState({ isSignedIn: true })
  }

  onInputChange= (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmitChange= () => { 
    this.setState({ imageUrl: this.state.input });

    // passing the url to backend to receive the response from api client
    fetch("http://localhost:3000/api", {
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          inputUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(data => {

      // 1st duty is to update the image entries number IF and ONLY IF we get the data. For this we have to pass the id to backend.
      if(data){
        fetch("http://localhost:3000/imageentries", {
          method: "put",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then((fetch_response) => fetch_response.json()) 
        .then(count => {
          // if we change the user object of the state object, then the whole data inside the user object will be lost 
          // this.setState({user: { 
          //   entries: count
          // }})
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }

      // 2nd duty is to send the data for building the face detection box
      this.displayFaceBox(this.calculateFaceLocation(data));
    })
  }
    
  calculateFaceLocation= (data) => {
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage')
    const width= Number(image.width);
    const height= Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width- (clarifaiFace.right_col * width),
      bottomRow: height- (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox= (box) => {
    console.log(box)
    this.setState({box: box});
  }

  render(){
    return(
      <div className='App'>
        <ParticlesBg className= "particles" type= "square" bg={true} />
        <Navigation routechange= {this.onRouteChange} isSignedIn= {this.state.isSignedIn}/>
        {
          this.state.route === 'home' 
          ?
          <div>
              <Logo/>
              <EntryCount name= {this.state.user.name} entries= {this.state.user.entries}/>
              <Form inputchange= {this.onInputChange} submitchange= {this.onSubmitChange}/>
              <FaceRecognition url= {this.state.imageUrl} box= {this.state.box}/>
          </div>
          :(
            this.state.route === 'signin'
            ?
            <Signin routechange= {this.onRouteChange} loadUser= {this.loadUser}/>
            :
            <Register routechange= {this.onRouteChange} loadUser= {this.loadUser}/>
          )
            
        }
      </div>
    )
  }
}

export default App;
