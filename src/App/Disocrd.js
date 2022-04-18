import robotImage from '../image/robot.png';
import './Discord.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCog, faMessage, faHashtag, faAtom, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

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
  const db = getDatabase();


const Discord = () => {
    const [isOpen, setIsOpen] = useState(false);
    const gotoGeneral = (e) => {
        localStorage.setItem("channels", JSON.stringify('channels'));
        sessionStorage.setItem('channel', JSON.stringify('channels'));        
    }
    const gotoTestChannel1 = (e) => {
        console.log(e.target)
    }
    window.onload = () => {
        const cookieBox = document.querySelector('.cookieBox');
        if(document.cookie.includes("Cookie=DiscordWebApp")){ // if cookie is set
            console.log("Cookie Set")
            setIsOpen(!isOpen + cookieBox.classList.remove('show'));
        }else{
            console.log("Cookie Not Set")
            setIsOpen(!isOpen + cookieBox.classList.add('show'));
        }    
        localStorage.setItem("message", null)
    }
    const AcceptCookie = () => { // function to accept cookie and set cookie
        const cookieBox = document.querySelector('.cookieBox');
        document.cookie = "Cookie=DiscordWebApp";
        setIsOpen(!isOpen + cookieBox.classList.remove('show'));
    }
    const sendMessage = () => { // function to send message
        const body = document.querySelector('.body');
        const mesageinput = document.getElementById('mesageinput');
        const message = mesageinput.value;
        const date = new Date();
        const time = date.getHours() + ":" + date.getMinutes();
        const postListRef = ref(db, '/database/discord/messages');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            // ...
            message: `${message}`,
            time: `${time}`,
        });
        const dbRef = ref(db, '/database/discord/messages');
        onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val().message;
            console.log(childData);
            // ...
            const messageDialogue = document.createElement('div');
            body.appendChild(messageDialogue);
            messageDialogue.innerHTML = `<div class="body">
            <div class="body_content">
                <div class="msg">
                    <div class="msg_text">
                        <p id='message_bot'>${childData}</span>.</p>
                    </div>
                    <div class="status"><i class="fa-solid fa-check"></i> ${time}</div>
                </div>
            </div>
        </div>`
        });
        }, {
        onlyOnce: false
        });
    }
    return (
        <>
        <div className="container">
            <div className="content">
                <div className="flex">
                    {/* flex each indevidual item */}
                    <div className="flex_content">
                        <div className="col-left">
                            <div className="img">
                                <img src={robotImage} alt="logo" />
                            </div>
                            <div className="col_tabs">
                                <div className="col_tab">
                                    <div className="icon">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    </div>
                                    <div className="col_text">
                                        <p>Schedule</p>
                                    </div>
                                </div>
                                <div className="col_tab">
                                    <div className="icon">
                                    <FontAwesomeIcon icon={faCog} />
                                    </div>
                                    <div className="col_text">
                                        <p>Settings</p>
                                    </div>
                                </div>
                                <div className="col_tab">
                                    <div className="icon">
                                    <FontAwesomeIcon icon={faMessage} />
                                    </div>
                                    <div className="col_text">
                                        <p>Chat</p>
                                    </div>
                                </div>
                                <div className="col_tab">
                                    <div className="icon">
                                    <FontAwesomeIcon icon={faAtom} />
                                    </div>
                                    <div className="col_text">
                                        <p>Updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-right">
                            <div className="SideName">Chat Server</div>
                            <div className="channels">
                                <h4>Channels</h4>
                                <div className="channel">
                                    <div className="channelName" id='general' onClick={gotoGeneral}>
                                       <FontAwesomeIcon icon={faHashtag} />
                                       <p>General</p>
                                    </div>
                                    <div className="channelName" id='test-channel1' onClick={gotoTestChannel1}>
                                       <FontAwesomeIcon icon={faHashtag} />
                                       <p>Test Channel {1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-middle">
                            <div className="header">
                                <div className="headerName">{"Chat Server"}</div>
                            </div>
                        <div className="body">
                            <div className="body_content">
                                <div className="message_body">
                                    <div className="msg">
                                        <div className="msg_text">
                                            <p id='message_bot'>Hello, I'm a bot created by <span>@Kiran</span>.</p>
                                        </div>
                                        <div className="status"><FontAwesomeIcon icon={faCheck} /> 2:00AM</div>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <div className="c8">
                                        <div className="messageInput">
                                            <input type="text" id='mesageinput' placeholder='Write a reply'/>
                                        </div>
                                        <div className="btn">
                                            <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane}/>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* cookie consent div */}
        <div className="cookieBox">
            <div className="cookieBox_content">
                <h2>Cookie Consent</h2>
                <div className="cookieBox_content_text">
                    <p>This website uses cookies to ensure you get the best experience on our website.</p>
                    <p>By continuing to use this website, you agree to our use of cookies.</p>
                </div>
                <div className="cookieBox_content_button">
                    <button onClick={AcceptCookie}>Accept</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default Discord