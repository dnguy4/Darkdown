<template>
        <div>
            <MakePDF :texteditor="texteditor" />
            <!-- <editable-header @edited="updateTitle" :text="docTitle"/> -->
            <input class="font-medium leading-tight text-4xl mt-0 mb-2 text-center text-blue-600 border border-sky-500 w-full" 
                type="text" v-model=docTitle>
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
    // import EditableHeader from './EditableHeader.vue';
    import MakePDF from './makePDF.vue';

    import {ref} from 'vue'
    import {db, auth } from "../firebaseConfig";
    import { collection, addDoc, Timestamp, query, getDocs, orderBy, limit } from "firebase/firestore";
    //import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

    import {uploader} from './UploadAdapterBucket.vue';
    import imageRemoveEvent from "../plugins/ImageRemoveEvent";

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
    let texteditor = ref('null');

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

        texteditor.value = editor;
    }

    const q = query(collection(db, "users", auth.currentUser.uid, "notes"), orderBy("timestamp", "desc"), limit(1));
    getDocs(q).then((data) => {
        data.forEach((d) => {
            docTitle.value = d.data().title
            editorData.value = d.data().data
        })
    })
</script>