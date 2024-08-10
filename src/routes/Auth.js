import { authService, firebaseInstance } from "./fbase";
import { useState } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"
import AuthForm from "../components/AuthForm";


const Auth = () => {
    const onSocialClick = async (event) => {
        const { target: {name} } = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    };

    return (
        <div className ="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{marginBottom:30}}/>
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}

export default Auth;