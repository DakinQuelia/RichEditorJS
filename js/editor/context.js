<<<<<<< HEAD
/*****************************************
*	Editeur de texte
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import config from './config.js';
import Editor from './editor.js';

var context = [
    { text: 'Copier', id: 'copy', type: 'action', enabled: true, icon: 'fa-copy', url: '', action: () => { Editor.ContextCopy() } },
    { text: 'Couper', id: 'cut', type: 'action', enabled: true, icon: 'fa-cut', url: '', action: () => { Editor.Action('cut') } },
    { text: 'Coller', id: 'paste', type: 'action', enabled: true, icon: 'fa-paste', url: '', action: () => { Editor.Action('paste') } },
    { text: 'Supprimer', id: 'delete', type: 'action', enabled: false, icon: 'fa-times', url: '', action: () => { Editor.Action('paste') } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    //{ text: 'Séparateur', id: 'separator', type: 'separator' },
    //{ text: 'A propos', id: 'about', type: 'link', enabled: true, icon: 'fa-info-circle', url: '', action: (event) => { Editor.About(event) } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
];

=======
/*****************************************
*	Editeur de texte
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import config from './config.js';
import Editor from './editor.js';

var context = [
    { text: 'Copier', id: 'copy', type: 'action', enabled: true, icon: 'fa-copy', url: '', action: () => { Editor.ContextCopy() } },
    { text: 'Couper', id: 'cut', type: 'action', enabled: true, icon: 'fa-cut', url: '', action: () => { Editor.Action('cut') } },
    { text: 'Coller', id: 'paste', type: 'action', enabled: true, icon: 'fa-paste', url: '', action: () => { Editor.Action('paste') } },
    { text: 'Supprimer', id: 'delete', type: 'action', enabled: false, icon: 'fa-times', url: '', action: () => { Editor.Action('paste') } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    //{ text: 'Séparateur', id: 'separator', type: 'separator' },
    //{ text: 'A propos', id: 'about', type: 'link', enabled: true, icon: 'fa-info-circle', url: '', action: (event) => { Editor.About(event) } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
];

>>>>>>> 1782344523dd73ab918ef419c89b3bd87bb478c6
export default context;