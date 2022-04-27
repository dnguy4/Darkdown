<template>
<div>
    <div class="sm:col-start-2">
        <span class="font-medium leading-tight text-4xl mt-0 mb-2 text-center text-blue-600 w-full" 
            type="text">{{docTitle}}</span>
        <ckeditor class="h-89% unreset"
            :editor="editor" 
            v-model="editorData" 
            :config="editorConfig"  
            @ready="onReady"></ckeditor>
    </div>
</div>
</template>

<script setup>
    import Editor from 'ckeditor5-custom-build'
    import {ref} from 'vue'
    import {db, auth } from "../firebaseConfig";
    import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

    let editor = Editor
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        autosave: {
            waitingTime: 2000, //in ms
            save(  ) {
                setTimeout(function() { 
                    window.print(); 
                }, 0);
            }
        }
    }
    let docTitle = ref('Untitled')
    let texteditor = ref('null');

    let onReady = ( editor ) => {
        editor.enableReadOnlyMode('printable-lock');
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