import {useState} from "react";
import {authService} from "../fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: {name, value} } = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => { setNewAccount(!newAccount); };

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required
                       value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required
                       value={password} onChange={onChange} className="authInput"/>
                <button type="submit" className="authInput">{newAccount ? "Create Account" : "Log in"}</button>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                    {newAccount ? "Sign in" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm;