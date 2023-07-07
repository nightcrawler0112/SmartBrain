import React from 'react';
import Navigation from './components/Navigation/Navigation.js'; 
import ImageLinkForm from './components/ImageLinkform/ImageLinkForm.js'; 
import Logo from './components/Logo/Logo.js'; 
import Rank from './components/Rank/rank.js'; 
import './App.css';

class App extends React.Component{
  render(){
    return (
      <div className="App">
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      
       {/* 
      <FaceRecogniton/> */}
      </div>
    );
  }
}

export default App;
