import AppRouter from "../routes/index"
import { useState } from "react";
import { authService } from "../routes/fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    authService.onAuthStateChanged((user) => {
        if (user) {
            setUserObj({
                uid: user.uid,
                displayName: user.displayName,
                updateProfile: (args) => user.updateProfile(args)
            });
        } else {
            setUserObj(false);
        }
        setInit(true);
    }, []);
    const refershUser = () => {
        const user = authService.currentUser;
        setUserObj({
            uid: user.uid,
            displayName: user.displayName,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} refreshUser = {refershUser} userObj={userObj} /> : "initializing..."}
        </>
    )
}

export default App;
