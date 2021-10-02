/*****************************************
*	Editeur de texte
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import config from './config.js';
import Editor from './editor.js';

var buttons = [
    { key: 'about', enabled: true, class: 'jsmodal', icon: 'fa-info-circle', title: 'A propos', type: 'modal', modal: 'editorabout', onclick: (event) => { Editor.About(event); } },
    { key: 'fullscreen', enabled: true, icon: 'fa-expand-arrows-alt', title: 'Plein écran', type: 'button', onclick: () => { Editor.FullScreen(); } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { 
        key: 'heading', enabled: true, icon: 'fa-arrow', type: 'dropdown', items: config.headings, onclick: (val) => 
		{ 
            Editor.Action('formatBlock', { value: val });
        }
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { key: 'separator', type: 'separator' },
    { key: 'removeformat', enabled: true, icon: 'fa-remove-format', title: 'Supprimer le format', type: 'button', onclick: () => { Editor.Action('removeFormat'); } },
    { key: 'unlink', enabled: true, icon: 'fa-unlink', title: 'Supprimer le lien', type: 'button', onclick: () => { Editor.Action('unlink'); } },
    { key: 'separator', type: 'separator' },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { key: 'bold', enabled: true, icon: 'fa-bold', title: 'Mise en gras', type: 'button', onclick: () => { Editor.Action('bold'); } },
    { key: 'italic', enabled: true, icon: 'fa-italic', title: 'Mise en italique', type: 'button', onclick: () => { Editor.Action('italic'); } },
    { key: 'underline', enabled: true, icon: 'fa-underline', title: 'Souligner le texte', type: 'button', onclick: () => { Editor.Action('underline'); } },
    { key: 'strikethrough', enabled: true, icon: 'fa-strikethrough', title: 'Barrer le texte', type: 'button', onclick: () => { Editor.Action('strikethrough'); } },
    { key: 'separator', type: 'separator' },
    { key: 'left', enabled: true, icon: 'fa-align-left', title: 'Aligner à gauche', type: 'button', onclick: () => { Editor.Action('justifyLeft'); } },
    { key: 'center', enabled: true, icon: 'fa-align-center', title: 'Centrer le texte', type: 'button', onclick: () => { Editor.Action('justifyCenter'); } },
    { key: 'right', enabled: true, icon: 'fa-align-right', title: 'Aligner à droite', type: 'button', onclick: () => { Editor.Action('justifyRight'); } },
    { key: 'justify', enabled: true, icon: 'fa-align-justify', title: 'Justifier le texte', type: 'button', onclick: () => { Editor.Action('justifyFull'); } },
    { key: 'separator', type: 'separator' },
    { key: 'list', enabled: true, icon: 'fa-list-ul', title: 'Créer une liste non ordonnée', type: 'button', onclick: () => { Editor.Action('insertUnorderedList'); } },
    { key: 'listo', enabled: true, icon: 'fa-list-ol', title: 'Créer une liste ordonnée', type: 'button', onclick: () => { Editor.Action('insertOrderedList'); } },
    { key: 'separator', type: 'separator' },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { key: 'link', enabled: true, icon: 'fa-external-link-alt', title: 'Ajouter un lien', type: 'modal', modal: 'linkpop', onclick: (event) => {  Editor.LinkPopup(event); } },
    { key: 'picture', enabled: true, icon: 'fa-images', title: 'Ajouter une image', type: 'button', onclick: () => { Editor.Action('insertImage'); } },
    { key: 'color', enabled: true, icon: 'fa-tint', title: 'Mettre de la couleur', type: 'modal',  modal: 'textcolor', onclick: (event) => { Editor.ChoiceColor(event); } },
    { key: 'comment', enabled: true, icon: 'fa-comment-dots', title: 'Citation', type: 'button', onclick: () => { Editor.Action('formatBlock', { value: 'blockquote' }); } },
    { key: 'table', enabled: true, icon: 'fa-table', title: 'Ajouter un tableau', type: 'modal', modal: 'tablepop', onclick: (event) => {  Editor.GenerateTable(event); } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { key: 'separator', type: 'separator' },
    { 
        key: 'font-size', enabled: true, icon: 'fa-arrow', type: 'dropdown', items: config.fontdropdown, onclick: (val) => 
		{ 
            Editor.SelectFontSize(val);
        }
    },
    { 
        key: 'test', enabled: true, icon: 'fa-arrow', type: 'dropdown', items: [{ id:'test', title: 'Par défaut', enabled: true, type: 'novalue', value: 'Défaut' }, { title: 'Test', enabled: false, type: 'value', value: 'Un test' }, { title: 'Test 2', enabled: true, type: 'value', value: 'Deuxième texte' }, { title: 'Séparateur', type: 'separator' }, { title: 'Test 3', enabled: true, type: 'value', value: 'Troisième texte' }], onclick: (val) => 
		{ 
			Editor.Action('insertText', { value: val });
        }
    },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    { key: 'separator', type: 'separator' },
    { key: 'montest', enabled: true, text: 'BBCode',  title: 'Test BBCode', type: 'custom', onclick: () => { Editor.BBCode('bbcode'); } },
    { key: 'montest2', enabled: true, text: 'HR',  title: 'Ligne horizontale', type: 'custom', onclick: () => { Editor.BBCodeSingle('hr'); } },
    { key: 'montest3', enabled: true, text: 'BBCode Argument',  title: 'Test BBCode', type: 'custom', onclick: () => { Editor.BBCode('bbcode', 'test='); } },
    { key: 'montest4', enabled: true, text: 'BBCode Autre',  title: 'Test BBCode', type: 'custom', onclick: () => { Editor.BBCode('bbcode', 'test='); } },
    // ------------------------------------------------------------------------------------------------------------------------------------------------
];

export default buttons;