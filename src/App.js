import React from 'react';
import Navigation from './components/Navigation/Navigation.js'; 
import './App.css';

class App extends React.Component{
  render(){
    return (
      <div className="App">
      <Navigation/>
      {/* <Logo/>
      <ImageLinkForm/>
      <FaceRecogniton/> */}
      </div>
    );
  }
}

export default App;
