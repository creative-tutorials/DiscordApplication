import image from "./image/chat.png";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googleImage from "./image/google-brands.svg";
import Discord from './App/Disocrd';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// initialize google auth
const provider = new GoogleAuthProvider();
// get auth instance
const auth = getAuth();

const handleLogin = () => {
  const container = document.querySelector('.container');
  const wrapper = document.querySelector('.wrapper');
  localStorage.setItem("isLogin", false)
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      // console.log(photoURL)
      localStorage.setItem("isLogin", true)
      if(localStorage.getItem("isLogin") === "true"){
        container.classList.add('show');
        wrapper.classList.add('hide');
      }else{
        container.classList.remove('show');
        wrapper.classList.remove('hide');
      }
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode)
      // ...
    });

}
const getData = () => {
  let spices = import('./app.json')
  spices.then(data => {
    console.log(data)
    // spices.then(let data = { set: "Hello", get: "World" })
  });
}
getData()
function App() {
  return (
    <div className="App">
      <Discord />
      <div className="wrapper">
        <div className="content">
          <div className="img">
            <img src={image} alt="logo" />
          </div>
          <div className="text">Welcome to ChatLab</div>
          <p>
            ChatLab is a web application that allows you to chat with your
            friends.
          </p>
          <div className="googleAuth">
            <button onClick={handleLogin}><img src={googleImage} alt="" /> Sign in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
