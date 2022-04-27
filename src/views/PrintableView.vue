<template>
<div>
    <div v-if=" docTitle != 'Untitled'" class="sm:col-start-2">
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
    import {useRoute, useRouter} from 'vue-router'
    import {db, auth } from "../firebaseConfig";
    import {doc, getDoc } from "firebase/firestore";

    let editor = Editor
    let editorData = ref('<p>Content of the editor.</p>')
    let editorConfig = {
        // autosave: {
        //     waitingTime: 2000, //in ms
        //     save(  ) {
                
        //     }
        // }
    }
    let docTitle = ref('Untitled')

    let onReady = ( editor ) => {
        editor.enableReadOnlyMode('printable-lock');
    }
    
    const route = useRoute();
    const router = useRouter()
    getDoc(doc(db, 'users', auth.currentUser.uid, 'notes', route.params.doc)).then( (d) => {
        if (d.data()){
            docTitle.value = d.data().title
            editorData.value = d.data().data
            setTimeout(function() { 
                    window.print(); 
            }, 2000);
        } else {
            router.push({ name: '404', replace: true })
        }
    })
</script>