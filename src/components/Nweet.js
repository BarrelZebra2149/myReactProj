import {dbService, storageService} from "../fbase";
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNweNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete?');
        if(ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if(nweetObj.attachmentUrl !== "") {
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    };
    const toggleEditing = () => setEditing((prev => !prev));
    const onChange = (event) => {
        const { target : {value} } = event;
        setNweNweet(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({text: newNweet});
        setEditing(false);
    }

    return (
        <div className="nweet" style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
        }}>
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} value = {newNweet}
                               required placeholder="Edit your nweet" autoFocus className="formInput"/>
                        <input type="submit" value = "update" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} alt="attachment" width="50px" height="50px" />
                    )}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash}/></span>
                            <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt}/></span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Nweet;