<template>
  <div>
  <h2 v-if="!editMode" @click="editMode=true"
    class="font-medium leading-tight text-4xl mt-0 mb-2"> 
    {{text}} 
  </h2>
  <input v-else  @blur="clickOut" 
    v-model="inputContent"
    class="font-medium leading-tight text-4xl mt-0 mb-2 text-center border border-sky-500 bg-[#c5d8d1]"/>
  <p v-if="this.inputContent.trim().length < 1" 
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
    role="alert">
    Invalid Title</p>
  </div>
</template>

<script>
export default {
  name: 'EditableHeader',
  props: {
    text: {default: "Untitled", String},
  },
  data: function() {
    return {
      editMode: false,
      inputContent: this.text
    }
  },
  methods: {
    clickOut: function() {
      if (this.inputContent != ""){
        this.editMode = false;
        this.$emit("edited", this.inputContent)
      }
    }
  }
}
</script>
