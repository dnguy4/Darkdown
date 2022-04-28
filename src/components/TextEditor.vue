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
    import Editor from 'ckeditor5-custom-build'

    import {ref} from 'vue'
    import {useRoute, useRouter, onBeforeRouteUpdate} from 'vue-router'
    import {db, auth } from "../firebaseConfig";
    import { doc, getDoc, updateDoc, Timestamp, arrayUnion } from "firebase/firestore";


    import {uploader} from './UploadAdapterBucket.vue';

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

        //Called when image finishes uploading, only for file uploads
        const imageUploadEditing = editor.plugins.get( 'ImageUploadEditing' );
        // eslint-disable-next-line 
        imageUploadEditing.on( 'uploadComplete', ( evt, { data, imageElement } ) => {
            
                console.log("Uploaded: " + data.urls.default)
                updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc), {
                    imageurls: arrayUnion( data.urls.default)
                });

        } );
    }


    const route = useRoute();
    const router = useRouter()

    onBeforeRouteUpdate(async (to, from) => {
        if (to.params.doc !== from.params.doc) {
            fetchDocumentData(to.params.doc)
        }
    })

    async function fetchDocumentData(docId){
        let d = await getDoc(doc(db, 'users', auth.currentUser.uid, 'notes', docId));
        if (d.data()){
            docTitle.value = d.data().title
            editorData.value = d.data().data
        } else {
            router.push({ name: '404', replace: true })
        }
    }

    //Load in inital data
    fetchDocumentData(route.params.doc);
</script>