<<<<<<< HEAD
/*****************************************
*	Utilitaires
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
/* Variables générales */
let previousdiff = {};
let pageactivate = 1;

/* Constantes HTML */
const $countdown = document.querySelector('#countdown');
const $countele = {
    days:       $countdown ? $countdown.querySelector('#days') : '',
    hours:      $countdown ? $countdown.querySelector('#hours') : '',
    minutes:    $countdown ? $countdown.querySelector('#minutes') : '',
    seconds:    $countdown ? $countdown.querySelector('#seconds') : ''
};

/* Constantes générales */
const USERAGENT = navigator.userAgent;
const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const LAUNCHDATE = $countdown ? Date.parse($countdown.dataset.time) / 1000 : '';
const PAGES = document.querySelectorAll(".form-page") ? document.querySelectorAll(".form-page") : '';
const PAGE = document.querySelector(".form-page");
const NUMBER_PAGES = PAGES.length;

class Utils 
{
    /**
    *   Le constructeur
    **/
    constructor()
    {
        this.hilitedid = false;
    }

    /**
    *   Cette méthode permet d'afficher un message si l'utilisateur est sur Internet Explorer.
    **/
    AlertIE()
    {

    }

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Internet Explorer.
	**/
	IsIE() 
	{
		return USERAGENT.indexOf("MSIE") > -1 || USERAGENT.indexOf("Trident/") > -1;
	}

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Firefox.
	**/
    IsFirefox()
    {
		return USERAGENT.indexOf("Firefox") > -1;
    }

    /**
    *   Cette méthode permet d'ajouter un tooltip.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {callback} caller 
    *   @param {string} content 
    **/
    Tooltip(caller, content)
    {
        var current_tooltip = document.querySelector('#tooltip');
        var content_title = "AIDE";
        
        if (!current_tooltip)
        {
            var current_tooltip = document.createElement('div');
            current_tooltip.setAttribute('id', 'tooltip');
            current_tooltip.classList.add('tooltip');
            document.body.appendChild(current_tooltip);
        }
        
        current_tooltip.style.zIndex = 100;
        current_tooltip.style.position = 'absolute';
        
        if (content_title)
        {
            content = '<p class="header">' + content_title + '</p><p>' + content + '</p>';
        }
        else
        {
            content = '<p>' + content + '</p>'
        }
        
        current_tooltip.innerHTML= content;
        current_tooltip.style.visibility = 'visible';
        caller.onmousemove = this.MoveTooltip;
        caller.onmouseout = function()
        {
            current_tooltip.style.visibility = "hidden";
        };
        
        caller.title = '';
    }

    /**
    *   Cette fonction permet de déplacer l'infobulle.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {object} e 
    **/
    MoveTooltip(e)
    {
        let curX = e.pageX;
        let curY= e.pageY;
        let offsetxpoint=-60;
        let offsetypoint=20;
        let rightedge = window.innerWidth - e.clientX - offsetxpoint - 20;
        let bottomedge = window.innerHeight - e.clientY - offsetypoint - 20;
        let leftedge= (offsetxpoint < 0) ? offsetxpoint * (-1) : -1000;
        
        let current_tooltip = document.querySelector('#tooltip');
        
        if (rightedge < current_tooltip.offsetWidth)
        {
            current_tooltip.style.left = window.pageXOffset + e.clientX - current_tooltip.offsetWidth + "px";
        }    
        else if(curX < leftedge) 
        {
            current_tooltip.style.left = "5px";
        } 
        else 
        {
            current_tooltip.style.left = curX + offsetxpoint + "px";
        }
        
        if (bottomedge < current_tooltip.offsetHeight) 
        {
            current_tooltip.style.top = window.pageYOffset + e.clientY - current_tooltip.offsetHeight - offsetypoint + "px";
        }
        
        else 
        { 
            current_tooltip.style.top = curY + offsetypoint + "px";
        }
    }

    /**
    * 	Afficher le menu personnalisé
	**/
	CustomSelect()
	{
		let dropdown = document.querySelectorAll('.dropselect');
		let dropmenu = document.querySelectorAll('.dropmenu');
		let optionslist = document.querySelectorAll('.dropmenu-item');

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
				o.addEventListener('click', (e) =>
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
    *   Cette méthode permet de générer un mot de passe. 
    * 
    *   @param {int} pwdlength      Longueur du mot de passe généré
    **/
    PasswordGenerator(pwdlength)
    {
        return Array(pwdlength).fill("1234567890abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@&!").map((function(t) { return t[Math.floor(Math.random() * t.length)] })).join("");
    }

    /**
    *   Cette méthode permet d'afficher un compte à rebours.
    **/
    CountDown()
    {
        if ($countdown === null)
        {
            return;
        }

        const $this = this;
        const difference = LAUNCHDATE - Date.now() / 1000;
        const diff = {
            days:       Math.floor(difference / DAYS),
            hours:      Math.floor(difference % DAYS / HOURS),
            minutes:    Math.floor(difference % HOURS / MINUTES),
            seconds:    Math.floor(difference % MINUTES)
        };

        if (difference <= 0)
        {
            return;
        }

        $this.UpdateCountdownDOM(diff);

        window.setTimeout(() => { window.requestAnimationFrame(function() { $this.CountDown(); }) }, 1000);
    }

    /**
    *   Cette méthode permet de mettre à jour la strucutre HTML du compteur.
    *
    *   @param {{days: number, hours: numbers, minutes: number, seconds: number}} diff
    **/
    UpdateCountdownDOM(diff)
    {
        Object.keys(diff).forEach((key) => 
        {
            if (previousdiff[key] !== diff[key])
            {
                $countele[key].innerText = diff[key];
            }
        });

        previousdiff = diff;
    }

    /**
    *   Cette méthode permet de calculer le montant TVAC / TTC.
    * 
    *   @param {int} vat 
    *   @param {int} price 
    **/
    CalculateVAT(vat, price)
    {
        
    }

    /**
    *   Cette méthode sert à nettoyer les espaces blancs au début du code.
    * 
    *   @param {string} string
    **/
    TrimCode(string) 
    {
        let	str = string.replace(/^\s\s*/, '');
		let ws = /\s/;
        let i = str.length;
        
        while (ws.test(str.charAt(--i)));
        
	    return str.slice(0, i + 1);
    }

    /**
    *   Cette méthode permet de créer la balise Code avec le code.
    * 
    *   @param {string} string
    **/
    Code(string)
    {
        document.querySelector('.postbody code').innerHTML = `
            <div class="header">Code</div>
            <pre>${this.TrimCode(string)}</pre>
        `;
    }

    /**
    *   cette méthode supprime toutes les balises afin de s'assurer que la chaîne de caractère
    *   retournée ne contient pas de balises interdites (exemple : '<<bait/>switch/>')
    * 
    *   @param {element} input 
    *   @param {string} allowed 
    **/
    StripTags(input, allowed) 
    {
        let tagallowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        let commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        let before = input;
        let after = input;

        while(true) 
        {
            before = after;
            after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) =>
            {
                return tagallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
            
            if (before === after) 
            {
                return after;
            }
        }
    }

    /**
    *   Cette méthode permet d'afficher les erreurs en console.
    * 
    *   @param {object} error 
    *   @param {string} explicit 
    **/
    PrintError (error, explicit) 
    {
        console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
    }
}

=======
/*****************************************
*	Utilitaires
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
/* Variables générales */
let previousdiff = {};
let pageactivate = 1;

/* Constantes HTML */
const $countdown = document.querySelector('#countdown');
const $countele = {
    days:       $countdown ? $countdown.querySelector('#days') : '',
    hours:      $countdown ? $countdown.querySelector('#hours') : '',
    minutes:    $countdown ? $countdown.querySelector('#minutes') : '',
    seconds:    $countdown ? $countdown.querySelector('#seconds') : ''
};

/* Constantes générales */
const USERAGENT = navigator.userAgent;
const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const LAUNCHDATE = $countdown ? Date.parse($countdown.dataset.time) / 1000 : '';
const PAGES = document.querySelectorAll(".form-page") ? document.querySelectorAll(".form-page") : '';
const PAGE = document.querySelector(".form-page");
const NUMBER_PAGES = PAGES.length;

class Utils 
{
    /**
    *   Le constructeur
    **/
    constructor()
    {
        this.hilitedid = false;
    }

    /**
    *   Cette méthode permet d'afficher un message si l'utilisateur est sur Internet Explorer.
    **/
    AlertIE()
    {

    }

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Internet Explorer.
	**/
	IsIE() 
	{
		return USERAGENT.indexOf("MSIE") > -1 || USERAGENT.indexOf("Trident/") > -1;
	}

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Firefox.
	**/
    IsFirefox()
    {
		return USERAGENT.indexOf("Firefox") > -1;
    }

    /**
    *   Cette méthode permet d'ajouter un tooltip.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {callback} caller 
    *   @param {string} content 
    **/
    Tooltip(caller, content)
    {
        var current_tooltip = document.querySelector('#tooltip');
        var content_title = "AIDE";
        
        if (!current_tooltip)
        {
            var current_tooltip = document.createElement('div');
            current_tooltip.setAttribute('id', 'tooltip');
            current_tooltip.classList.add('tooltip');
            document.body.appendChild(current_tooltip);
        }
        
        current_tooltip.style.zIndex = 100;
        current_tooltip.style.position = 'absolute';
        
        if (content_title)
        {
            content = '<p class="header">' + content_title + '</p><p>' + content + '</p>';
        }
        else
        {
            content = '<p>' + content + '</p>'
        }
        
        current_tooltip.innerHTML= content;
        current_tooltip.style.visibility = 'visible';
        caller.onmousemove = this.MoveTooltip;
        caller.onmouseout = function()
        {
            current_tooltip.style.visibility = "hidden";
        };
        
        caller.title = '';
    }

    /**
    *   Cette fonction permet de déplacer l'infobulle.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {object} e 
    **/
    MoveTooltip(e)
    {
        let curX = e.pageX;
        let curY= e.pageY;
        let offsetxpoint=-60;
        let offsetypoint=20;
        let rightedge = window.innerWidth - e.clientX - offsetxpoint - 20;
        let bottomedge = window.innerHeight - e.clientY - offsetypoint - 20;
        let leftedge= (offsetxpoint < 0) ? offsetxpoint * (-1) : -1000;
        
        let current_tooltip = document.querySelector('#tooltip');
        
        if (rightedge < current_tooltip.offsetWidth)
        {
            current_tooltip.style.left = window.pageXOffset + e.clientX - current_tooltip.offsetWidth + "px";
        }    
        else if(curX < leftedge) 
        {
            current_tooltip.style.left = "5px";
        } 
        else 
        {
            current_tooltip.style.left = curX + offsetxpoint + "px";
        }
        
        if (bottomedge < current_tooltip.offsetHeight) 
        {
            current_tooltip.style.top = window.pageYOffset + e.clientY - current_tooltip.offsetHeight - offsetypoint + "px";
        }
        
        else 
        { 
            current_tooltip.style.top = curY + offsetypoint + "px";
        }
    }

    /**
    * 	Afficher le menu personnalisé
	**/
	CustomSelect()
	{
		let dropdown = document.querySelectorAll('.dropselect');
		let dropmenu = document.querySelectorAll('.dropmenu');
		let optionslist = document.querySelectorAll('.dropmenu-item');

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
				o.addEventListener('click', (e) =>
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
    *   Cette méthode permet de générer un mot de passe. 
    * 
    *   @param {int} pwdlength      Longueur du mot de passe généré
    **/
    PasswordGenerator(pwdlength)
    {
        return Array(pwdlength).fill("1234567890abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@&!").map((function(t) { return t[Math.floor(Math.random() * t.length)] })).join("");
    }

    /**
    *   Cette méthode permet d'afficher un compte à rebours.
    **/
    CountDown()
    {
        if ($countdown === null)
        {
            return;
        }

        const $this = this;
        const difference = LAUNCHDATE - Date.now() / 1000;
        const diff = {
            days:       Math.floor(difference / DAYS),
            hours:      Math.floor(difference % DAYS / HOURS),
            minutes:    Math.floor(difference % HOURS / MINUTES),
            seconds:    Math.floor(difference % MINUTES)
        };

        if (difference <= 0)
        {
            return;
        }

        $this.UpdateCountdownDOM(diff);

        window.setTimeout(() => { window.requestAnimationFrame(function() { $this.CountDown(); }) }, 1000);
    }

    /**
    *   Cette méthode permet de mettre à jour la strucutre HTML du compteur.
    *
    *   @param {{days: number, hours: numbers, minutes: number, seconds: number}} diff
    **/
    UpdateCountdownDOM(diff)
    {
        Object.keys(diff).forEach((key) => 
        {
            if (previousdiff[key] !== diff[key])
            {
                $countele[key].innerText = diff[key];
            }
        });

        previousdiff = diff;
    }

    /**
    *   Cette méthode permet de calculer le montant TVAC / TTC.
    * 
    *   @param {int} vat 
    *   @param {int} price 
    **/
    CalculateVAT(vat, price)
    {
        
    }

    /**
    *   Cette méthode sert à nettoyer les espaces blancs au début du code.
    * 
    *   @param {string} string
    **/
    TrimCode(string) 
    {
        let	str = string.replace(/^\s\s*/, '');
		let ws = /\s/;
        let i = str.length;
        
        while (ws.test(str.charAt(--i)));
        
	    return str.slice(0, i + 1);
    }

    /**
    *   Cette méthode permet de créer la balise Code avec le code.
    * 
    *   @param {string} string
    **/
    Code(string)
    {
        document.querySelector('.postbody code').innerHTML = `
            <div class="header">Code</div>
            <pre>${this.TrimCode(string)}</pre>
        `;
    }

    /**
    *   cette méthode supprime toutes les balises afin de s'assurer que la chaîne de caractère
    *   retournée ne contient pas de balises interdites (exemple : '<<bait/>switch/>')
    * 
    *   @param {element} input 
    *   @param {string} allowed 
    **/
    StripTags(input, allowed) 
    {
        let tagallowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        let commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        let before = input;
        let after = input;

        while(true) 
        {
            before = after;
            after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) =>
            {
                return tagallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
            
            if (before === after) 
            {
                return after;
            }
        }
    }

    /**
    *   Cette méthode permet d'afficher les erreurs en console.
    * 
    *   @param {object} error 
    *   @param {string} explicit 
    **/
    PrintError (error, explicit) 
    {
        console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
    }
}

>>>>>>> 1782344523dd73ab918ef419c89b3bd87bb478c6
export default new Utils();