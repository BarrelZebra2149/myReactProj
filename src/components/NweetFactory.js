import {dbService, storageService} from "../fbase";
import {useState} from "react";
import { v4 as uuidv4 } from "uuid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        if(nweet === "") { return; }
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        //you can use collection with where("a", "==", "value), or orderby("key", "asc");
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        event.preventDefault();
        const { target: {value } } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        //object destruction
        const { target: {files} } = event;
        const curFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setAttachment(result);
        }
        if(Boolean(curFile)) {
            reader.readAsDataURL(curFile);
        }
    }
    const onClearAttachment = () => setAttachment("");

    return (
    <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
            <input type="text" value={nweet} onChange={onChange}
               placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus}/>
        </label>
        <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0}}/>
        {attachment && (
            <div className="factoryForm__attachment">
                <img alt="preview img" src={attachment} style={{backgroundImage: attachment}}/>
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
        )}
    </form>
    );
};
export default NweetFactory;