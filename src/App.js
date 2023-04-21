// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { useState, useEffect } from "react";
import './App.css';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD_5UWM8lLsV2mnNP-KzDXRsV5Zhf00aU",
  authDomain: "react-ecommerce-b9a25.firebaseapp.com",
  databaseURL: "https://react-ecommerce-b9a25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-ecommerce-b9a25",
  storageBucket: "react-ecommerce-b9a25.appspot.com",
  messagingSenderId: "81866203071",
  appId: "1:81866203071:web:36d7b1000f89c216d94b0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

function App() {
  const [storyLine, setStoryLine] = useState("");

  const startGame = () =>{
    //Remove the start game section
    var startSection = document.getElementById("start-section");
  
    get(child(dbRef, `Scene1`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const newStory = (
          <div id="storyline-container">
            <div id="game-graphic" className="mt-3">
              <img src={snapshot.val().image} 
                width="400" height="400"
              />
            </div>

            <div className="text-light mt-3" id="game-description">
              <span id="description-control">
                {snapshot.val().description} 
              </span>
            </div>

            <div id="decision-section" className="text-center">
              <button className="btn btn-primary game-option" id="option1" onClick={() => chooseOption(snapshot.val().option1Action)}>{snapshot.val().option1} </button>
              <button className="btn btn-info game-option" id="option2" onClick={() => chooseOption(snapshot.val().option2Action)}>{snapshot.val().option2} </button>
            </div>

          </div>
        )

        startSection.style.display = "none";

        setStoryLine(newStory);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const chooseOption = (scene) =>{
    get(child(dbRef, scene)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const newStory = (
          <div id="storyline-container">
            <div id="game-graphic" className="mt-3">
              <img src={snapshot.val().image} 
                width="400" height="400"
              />
            </div>

            <div className="text-light mt-3" id="game-description">
              <span id="description-control">
                {snapshot.val().description} 
              </span>
            </div>

            <div id="decision-section" className="text-center">
              <button className="btn btn-primary game-option" id="option1" onClick={() => chooseOption(snapshot.val().option1Action)}>{snapshot.val().option1} </button>
              <button className="btn btn-info game-option" id="option2" onClick={() => chooseOption(snapshot.val().option2Action)}>{snapshot.val().option2} </button>
            </div>

          </div>
        )

        setStoryLine(newStory);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {

  });

  return (
    <div id="game-container">
      <div className="text-center">
        <div className="game-starting-section" id="start-section">
          <div className="text-light" id="starting-text-display">

            <div id="game-title-section">
              <span className="font-weight-bold" id="game-title">The Investigator</span>
              
              <div className="text-center mt-3">
                <button className="btn btn-success" id="start-btn" onClick={startGame}>Start Game</button>
              </div>
            </div>

          </div>
        </div>

        {storyLine}

      </div>
    </div>
  );
}

export default App;
