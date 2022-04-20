<template>
    <mobile-navbar class="mobile-nav-enable"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen border-4 ">
            <editable-header @edited="updateTitle"/>
            <ckeditor class="h-89%"
                :editor="editor" 
                v-model="editorData" 
                :config="editorConfig"  
                @ready="onReady"></ckeditor>
        </div>
    </div>
</template>

<script>
    import Editor from 'ckeditor5-custom-build'
    import EditableHeader from './EditableHeader.vue';
    import SidebarDesktop from './SidebarDesktop.vue';
    import MobileNavbar from './MobileNavbar.vue';

    Editor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );

    export default {
        components: { EditableHeader, SidebarDesktop, MobileNavbar },
        data() {
            return {
                editor: Editor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
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
            },
            updateTitle: function(newTitle) {
                console.log(newTitle);
            }
        }
    }
</script>