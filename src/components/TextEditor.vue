<template>
        <div>
            <router-link :to="`${$route.path}/print`">Printable View</router-link>
            <input class="font-medium leading-tight text-4xl mt-0 mb-2 text-center text-blue-600 border border-sky-500 w-full" 
                type="text" v-model=docTitle @change="saveTitle">
            <ckeditor class="h-89% unreset" 
                :editor="editor" 
                v-model="editorData" 
                :config="editorConfig"  
                @ready="onReady"></ckeditor>
        </div>
</template>

<script setup>
/* eslint-disable */
    import Editor from 'ckeditor5-custom-build'

    import {ref} from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import {db, auth, storage } from "../firebaseConfig";
    import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
    import { ref as fsref, deleteObject } from "firebase/storage";

    import {uploader} from './UploadAdapterBucket.vue';
    import imageRemoveEvent from "../plugins/ImageRemoveEvent";

    let editor = Editor
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        extraPlugins: [uploader],
        autosave: {
            waitingTime: 1000, //in ms
            save( editor ) {
                updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc), {
                    title: docTitle.value,
                    data: editor.getData(),
                    timestamp: Timestamp.fromDate(new Date())
                })
            }
        },
    }

    let docTitle = ref('Untitled')
    function saveTitle(){
        updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc), {
            title: docTitle.value,
            timestamp: Timestamp.fromDate(new Date())
         })
    }

    let onReady = ( editor ) => {
        // Insert the toolbar before the editable area.
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );

        //2nd arg is a callback, can use to remove img url from doc field
        new imageRemoveEvent(editor, removeImageCallback);

        //Called when image finishes uploading, only for file uploads
        const imageUploadEditing = editor.plugins.get( 'ImageUploadEditing' );
        // eslint-disable-next-line 
        imageUploadEditing.on( 'uploadComplete', ( evt, { data, imageElement } ) => {
                //add as field to doc
                console.log("Uploaded: " + data.urls.default)
        } );
    }

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/darkdown-44b5e.appspot.com/o/";
    function removeImageCallback(removedImagesSrc) {
        removedImagesSrc.forEach(imageUrl => {
            if (imageUrl.includes("firebasestorage")){
                let imagePath = imageUrl.replace(baseUrl,"");
                const indexOfEndPath = imagePath.indexOf("?");
                imagePath = imagePath.substring(0,indexOfEndPath);
                imagePath = imagePath.replace(/%2F/g,"/");
                imagePath = imagePath.replace(/%20/g," ");
                deleteObject(fsref(storage, imagePath)).catch((error) => {
                    console.log(error)
                })
            }
        })
    }

    const route = useRoute();
    const router = useRouter()
    getDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc)).then( (d) => {
        if (d.data()){
            docTitle.value = d.data().title
            editorData.value = d.data().data
        } else {
            router.push({ name: '404', replace: true })
        }
    })

</script>