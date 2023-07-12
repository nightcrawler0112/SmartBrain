import React from 'react';
import Navigation from './components/Navigation/Navigation.js'; 
import ImageLinkForm from './components/ImageLinkform/ImageLinkForm.js';
import Signin from './components/SignIn/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecogniton from './components/Facerecognition/FaceRecognition.js';  
import Logo from './components/Logo/Logo.js'; 
import Rank from './components/Rank/rank.js'; 
import './App.css';
import ParticlesBg from 'particles-bg'

  const sendClarifaiRequestOptions = (imageUrl)=>{

          // Your PAT (Personal Access Token) can be found in the portal under Authentification
        const PAT = 'aa1711ab3cc447b0bd9e8f809ada37fe';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'nightcrawler0112';       
      const APP_ID = 'test';
      // Change these to whatever model and image URL you want to use
      // const MODEL_ID = 'face-detection';
      const IMAGE_URL = imageUrl;

      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
      });

      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;

  }

 

 ///////////////////////////////////////////////////////////////////////////////////
 // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
 ///////////////////////////////////////////////////////////////////////////////////

 

 

 // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
 // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
 // this will default to the latest version_id

 
class App extends React.Component{


    constructor(){
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box:{},
        route: 'signin',
        user:{
           id:'',
           name: '',
           email: '',
           entries: 0,
           joined: new Date()
        }
      }
    }

    loadUser=(data)=>{
      this.setState({user: {
           id:data.id,
           name: data.name,
           email: data.email,
           entries: data.entries,
           joined: data.joined

      }})
    }

    
    calculateFaceLocation = (data)=>{
        const Face=data.outputs[0].data.regions[0].region_info.bounding_box
        const img=document.getElementById('inputimg');
        const width=Number(img.width);
        const height=Number(img.height);

        // console.log(width);
        // console.log(height);

        return{
          leftCol: Face.left_col * width,
          topRow: Face.top_row*height,
          rightCol: width - (Face.right_col*width),
          bottomRow: height -(Face.bottom_row*height)
          }
    
      }

      displayFaceBox = (box) =>{
        console.log(box);
        this.setState({box: box});
      }

    onInputChange= (event) =>{
       this.setState({input: event.target.value});
    }

    onButtonDetect =()=>{
      //console.log('click');
      this.setState({imageUrl:this.state.input});
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs",sendClarifaiRequestOptions(this.state.imageUrl))
       .then(response => response.json())
       .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
       .catch(error => console.log('error', error));
     
     
    }

    onRouteChange=(route)=>{
      this.setState({route: route});
    }

  render(){
    return (
      <div className="App">
      
      <ParticlesBg  num={50} type="cobweb" bg={true} />
      
      
      { 
        
        this.state.route === 'home' ? 
        <div>
        <Navigation onRouteChange={this.onRouteChange}/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonDetect={this.onButtonDetect}/>
        <FaceRecogniton box={this.state.box} imageUrl={this.state.imageUrl}/>
     </div> :(
      this.state.route==='signin' ?
      <div>
      
      <h1 className='f1'>SmartBrain</h1>
      <Signin onRouteChange={this.onRouteChange}/> </div> :
       <div>
       
       <h1 className='f1'>SmartBrain</h1>
      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange }/>
      </div>

     )

       
        
      }
      </div>
     
    );
  }
}

export default App;
