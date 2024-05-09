import { useEffect, useState } from "react";
import { useAuthStore, useContentStore } from "../store";
import { addData, readUserData, deleteData } from "../features/database/firestore.ts";

function UserObject() {
    const uid = useAuthStore((state) => state.uid);
    const setUserData = useContentStore((state) => state.setUserData);
    const userData = useContentStore((state) => state.userData);

    const [displayData, setDisplayData] = useState(false);
    const [systemMessage, setSystemMessage] = useState('');




    const handleAddData = async () => {
        setUserData({ ...userData, uid: uid })
        uid && await addData("users", uid, { ...userData, uid: uid });

        setSystemMessage('Added successfully!');

        setTimeout(() => {
            setSystemMessage('')
        }, 2000)


    };
    const handleDeleteData = async () => {
        uid && await deleteData("users", uid);
        setUserData({})
    };

    const getUserData = async (uid: string) => {
        const doc = await readUserData(uid);
        if (doc.exists()) setUserData(doc.data());
        else await loadMockData();
    }

    const loadMockData = async () => setUserData((await import('../model/index.ts')).dummyPayload);

    useEffect(() => {
        if (uid) {
            (async () => await getUserData(uid))()
        }
    }, [uid]);

    if (!uid) return;
    return (<>
        <strong >User Object</strong>
        <div>

            <button onClick={() => loadMockData()}>load mock data</button>
        <button onClick={handleAddData}>add data</button>
        <button onClick={handleDeleteData}>delete data</button>
            <br />
            <p>{systemMessage}</p>
        </div>
        <span onClick={() => setDisplayData(!displayData)}> {!displayData ? "expand" : "collapse"}</span>
        {displayData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </>);
}

export default UserObject;
