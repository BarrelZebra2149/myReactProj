import { useEffect, useState} from "react"
import { dbService } from "../fbase";
import Nweet from "../components/Nweet"
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
    //[getter, setter]
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService.collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const nweetArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                setNweets(nweetArray);
            });
    }, []);
    // [] means this effect runs only once on mounting
    // [] is reference.

    return (
        <div className="container" style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
        }}>
            <NweetFactory userObj={userObj} />
            <div style={{marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id}
                           nweetObj={nweet}
                           isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home
