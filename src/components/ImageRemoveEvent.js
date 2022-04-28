/**
 * Modified from https://github.com/shibbirweb/ckeditor5-image-remove-event-callback-plugin
 * original_author: MD. Shibbir Ahmed <shibbirweb@gmail.com> (http://shibbir.me/)
 *
 */
import { storage } from "@/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

 export default class ImageRemoveEvent {

    constructor(editor, configuration) {
        this.editor = editor
        this.configuration = configuration
        this.callback  = this.configuration
        this.emitCallback()
    }

    emitCallback() {
        const editor = this.editor
        let model = editor.model

        model.document.on('change:data', (event) => {
            const differ = event.source.differ

            // if no difference
            if (differ.isEmpty) {
                return;
            }

            const changes = differ.getChanges({
                includeChangesInGraveyard: true
            });

            if (changes.length === 0) {
                return;
            }

            let hasNoImageRemoved = true

            // check any image remove or not
            for (let i = 0; i < changes.length; i++){
                const change = changes[i]
                // if image remove exists
                if (change && change.type === 'remove' && (change.name === 'image' || change.name === 'imageInline')) {
                    hasNoImageRemoved = false
                    break
                }
            }

            // if not image remove stop execution
            if (hasNoImageRemoved) {
                return;
            }

            // get removed nodes
            const removedNodes = changes.filter(change => (change.type === 'insert' && (change.name === 'image' || change.name === 'imageInline')))

            // removed images src
            const removedImagesSrc = [];
            // removed image nodes
            const removedImageNodes = []

            removedNodes.forEach(node => {
                const removedNode = node.position.nodeAfter
                removedImageNodes.push(removedNode)
                removedImagesSrc.push(removedNode.getAttribute('src'))
            })

            const baseUrl = "https://firebasestorage.googleapis.com/v0/b/darkdown-44b5e.appspot.com/o/";
            //console.log(removedImagesSrc, removedImageNodes)
            removedImagesSrc.forEach(imageUrl => {
                if (imageUrl.includes("firebasestorage")){
                    let imagePath = imageUrl.replace(baseUrl,"");
                    const indexOfEndPath = imagePath.indexOf("?");
                    imagePath = imagePath.substring(0,indexOfEndPath);
                    imagePath = imagePath.replace(/%2F/g,"/");
                    imagePath = imagePath.replace(/%20/g," ");
                    deleteObject(ref(storage, imagePath)).catch((error) => {
                        console.log(error)
                    })
                }
            })
            return this.callback(removedImagesSrc)
        })
    }
}