<template>
<div>
    <mobile-navbar class="mobile-nav-enable"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen border-4 border-gray-600">
            <!-- <editable-header @edited="updateTitle" :text="docTitle"/> -->
            <input class="font-medium leading-tight text-4xl mt-0 mb-2 text-center text-blue-600 border border-sky-500" type="text" v-model=docTitle>
            <ckeditor class="h-89%"
                :editor="editor" 
                v-model="editorData" 
                :config="editorConfig"  
                @ready="onReady"></ckeditor>
        </div>
    </div>
</div>
</template>

<script setup>
    import Editor from 'ckeditor5-custom-build'
    // import EditableHeader from './EditableHeader.vue';
    import SidebarDesktop from './SidebarDesktop.vue';
    import MobileNavbar from './MobileNavbar.vue';
    import {ref} from 'vue'
    import {db, auth } from "./../firebaseConfig";
    import { collection, addDoc, Timestamp, query, getDocs, orderBy, limit } from "firebase/firestore";
    // Editor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );

    let editor = Editor
    // let redit = ref('<p>Content of the editor.</p>')
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        autosave: {
            waitingTime: 2000, //in ms
            save( editor ) {
                console.log("saved")
                if (docTitle.value != "Untitled"){
                    console.log("do firebase call")
                    addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
                        title: docTitle.value,
                        data: editor.getData(),
                        timestamp: Timestamp.fromDate(new Date())
                        });
                }
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
    }

    
        const q = query(collection(db, "users", auth.currentUser.uid, "notes"), orderBy("timestamp", "desc"), limit(1));
        getDocs(q).then((data) => {
            data.forEach((d) => {
                console.log("here")
                console.log(d.data().data, d.data().title)
                docTitle.value = d.data().title
                editorData.value = d.data().data

        })})
</script>