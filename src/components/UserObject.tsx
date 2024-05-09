import { useEffect } from "react";
import { useAuthStore, useContentStore } from "../store";
import { addData, readUserData, deleteData } from "../features/database/firestore.ts";

function UserObject() {
    const uid = useAuthStore((state) => state.uid);
    const setUserData = useContentStore((state) => state.setUserData);
    const userData = useContentStore((state) => state.userData);


    const handleAddData = async () => {
        setUserData({ ...userData, uid: uid })
        uid && await addData("users", uid, { ...userData, uid: uid });

    };
    const handleDeleteData = async () => {
        uid && await deleteData("users", uid);
        setUserData({})
    };
    useEffect(() => {
        if (uid) {
            (async () => await getUserData(uid))()
        }
    }, [uid]);
    useEffect(() => {

    }, [])

    const getUserData = async (uid: string) => {
        const doc = await readUserData(uid);
        if (doc.exists()) {
            setUserData(doc.data());
        } else {
            setUserData((await import('../model/index.ts')).dummyPayload)
        }

    }
    if (!uid) return;
    return (<>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <button onClick={handleAddData}>add data</button>
        <button onClick={handleDeleteData}>delete data</button>
    </>);
}

export default UserObject;
