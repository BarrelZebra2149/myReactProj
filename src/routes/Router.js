import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "../components/Navigation";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj}/>} />
                        <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
