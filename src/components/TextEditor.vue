<template>
  <div class="border-4 border-gray-600 h-screen overflow-auto">
    <!-- <div class="flex">
    <div class="hidden md:block md:basis-1/4 bg-gradient-to-r from-cyan-500 to-slate-50"></div>
    <div class="grow border-4 border-gray-50"> -->
    <ckeditor class="h-screen" 
        :editor="editor" 
        v-model="editorData" 
        :config="editorConfig"  
        @ready="onReady"></ckeditor>
        <!-- </div>
    </div> -->
  </div>
</template>

<script>
    import Editor from 'ckeditor5-custom-build'

    // Editor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );

    export default {
        data() {
            return {
                editor: Editor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor
                    autosave: {
                        waitingTime: 3000, //in ms
                        save( editor ) {
                            return console.log( editor.getData() ); //replace console.log with firebase stuff
                        }
                    },
                }
            };
        },
        methods: {
            onReady( editor )  {
                // Insert the toolbar before the editable area.
                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            }
        }
    }
</script>