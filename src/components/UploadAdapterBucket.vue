<script>
import { storage, db, auth } from "@/firebaseConfig.js"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { collection, doc } from "firebase/firestore";

// https://dev.to/suraj975/ckeditor-image-upload-with-firebase-and-react-1pe8
// Author: Sands
export default class UploadAdapterBucket {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then((file) =>
            new Promise((resolve, reject) => {
                this.promiseReject = reject;
                let uuid = (doc(collection(db, "users", auth.currentUser.uid, "notes"))).id;
                uploadBytes(ref(storage, `users/${auth.currentUser.uid}/${uuid}`),file).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((downloadURL) => {
                        resolve({
                            urls: {default: downloadURL,}, 
                            customProp: "foo"
                        });
                }).catch((error)=>{
                    reject(error.message);
                })
            })
        );
    }

    abort() {
        if (this.promiseReject)
            this.promiseReject("Upload aborted by user")
    }
}

export const uploader = function ( editor )  {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new UploadAdapterBucket( loader );
    };
}
   
</script>