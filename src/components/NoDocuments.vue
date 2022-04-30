<template>
  <div class="flex flex-col justify-center items-center h-1/2">
      <div class="m-10 text-5xl">
        No documents currently selected.
      </div>
      <button class="large-button" @click="addNote=true">
            Create a new document?
      </button>
  </div>
  <add-document-button v-show="addNote" :folder="'default'" @closeModal="addNote = false"/> 
</template>

<script setup>
  import {ref} from 'vue';
  import AddDocumentButton from '@/components/AddDocumentButton.vue';
  let addNote = ref(false);
  
</script>

<style>

</style>