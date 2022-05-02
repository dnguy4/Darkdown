export const indentTab = function( editor ) {
    editor.keystrokes.set( 'Tab', ( data, cancel ) => {
        const command = editor.commands.get( 'indentBlock' );

        if ( command.isEnabled ) {
            command.execute();
            cancel();
        }
    } );

    editor.keystrokes.set( 'Shift+Tab', ( data, cancel ) => {
        const command = editor.commands.get( 'outdentBlock' );

        if ( command.isEnabled ) {
            command.execute();
            cancel();
        }
    } );
}