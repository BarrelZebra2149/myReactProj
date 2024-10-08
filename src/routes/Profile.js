import { authService, dbService } from '../fbase';
import { useState} from "react";
import { useNavigate } from "react-router-dom"

const Profile = ({userObj, refreshUser}) =>  {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName});
            refreshUser();
        }
    };

    return (
        <div className="container" style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
        }}>
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text"
                       placeholder="Display name" value={newDisplayName}
                       autoFocus className="formInput"/>
                <input type="submit" value="Update" className="formBtn" style={{marginTop: 10}}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
}

export default Profile
