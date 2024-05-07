import { getStorage, ref , getDownloadURL} from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
export const storageRef = ref(storage,'seinfeld.mp3');

export function getAudio(path:string){
    return getDownloadURL(ref(storage,path))
}
