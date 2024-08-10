import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "../components/Navigation";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                <Routes path="/" element={
                    isLoggedIn ? (
                        <div style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Route exact path="/" element={<Home userObj={userObj}/>} />
                            <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                        </div>
                    ) : (
                        <Route path="/" element={<Auth />} />
                    )}></Routes>
            </Routes>
            {/*<Navigate from="*" to="/">*/}
        </Router>
    );
};

export default AppRouter;
