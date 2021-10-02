/*****************************************
*	Editeur de texte
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
var config = {
	editorbox				: 'editor-content',							// L'identifiant de la DIV qui contiendra l'éditeur
	areaid 					: 'textcontent',							// L'identifiant de la zone de texte
	fontselector 			: `font[size='1']`,							// Le sélecteur de polices / Le menu des polices
	storagename 			: 'AUTOSAVE_EDITOR',						// Le nom de la variable pour localStorage
	style 					: 'default',								// Le nom du style appliqué à l'éditeur : default / modern
	options 				: 											// Les options par défaut
	{
		enabled 			: true,										// -- Option : activer/désactiver l'éditeur
		contextualenabled 	: false,									// -- Option : activer/désactiver le menu contextuel
		counterenabled 		: true,										// -- Option : activer/désactiver le compteur de caractères
		bbcodeenabled 		: false,									// -- Option : activer/désactiver les BBCodes
		convertalltextarea 	: false,									// -- Option : activer/désactiver la conversion des textareas
		converthtmltobbcode : false,									// -- Option : activer/désactiver la conversion du HTML en BBCode
		autosave 			: true,										// -- Option : activer/désactiver l'auto-sauvegarde
	},
	css : 																// Les classes CSS utilisées dans l'éditeur
	{
		editor 				: 'editor',									// -- Classe : classe CSS de l'éditeur
		toolbar 			: 'toolbar',								// -- Classe : classe CSS de la barre d'outils
		contextmenu 		: 'context-menu',							// -- Classe : classe CSS du menu contextuel
		textarea 			: 'textarea',								// -- Classe : classe CSS de la zone de texte
		autogrow 			: 'autogrow',								// -- Classe : classe CSS d'auto-agrandissement de la zone
		select				: 'dropdown-menu',							// -- Classe : classe CSS pour les balises <select>
		buttons 			: 											// -- Classe : classes CSS des boutons
		{
			disabled		: 'disabled',								// -- Classe : classe CSS du bouton désactivé
			separator		: 'separator'								// -- Classe : classe CSS de séparation des boutons
		},
		modal 				: 											// -- Classe : classes CSS des fenêtres modales
		{
			global			: 'modal',									// -- Classe : classe CSS globale de la fenêtre modale
			header 			: 'header',									// -- Classe : classe CSS de l'en-tête de la fenêtre modale
			footer			: 'footer',									// -- Classe : classe CSS du pied de page de la fenêtre modale
			content			: 'content',								// -- Classe : classe CSS du contenu de la fenêtre modale
		},
		context				: 											// -- Classe : classes CSS du menu contextuel
		{	
			active 			: 'show',									// -- Classe : classe CSS qui active le menu contextuel						
			items 			: 'context-items',							// -- Classe : classe CSS de la balise <ul>	du menu contextuel				
			item			: 'context-item',							// -- Classe : classe CSS de la balise <li> du menu contextuel
			disabled		: 'disabled',								// -- Classe : classe CSS de la balise désactivée <li>
			link			: 'context-link',							// -- Classe : classe CSS de la balise <a> du menu contextuel
			separator		: 'divider',								// -- Classe : classe CSS de séparation de la balise <li>
		},
		customselect: {
			select			: 'dropselect',								// -- Classe : classe CSS pour le menu déroulant personnalisé
			menu 			: 'dropmenu',								// -- Classe : classe CSS pour le menu des options			
			active 			: 'active',									// -- Classe : classe CSS pour activer le menu 
			label			: 'label',									// -- Classe : classe CSS pour le label du menu déroulant
			item			: 'dropmenu-item',							// -- Classe : classe CSS pour chaque objet du menu déroulant
			divider			: 'divider',								// -- Classe : classe CSS de séparation des objets
		}
	},
	fontdropdown : 														// La liste des tailles de police
	[
		{ id: 'fonts', title: "Taille", enabled: true, type: 'novalue', value: 'taille' },				// -- Option : par défaut
		{ title: '8px', enabled: true, type: 'value', value: '8px' },									// -- Option : taille de 8px
		{ title: '16px', enabled: true, type: 'value', value: '16px' },									// -- Option : taille de 16px
		{ title: '24px', enabled: true, type: 'value', value: '24px' },									// -- Option : taille de 24px
		{ title: '32px', enabled: true, type: 'value', value: '32px' }									// -- Option : taille de 32px
	],
	headings : 															// La liste des différents niveaux de titre
	[
		{ id: 'headings', title: "Style", enabled: true, type: 'novalue', value: 'style' },				// -- Option : par défaut
		{ title: "Titre 1", enabled: true, type: 'value', value: 'h1' },								// -- Option : Titre de type H1
		{ title: "Titre 2", enabled: true, type: 'value', value: 'h2' },								// -- Option : Titre de type H2
		{ title: "Titre 3", enabled: true, type: 'value', value: 'h3' },								// -- Option : Titre de type H3
		{ title: "Titre 4", enabled: true, type: 'value', value: 'h4' },								// -- Option : Titre de type H4
		{ title: "Titre 5", enabled: true, type: 'value', value: 'h5' },								// -- Option : Titre de type H5
		{ title: "Titre 6", enabled: true, type: 'value', value: 'h6' }									// -- Option : Titre de type H6
	],
	customcommands 		: [],											// Les commandes personnalisées
	templatedropdown 	: [],											// Le menu des modèles de message
};

export default config;