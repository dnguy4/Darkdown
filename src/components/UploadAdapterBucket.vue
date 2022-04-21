<script>
import { storage } from "@/firebaseConfig.js"
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

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
                //probably do images/uuid.png. Generate uuid via npm package?
                //otherwise dumb hack -> db.collection('name').doc().id. Generates a new id without a real new doc
                uploadBytes(ref(storage, 'images/mountains.jpg'),file).then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((downloadURL) => {
                        resolve({default: downloadURL,});
                }).catch((error)=>{
                    reject(error.message);
                })
            })
        );
    }
}

export const uploader = function ( editor )  {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new UploadAdapterBucket( loader );
    };
}
   
</script>