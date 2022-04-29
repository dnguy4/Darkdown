<template>
<div>
    <div class="grid grid-cols-3 gap-4 items-center">
        <div class="sidebar-logout-button bg-gray-200">
            <span >Folder:</span>
             <select v-model="docCategory" class="ml-2 border-2 rounded" name="Category" id="category" @change="saveTitle">
                <option  v-for="folder in folders" :key="folder.id" :selected="docCategory === folder">
                    {{folder}}
                </option>
            </select>
        </div>
        <span class="text-center"> {{lastSaved}}</span>
        <router-link :to="`${$route.path}/print`" custom v-slot="{ navigate }">
            <button @click="navigate" role="link" class="sidebar-logout-button bg-gray-200">Open Printable View</button>
        </router-link>
    </div>

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
    import { doc, getDoc, updateDoc, Timestamp, arrayUnion, onSnapshot } from "firebase/firestore";


    import {uploader} from './UploadAdapterBucket.vue';

    let editor = Editor
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        extraPlugins: [uploader],
        autosave: {
            waitingTime: 1000, //in ms
            save( editor ) {
                let curTime = Timestamp.fromDate(new Date())
                updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc), {
                    title: docTitle.value,
                    data: editor.getData(),
                    timestamp: curTime,
                    folder: docCategory.value,
                }).then( () => {
                    lastSaved.value = "Last saved at " + curTime.toDate().toLocaleTimeString('en-US');
                })
            }
        },
    }

    let docTitle = ref('Untitled')
    function saveTitle(){
        let curTime = Timestamp.fromDate(new Date())
        updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc), {
            title: docTitle.value,
            timestamp: curTime,
            folder: docCategory.value
         }).then( () => {
            lastSaved.value = "Last saved at " + curTime.toDate().toLocaleTimeString('en-US');
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
        displayStatus(editor);
    }

    let lastSaved = ref("Loading...")

    function displayStatus( editor ) {
        const pendingActions = editor.plugins.get( 'PendingActions' );
        pendingActions.on( 'change:hasAny', ( evt, propertyName, newValue ) => {
            if ( newValue && lastSaved.value !== "Loading..." && lastSaved.value !== "") {
                lastSaved.value = "Saving..."
            } 
        } );
    }


    const route = useRoute();
    const router = useRouter()

    onBeforeRouteUpdate(async (to, from) => {
        if (lastSaved.value == "Saving..."){
            const answer = window.confirm('Do you really want to leave? You have unsaved changes!')
            if (!answer){
                router.push({ name: 'document', doc: from.params.doc, replace: true })
                return;
            }
        }
        if (to.params.doc !== from.params.doc) {
            lastSaved.value = "Loading..."
            fetchDocumentData(to.params.doc)
        }
    })

    let folders = ref([])
     onSnapshot(doc(db, "users", auth.currentUser.uid), (d) => {
      folders.value = d.data().folders;
    });

    let docCategory = ref("default")
    async function fetchDocumentData(docId){
        let d = await getDoc(doc(db, 'users', auth.currentUser.uid, 'notes', docId));
        if (d.data()){
            docTitle.value = d.data().title;
            editorData.value = d.data().data;
            docCategory.value = d.data().folder;
            lastSaved.value = "";
        } else {
            router.push({ name: '404', replace: true })
        }
    }

    //Load in inital data
    fetchDocumentData(route.params.doc);
</script>