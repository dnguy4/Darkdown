<template>
        <div>
            <!-- <editable-header @edited="updateTitle" :text="docTitle"/> -->
            <input class="font-medium leading-tight text-4xl mt-0 mb-2 text-center text-blue-600 border border-sky-500 w-full" type="text" v-model=docTitle>
            <ckeditor class="h-89% unreset"
                :editor="editor" 
                v-model="editorData" 
                :config="editorConfig"  
                @ready="onReady"></ckeditor>
        </div>
</template>

<script setup>
    import Editor from 'ckeditor5-custom-build'
    // import EditableHeader from './EditableHeader.vue';
    import {ref} from 'vue'
    import {db, auth } from "./../firebaseConfig";
    import { collection, doc, addDoc, setDoc, Timestamp, query, getDocs, orderBy, limit } from "firebase/firestore";

    import {uploader} from './UploadAdapterBucket.vue';
    import imageRemoveEvent from "./ImageRemoveEvent";

    // IMPORTANT!!!
    const userExists = query(collection(db, "users"));
    getDocs(userExists).then((data) => {
        var found = false;
        data.forEach((d) => {
            if(d.id == auth.currentUser.uid){
                found = true;
            }
        });
        if(!found){
            // if user info is not on database, then add user default data
            const folders_ = ['default'];
            setDoc(doc(db, "users", auth.currentUser.uid), {
                folders : folders_,
            });
        }
    });

    let editor = Editor
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        extraPlugins: [uploader],
        autosave: {
            waitingTime: 2000, //in ms
            save( editor ) {
                console.log("saved")
                // if (docTitle.value != "Untitled"){
                //     console.log("do firebase call")
                //     addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
                //         title: docTitle.value,
                //         data: editor.getData(),
                //         timestamp: Timestamp.fromDate(new Date())
                //         });
                // }
                console.log( editor.getData() ); //replace console.log with firebase stuff
            }
        },
    }
    let docTitle = ref('Untitled')

    let onReady = ( editor ) => {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );

        //2nd arg is a callback, can use to remove img url from doc field
        new imageRemoveEvent(editor, (f) => {console.log(f)});

        //Called when image finishes uploading, only for file uploads
        const imageUploadEditing = editor.plugins.get( 'ImageUploadEditing' );
        // eslint-disable-next-line 
        imageUploadEditing.on( 'uploadComplete', ( evt, { data, imageElement } ) => {
                //add as field to doc
                console.log("Uploaded: " + data.urls.default)
        } );
    }
    
    const q = query(collection(db, "users", auth.currentUser.uid, "notes"), orderBy("timestamp", "desc"), limit(1));
    getDocs(q).then((data) => {
        data.forEach((d) => {
            docTitle.value = d.data().title
            editorData.value = d.data().data
        })
    })
</script>