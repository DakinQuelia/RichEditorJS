/*****************************************
*	Editeur de texte
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import config from './config.js';
import buttons from './buttons.js';
import context from './context.js';
import Modal from '../lib/modal.js';
import Utils from '../lib/utils.js';

class Editor 
{
	/**
	*	Constructeur
	**/
    constructor()
    {
		// Les options par défaut
		this.options = config.options;

		// Les classes composant l'éditeur
		this.editor = document.querySelectorAll('.' + config.css.editor);
		this.toolbar = document.querySelectorAll('.' + config.css.toolbar);

		// Le sélecteur de polices / Le menu des polices
		this.fontselector = config.fontselector;
		this.fontdropdown = config.fontdropdown;

		// Les commandes par défaut
		this.commands = buttons;

		// Les liens du menu contextuel
		this.contextlinks = context;

		// Les commandes personnalisées
		this.customcommands = config.customcommands;

		// Le menu des modèles de message
		this.templatedropdown = config.templatedropdown;

		// Le rendu des liens du menu contextuel
		this.links = 
		{
			// Type : Lien
			link: (data) => 
			{
				// On crée la balise <li> 
				let li = document.createElement('li');

				// Si le lien est actif
				if (data.enabled === true)
				{
					li.classList.add(config.css.context.item);
				}
				else
				{
					li.classList.add(config.css.context.item, config.css.context.disabled);
				}

				// On crée la balise <a> 
				let link = document.createElement('a');
				link.classList.add(config.css.context.link);
				link.setAttribute('name', data.id);
				link.setAttribute('id', data.id);
				link.setAttribute('href', data.url);

				// Si on a défini une icône on l'ajoute
				if (data.icon === null || data.icon === "")
				{
					link.innerHTML = `${data.text}`;
				}
				else 
				{
					link.innerHTML = `<i class="fas ${data.icon}"></i> ${data.text}`;
				}
				
				// On injecte le lien dans la balise <li>
				li.appendChild(link);

				return li;
			},

			// Type : Action
			action: (data) => 
			{
				// On crée la balise <li> 
				let li = document.createElement('li');

				// Si le lien est actif
				if (data.enabled === true)
				{
					li.classList.add(config.css.context.item);
				}
				else
				{
					li.classList.add(config.css.context.item, config.css.context.disabled);
				}

				// On crée la balise <a> 
				let link = document.createElement('a');
				link.classList.add(config.css.context.link);
				link.setAttribute('name', data.id);
				link.setAttribute('id', data.id);
				
				// Si on a défini une icône on l'ajoute
				if (data.icon === null || data.icon === "")
				{
					link.innerHTML = `${data.text}`;
				}
				else 
				{
					link.innerHTML = `<i class="fas ${data.icon}"></i> ${data.text}`;
				}

				link.onclick = () => { data.action(); };

				// On injecte le lien dans la balise <li>
				li.appendChild(link);

				return li;
			},

			// Type : Séparateur
			separator: () => 
			{
				let separator = document.createElement('li');
				separator.classList.add(config.css.context.separator);

				return separator;
			}
		};

		// Le rendu des boutons de l'éditeur
		this.buttons = 
		{
			// Type : Bouton
			button: (data) => 
			{
				let button = document.createElement('button');

				// Si le bouton est désactivé, on lui ajoute une classe CSS
				if (data.enabled === false)
				{
					button.classList.add(config.css.buttons.disabled);
				}

				// Si le bouton n'a pas de classe définie
				if (typeof data.class !== "undefined")
				{
					button.classList.add('jsmodal');
				}

				button.setAttribute('name', data.key);
				button.setAttribute('id', data.key);
				button.setAttribute('type', data.type);
				button.setAttribute('data-title', data.title);
				button.innerHTML = `<i class="fas ${data.icon}"></i>`;
				button.onclick = () => 
				{ 
					if (typeof data.onclick === "function")
					{
						data.onclick();
					}
				};

				return button;
			},

			// Type : Fenêtre Modale
			modal: (data) => 
			{
				let button = document.createElement('button');

				// Si le bouton est désactivé, on lui ajoute une classe CSS
				if (data.enabled === false)
				{
					button.classList.add(config.css.buttons.disabled);
				}

				button.classList.add('jsmodal');

				button.setAttribute('name', data.key);
				button.setAttribute('id', data.key);
				button.setAttribute('type', data.type);
				button.setAttribute('data-title', data.title);
				button.setAttribute('data-href', `#${data.modal}`);
				button.innerHTML = `<i class="fas ${data.icon}"></i>`;
				button.onclick = (event) => 
				{ 
					if (typeof data.onclick === "function")
					{
						data.onclick(event);
					}
				};

				return button;
			},

			// Type : Personnalisé
			custom: (data) => 
			{
				let custom = document.createElement('button');

				// Si le bouton est désactivé, on lui ajoute une classe CSS
				if (data.enabled === false)
				{
					custom.classList.add(config.css.buttons.disabled);
				}

				custom.setAttribute('name', data.key);
				custom.setAttribute('id', data.key);
				custom.setAttribute('type', 'button');
				custom.setAttribute('data-title', data.title);
				custom.innerHTML = `${data.text}`;
				custom.onclick = () => 
				{ 
					if (typeof data.onclick === "function")
					{
						data.onclick();
					}
				};

				return custom;
			},
			
			// Type : Menu déroulant
			select: (data) => 
			{
				let dropdowndiv = document.createElement('div');
				let dropdown = document.createElement('select');

				dropdowndiv.classList.add(config.css.select);
				dropdown.setAttribute('name', data.key);
				dropdown.setAttribute('id', data.key);

				if (data && Array.isArray(data.items))
				{
					data.items.forEach((item) =>
					{	
						let option = document.createElement('option');
						option.innerHTML = item.title;
						option.setAttribute('value', item.value);
						dropdown.onchange = () => 
						{ 
							data.onclick(dropdown.value);
						};

						dropdown.appendChild(option);	
					});

					// On injecte le menu dans la div
					dropdowndiv.appendChild(dropdown);

					return dropdowndiv;
				}
			},

			// Type : Menu déroulant personnalisé
			dropdown: (data) =>
			{
				let dropdowndiv = document.createElement('div');
				let label = document.createElement('div');
				let dropdown = document.createElement('div');

				dropdowndiv.classList.add(config.css.customselect.select);
				label.classList.add('droplabel');
				dropdown.classList.add(config.css.customselect.menu);

				label.setAttribute('id', data.key);

				if (data && Array.isArray(data.items))
				{
					data.items.forEach((item, index) =>
					{	
						let option = document.createElement('span');

						if (item.type === 'novalue')
						{
							label.innerHTML = data.items[0].title;
							
							dropdowndiv.appendChild(label);
						}
						else if (item.type === 'separator')
						{
							let separator = document.createElement('div');
							separator.classList.add(config.css.customselect.divider);

							dropdown.appendChild(separator);
						}
						else
						{
							// On ajoute la classe CSS
							option.classList.add(config.css.customselect.item);

							// Si le bouton est désactivé, on lui ajoute une classe CSS
							if (item.enabled === false)
							{
								option.classList.add('disabled');
							}

							option.innerHTML = item.title;
							option.setAttribute('data-index', index);
							option.setAttribute('data-value', item.value);
							option.onclick = () => 
							{ 
								data.onclick(item.value);
							};

							dropdowndiv.appendChild(dropdown);
							dropdown.appendChild(option);
						}
					});

					// On injecte le menu dans la div
					dropdowndiv.appendChild(dropdown);
				
					return dropdowndiv;
				}
			},

			// Type : Séparateur
			separator: ()  => 
			{
				let separator = document.createElement('span');
				separator.classList.add(config.css.buttons.separator);

				return separator;
			}
		};
	}
	
	/**
	*	Initialisation
	**/
	Init()
	{
		// On annule tout l'éditeur sur Internet Explorer
		if (this.IsIE())
		{
			console.error(`L'éditeur ne supporte pas Internet Explorer. Veuillez utiliser un navigateur moderne tel que : Chrome / Firefox / Edge / Safari !`);

			return;
		}

		const helpinfo = document.querySelectorAll('.help');

		// On exécute le système des modales
		Modal.Init();

		// Le rendu de l'éditeur
		this.Render();

		// On définit la zone où récupérer le contenu
		let savedtext = document.querySelector('.' + config.css.textarea);

		// On vérifie que l'éditeur doit convertir toutes les textareas
		if (this.options.convertalltextarea)
		{
			this.ConvertTextarea();
		}

		// Si le menu contextuel est activé alors on l'exécute
		if (this.options.contextualenabled)
		{
			this.ContextualMenu();
		}

		// On récupère le contenu sauvegardé
		this.GetSaveContent();

		// Si la zone de texte à sauvegarder existe alors on ajoute l'évènement
		if (savedtext !== null)
		{
			// Sauvegarder le texte
			savedtext.addEventListener('input', () => 
			{
				this.AutoSave(savedtext.textContent);
			}); 
		}

		/**
		*   On active nos champs de type numérique personnalisés.
		**/
		this.CustomSpinner();

		/** 
		* 	On active le menu personnalisé
		**/
		this.CustomSelect();

		/**
   	 	*   On affiche l'infobulle
    	**/
		if (helpinfo !== null)
		{
			// On boucle chaque infobulle d'aide
			helpinfo.forEach(hi => 
			{
				// Si l'attribut data-tooltip est vide alors on n'affiche pas l'infobulle
				if (hi.getAttribute('data-tooltip') === null)
				{
					return;
				}
	 
				// On applique la méthode Tooltip
				hi.addEventListener('mouseover', function() { Utils.Tooltip(this, hi.getAttribute('data-tooltip')); });
			});
		}
	}

	/**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Internet Explorer 
	**/
	IsIE() 
	{
		let userAgent = navigator.userAgent;
		
		return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
	}

	/**
	* 	Permet de récupérer la liste des commandes.
	**/
	GetCMDS()
	{
		return this.commands;
	}

	/**
	* 	Permet d'ajouter de nouveaux boutons à l'éditeur.
	* 	@param {object} command 
	**/
	AddCMD(command)
	{
		return this.customcommands.push({ key: command.key, icon: command.icon, type: command.type, onclick: () => { this.Action(command.action); } });
	}

	/**
	* 	Permet d'ajouter des modèles de message dans un tableau.
	* 	@param {object} tpl 
	**/
	AddTemplateMSG(tpl)
	{
		return this.templatedropdow.push({ id: tpl.id, title: tpl.title, value: tpl.value });
	}

	/**
	* 	Permet de créer les boutons de l'éditeur.
	* 	@param {object} data 
	**/
	CreateButton(data)
	{
		if (typeof this.buttons[data.type] !== "undefined")
		{
			return this.buttons[data.type](data);
		}
	}

	/**
	*	Permet de convertir toutes les balises 'textarea' en div. 
	**/
	ConvertTextarea(contentbox = null)
	{
		// On récupère toutes les textareas de la page
		let textareas = document.querySelectorAll('textarea');

		// On boucle toutes les textareas
		textareas.forEach(t => 
		{
			// On crée un nouvel éditeur
			let neweditor = document.createElement('div');
			let newtoolbar = document.createElement('div');
			let newfooter = document.createElement('div');

			neweditor.classList.add(config.css.editor);
			newtoolbar.classList.add(config.css.toolbar);
			newfooter.classList.add('footer');

			// On injecte les boutons dans la barre
			this.RenderButtons(newtoolbar);
				
			// On crée la nouvelle zone de contenu
			let newtextarea = document.createElement('div');
			newtextarea.classList.add('textarea');
			newtextarea.setAttribute('name', t.name);
			newtextarea.setAttribute('id', t.id);
			newtextarea.setAttribute('contenteditable', "true");

			// On supprime la balise textarea
			document.body.removeChild(t);

			// On injecte les classes
			neweditor.append(newtoolbar);
			neweditor.append(newtextarea);
			neweditor.append(newfooter);

			// On ajoute le nouvel éditeur à la page
			if (contentbox === null || contentbox === "")
			{
				document.body.appendChild(neweditor);
			}
			else
			{
				let box = document.querySelector('.' + contentbox);

				if (box === null || box === "")
				{
					return;
				}

				box.append(neweditor);
			}
		});
	}

	/**
	* 	Afficher le menu personnalisé
	**/
	CustomSelect()
	{
		let dropdown = document.querySelectorAll('.' + config.css.customselect.select);
		let dropmenu = document.querySelectorAll('.' + config.css.customselect.menu);
		let optionslist = document.querySelectorAll('.' + config.css.customselect.item);

		for (let i = 0; i < dropdown.length; i++)
		{
			// On ajoute un évènement clic
			window.addEventListener('click', (e) =>
			{
				// Empêche la propagation
				e.stopPropagation();

				if (dropdown[i].contains(e.target))
				{
					dropmenu[i].classList.toggle('active');
				}
				else
				{
					dropmenu[i].classList.remove('active');
				}
			});

			// On boucle les options
			optionslist.forEach(o => 
			{
				o.addEventListener('click', function()
				{
					let drop = o.parentNode.parentNode;
					let label = drop.querySelector('.droplabel');
					let value = o.getAttribute('data-value');
					
					label.setAttribute('data-value', value);
					label.innerHTML = o.textContent;    
				});
			});
		}
	}

	/**
    *   Cette méthode permet de créer un champ de type numérique personnalisé. 
    **/
	CustomSpinner()
	{
		let switchers = document.querySelectorAll('.spinbox');
 
		switchers.forEach(switcher => 
		{
			let spinup = switcher.querySelector('.spinbox-up');
			let spindown = switcher.querySelector('.spinbox-down');
			let input = switcher.querySelector('input');
 
			spinup.addEventListener('click', () => 
			{ 
				input.value = parseInt(input.value) + 1; 
			});
 
			spindown.addEventListener('click', () => 
			{ 
				if (input.value <= 0) { return; }
 
				input.value = parseInt(input.value) - 1; 
			});
		});
	}

	/**
	* 	Affiche le rendu de l'éditeur.
	**/
	Render()
	{
		// On crée l'éditeur
		let editor = document.createElement('div');
		editor.classList.add(config.css.editor);

		// Si la div editor n'existe pas
		if (!document.querySelector('.' + config.editorbox))
		{
			return;
		}

		// On vérifie qu'on a défini une zone pour l'éditeur
		if (config.editorbox === null || config.editorbox === '')
		{
			document.body.appendChild(editor);
		}
		else
		{
			let box = document.querySelector('.' + config.editorbox);
			box.appendChild(editor);
		}

		// On crée la barre d'outils
		let toolbar = document.createElement('div');
		toolbar.classList.add(config.css.toolbar);
		this.RenderButtons(toolbar);

		// On créer la zone de texte
		let textarea = document.createElement('div');
		textarea.classList.add('textarea');
		textarea.setAttribute('name', config.areaid);
		textarea.setAttribute('id', config.areaid);
		textarea.setAttribute('contenteditable', "true");
		textarea.setAttribute('placeholder', 'Votre texte');

		// Un pied de page à l'éditeur
		let footer = document.createElement('div');
		footer.classList.add('footer');

		// On insère la barre d'outils
		editor.append(toolbar);

		// On insère la zone de texte
		editor.append(textarea);

		// On insère le pied de page
		editor.append(footer);

		// On vérifie qu'on a activé le compteur
		if (this.options.counterenabled)
		{
			// La zone de comptage
			let countdiv = document.createElement('span');
			countdiv.setAttribute('id', 'counter');
			footer.append(countdiv);

			// On insère la zone de comptage de caractères
			let content = document.querySelector('.' + config.css.textarea);
			let counter = document.querySelector('#counter');

			// On retourne le résultat de comptage
			content.addEventListener('input', function(e) 
			{
				const target = e.target;
				const currentLength = target.textContent.length;

				if (currentLength > 0)
				{
					counter.innerHTML = `${currentLength} caractères`;
				}
				else
				{
					counter.innerHTML = `0 caractère`;
				}
			});
		}
	}

	/**
	*	Affiche le rendu des boutons. 
	**/
	RenderButtons(toolbar)
	{
		let commands = this.GetCMDS();
		let button;

		if (Array.isArray(commands))
		{
			commands.forEach((c, i) =>
			{	
				button = this.CreateButton(c);
				button.setAttribute('data-index', i);
				toolbar.appendChild(button);
			});
		}
	}

	/**
	* 	Cette méthode permet de sauvegarder automatiquement le contenu.
	*	@param {string} content
	**/
	AutoSave(content)
	{
		return localStorage.setItem("AUTOSAVE_EDITOR", content);
	}

	/**
	* 	Cette méthode permet de récupérer le contenu sauvegarder.
	**/
	GetSaveContent()
	{
		let savedtext = localStorage.getItem("AUTOSAVE_EDITOR");
		let content = document.querySelector('.' + config.css.textarea);

		if (!content)
		{
			return;
		}

		document.querySelector('.' + config.css.textarea).innerHTML = savedtext;
	}

	/**
	* 	Permet d'agrandir automatiquement la zone de texte.
	*	@param {HTMLElement} textarea
	**/
	AutoGrow(textarea)
	{
		textarea.classList.add('autogrow');
	}

	/**
	* 	Cette méthode permet de créer les liens du menu contextuel.
	* 	@param {object} data 
	**/
	CreateContextLink(data)
	{
		if (typeof this.links[data.type] !== "undefined")
		{
			return this.links[data.type](data);
		}
	}

	/**
	* 	Rendu des liens du menu contextuel.
	**/
	RenderContextLinks(container)
	{
		let commands = this.contextlinks;
		let button;

		if (Array.isArray(commands))
		{
			commands.forEach((c, i) =>
			{	
				button = this.CreateContextLink(c);
				button.setAttribute('data-index', i);
				container.appendChild(button);
			});
		}
	}

	/**
	*	Menu contextuel 
	**/
	ContextualMenu()
	{
		// On crée les éléments
		let editor = document.querySelector('.' + config.css.editor);
		let menu = document.querySelector('.' + config.css.contextmenu);
		let ul = document.createElement('ul');

		// Si la div de l'éditeur n'existe pas, alors on retourne.
		if (!editor)
		{
			return;
		}
		
		// On ajoute les classes CSS
		ul.classList.add(config.css.context.items);

		// Les liens
		this.RenderContextLinks(ul);

		//
		if (menu !== null)
		{
			// On ajoute les éléments dans leur container
			menu.appendChild(ul);

			// On déclenche le clic droit
			editor.addEventListener('contextmenu', (e) =>
			{
				// Empêche la propagation
				e.preventDefault();
				
				// Position du menu au clic droit
				document.getElementById('contextmenu').style.left = e.clientX + 'px';
				document.getElementById('contextmenu').style.top = e.clientY + 'px';
				document.getElementById('contextmenu').classList.add(config.css.context.active);
			});
			
			// On ferme le menu contextuel lors d'un clic
			window.addEventListener('click', function(e)
			{
				// Empêche la propagation
				e.stopPropagation();
				
				document.getElementById('contextmenu').classList.remove(config.css.context.active);
			});
		}
	}

	/**
	* 	Cette méthode permet de sélectionner un texte.
	* 	@param {string} textbefore 
	* 	@param {string} textafter 
	**/
	GetSelection(textbefore, textafter)
	{
		if (window.getSelection) 
		{
			let sel = window.getSelection();

			if (sel.rangeCount > 0) 
			{
				let range = sel.getRangeAt(0);
				let startNode = range.startContainer, startOffset = range.startOffset;
				let boundaryRange = range.cloneRange();
				let startTextNode = document.createTextNode(textbefore);
				let endTextNode = document.createTextNode(textafter);
				
				boundaryRange.collapse(false);
				boundaryRange.insertNode(endTextNode);
				boundaryRange.setStart(startNode, startOffset);
				boundaryRange.collapse(true);
				boundaryRange.insertNode(startTextNode);
				
				// On resélectionne le texte original
				range.setStartAfter(startTextNode);
				range.setEndBefore(endTextNode);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}

	/**
	* 	Cette méthode permet de convertir le html en BBCode.
	* 	@param {string} html 
	**/
	ConvertHTMLToBBCode()
	{
		throw new Error("Cette fonctionnalité n'a pas encore été implémentée.");
	}

	/**
	* 	Cette méthode permet d'insérer du texte dans la zone de texte.
	* 	@param {string} text 
	**/
	static InsertText(text)
	{
		document.querySelector('.textarea').innerHTML = text;
	}

	/**
	* 	Cette méthode permet d'ouvrir une fenêtre modale.
	*	@param {object} event
	*	@param {object} data
	**/
	static OpenWindow(event, data)
	{
		// Si l'évènement n'est pas défini, on retourne.
		if (typeof event === "undefined")
		{
			return false;
		}

		// Si la fenêtre n'existe pas, on la crée.
		if (typeof Modal.modal === "undefined")
		{
			return Modal.CreateModal(data.id, data.title, data.footer, data.content);
		}

		// Si on ne définit pas d'objet data, on lui donne une valeur nulle.
		if (data === null)
		{
			data = null;
		}

		// Si la fenêtre existe, on l'ouvre.
		Modal.OpenModal(event);

		return true;
	}

	/**
	*	Cette méthode permet de voir le code source du contenu. 
	**/
	static ViewSource()
	{

	}

	/**
	* 	Cette méthode permet d'insérer des BBCodes dans la zone de texte.
	* 	@param {string} bbcode 
	*	@param {object} args
	**/
	static BBCode(bbcode, args = null)
	{
		let bbcodetag;

		if (args === null || args === "")
		{
			bbcodetag = this.prototype.GetSelection(`[${bbcode}]`, `[/${bbcode}]`);
		}
		else
		{
			bbcodetag = this.prototype.GetSelection(`[${bbcode} ${args}]`, `[/${bbcode}]`);
		}

		return bbcodetag;
	}

	/**
	* 	Cette méthode permet d'insérer un BBCode sans balise de fermeture. 
	* 	@param {string} bbcode 
	**/
	static BBCodeSingle(bbcode)
	{
		return this.prototype.GetSelection(`[${bbcode}]`, ``);
	}

	/**
	*  	Cette méthode permet de sélectionner un style de titre.
	* 	@param {object} heading 
	**/
	static HeadingStyle(heading)
	{
		this.Action('formatBlock', { value: heading });
	}

	/**
	*	Cette méthode permet de sélectionner la police de caractère
	*	@param {object} font 
	**/
	static SelectFont(font)
	{
		this.Action('fontName', { value: font });
	}

	/**
	* 	Cette méthode permet de sélectionner la taille de la police de caractère
	* 	@param {object} fontsize 
	**/
	static SelectFontSize(fontsize)
	{
		this.Action('fontSize', { value: 1 });

		Array.from(document.querySelectorAll(config.fontselector)).forEach(f => { f.style.fontSize = fontsize; f.removeAttribute('size'); });
	}

	/**
	* 	Cette méthode permet d'effectuer une action sur le bouton.
	*	@param {string} command 
	* 	@param {object} args 
	*	@param {boolean} ui
	**/
	static Action(command, args, ui = false)
	{
		// On vérifie si la commande est supportée
		if (!document.queryCommandSupported(command))
		{
			console.log("execCommand(“" + command + "”) n'est pas supporté dans votre navigateur !");

			return;
		}

		// Si aucun argument n'a été défini alors on définit à null.
		if (!args)
		{
			args = {};
			args.value = null;
		}

		// Si aucune valeur n'est définie alors on met à null.
		if (typeof args.value === "undefined")
		{
			args.value = null;
		}

		// On exécute la commande
		document.execCommand(command, ui, args.value);
	}

	/**
	* 	Cette méthode retourne les actions de la fenêtre modale.
	**/
	static ModalAction()
	{

	}

	/**
	*	Cette méthode permet de mettre l'éditeur en plein écran.
	**/
	static FullScreen()
	{
		let editor = document.querySelector('.' + config.css.editor);

		if (!document.fullscreenElement) 
		{
			editor.requestFullscreen();
		} 
		else 
		{
			if (document.exitFullscreen) 
			{
				document.exitFullscreen();
			}
		}
	}

	/**
	*	A propos de l'éditeur 
	*	@param {object} event
	**/
	static About(event)
	{
		this.OpenWindow(event);
	}

	/**
	* 	Cette fenêtre modale permet d'insérer des balises pour coloriser le texte.
	* 	@param {object} event 
	**/
	static ChoiceColor(event)
	{
		let textarea = document.querySelector('.textarea');
		let popup = document.querySelector(event.currentTarget.getAttribute('data-href'));
		let submitbtn = popup.querySelector('#choosecolor #btnsubmit');
		let pickers = popup.querySelectorAll('.picker-color');
		let resultdiv = popup.querySelector('.modal-footer .left');

		// Si on est bien dans la fenêtre
		if (this.OpenWindow(event))
		{
			pickers.forEach((picker, index) => 
			{
				picker.addEventListener('click', () =>
				{
					resultdiv.innerHTML = `<span class="picker-color" data-color="${picker.dataset.color}" style="background-color: ${picker.dataset.color}"></span`;
				});

				//const color = picker[index].dataset.color;

				submitbtn.addEventListener('click', () =>
				{
					//textarea.innerHTML = `<span style="color: ${picker.dataset.color}"></span`;
					//console.log(color);
					//console.log('Couleur : ' + picker.dataset.color + ' | Index : ' + index);
					//console.log(`<span style="color: ${picker[index].dataset.color}"></span`);
					//console.log(picker.dataset.color.replace(regexp, ''));

					this.Action('foreColor', { value: picker.dataset.color });
				});
			});
		}
	}

	/**
	* 	Cette fenêtre modale permet d'insérer un lien avec ou sans texte.
	* 	@param {object} event 
	**/
	static LinkPopup(event)
	{
		let textarea = document.querySelector('.textarea');
		let popup = document.querySelector(event.currentTarget.getAttribute('data-href'));
		let submitbtn = popup.querySelector('#createlink #btnsubmit');
		let error = popup.querySelector("#errorurl");
		let linkname = popup.querySelector('#linkname').value;
		let linkurl = popup.querySelector('#linkurl').value;
		let htmllink;
		
		// Si on est bien dans la fenêtre
		if (this.OpenWindow(event))
		{
			// Lorsque le formulaire est validé
			submitbtn.addEventListener('click', () =>
			{
				// On vérifie si on a défini un lien
				if (linkurl === "")
				{
					popup.querySelector('#linkurl').classList.add('is-invalid');
					error.style.display = "block";
				}
				else
				{
					popup.querySelector('#linkurl').classList.remove('is-invalid');
					error.style.display = "none";
				}

				// On vérifie si on a indiqué le nom du lien.
				if (linkname !== "")
				{
					htmllink = `<a href="${linkurl}">${linkname}</a>`;
				}
				else
				{
					htmllink = `<a href="${linkurl}">${linkurl}</a>`;
				}
				
				// On remplit la zone texte
				textarea.innerHTML += htmllink;
				
				// On vide les champs
				popup.querySelector('#linkname').value = "";
				popup.querySelector('#linkurl').value = "";

				// On ferme la fenêtre modale si l'url est indiquée.
				if (linkurl !== "")
				{
					// On ferme la modale
					Modal.CloseModal(event);
				}
			});
		}
	}

	/**
	* 	Cette fenêtre modale permet d'insérer une image dans le contenu.
	* 	@param {object} event 
	**/
	static ImagePopup()
	{
		return false;
	}

	/**
	*	Cette méthode permet de générer un tableau. 
	**/
	static GenerateTable(event)
	{
		// On affecte les saisies à des variables pour plus de facilité
		const popup = document.querySelector(event.currentTarget.getAttribute('data-href'));
		const resetbtn = popup.querySelector('form#createtable #btnreset');
		const submitbtn = popup.querySelector('form#createtable #btnsubmit');
		const cellspacing = popup.querySelector('input#cellspacing').value;
		const cellpadding = popup.querySelector('input#cellpadding').value;
		const width = popup.querySelector('input#tablewidth').value;
		const border = popup.querySelector('input#tableborder').value;
		const lines = popup.querySelector('input#tablelines').value;
		const columns = popup.querySelector('input#tablecolumns').value;
		const textarea = document.querySelector('.textarea');
		let table;

		if (this.OpenWindow(event))
		{
			// Lorsque le formulaire est validé
			submitbtn.addEventListener('click', () =>
			{
				// Début de l'écriture du tableau dans le champ Result
				table = '<table ';
							
				// On affecte chaque variable à son attribut dans le tableau
				table += 'cellspacing="' + cellspacing + '" ';
				table += 'cellpadding="' + cellpadding + '" ';
				table += 'width="' + width + '" ';
				table += 'border="' + border + '">\n';

				console.log(parseInt(lines));

				// On creé chaque ligne
				for (let i = 0; i < lines; i++) 
				{
					// On crée la nouvelle ligne
					table += '\t<tr>\n';

					// On crée chaque colonne
					for (let j = 0; j < columns; j++) 
					{
						table += '\t\t<td>Texte ' + j + '</td>\n';
					}

					// On ferme la nouvelle ligne
					table += '\t</tr>\n';
				}

				// On ferme le tableau
				table += '</table>';
				
				// On envoie dans la zone de texte
				textarea.innerHTML += table;

				// On vide les champs
				/*popup.querySelector('input#cellspacing').value = 0;
				popup.querySelector('input#cellpadding').value = 0;
				popup.querySelector('input#tablewidth').value = 0;
				popup.querySelector('input#tableborder').value = 0;
				popup.querySelector('input#tablelines').value = 0;
				popup.querySelector('input#tablecolumns').value = 0;*/

				// On ferme la fenêtre modale
				if (submitbtn && (lines !== 0 || columns !== 0))
				{
					// On ferme la modale
					Modal.CloseModal(event);
				}
			});
		
			// Lorsqu'on clique sur "Effacer"
			resetbtn.addEventListener('click', () =>
			{
				// On vide les champs
				popup.querySelector('input#cellspacing').value = 0;
				popup.querySelector('input#cellpadding').value = 0;
				popup.querySelector('input#tablewidth').value = 0;
				popup.querySelector('input#tableborder').value = 0;
				popup.querySelector('input#tablelines').value = 0;
				popup.querySelector('input#tablecolumns').value = 0;
			});
		}
	}

	/**
	* 	Cette méthode permet de copier le contenu via le menu contextuel.
	**/
	static ContextCopy()
	{
		this.Action('copy');
	}
}

export default Editor;