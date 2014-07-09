
namespace("PXTree.AchtzehnKnoten", function(AK)
{
	AK.Game = function Game ()
	{
		this.parent = null;
		this.top = this;
		this.game = new Phaser.Game(
				AK.Config.Game.Width,
				AK.Config.Game.Height,
				Phaser.AUTO, '', null);

		this.currentLevel = null;
		this.currentSpotNr = null;
		this.enteringFrom = null;
		this.taskLog = null;
		this.stats = null;
		this.already_running = false;
		//console.log(easterTeggst);
	
	};
	
	on(AK.Game.prototype, function (def)
	{
		def.run = function run ()
		{
			this.game.state.add(AK.MainMenu.key, AK.MainMenu(this));
			this.game.state.add(AK.Play.key, AK.Play(this));
			this.game.state.add(AK.Credits.key, AK.Credits(this));
			this.game.state.add(AK.Intro.key, AK.Intro(this));
			this.game.state.add(AK.Endscreen.key, AK.Endscreen(this));
			this.startState(AK.MainMenu.key);
		};
		
		def.resetSaveData = function resetSaveData ()
		{
			localStorage.removeItem('Stats');
			localStorage.removeItem('taskLog');
			localStorage.removeItem('currentLevel');
			localStorage.removeItem('enteringFrom');
			this.loadSaveData();
		};

		def.storeSaveData = function storeSaveData ()
		{
			localStorage.setItem('currentLevel', this.currentLevel.toString());
			localStorage.setItem('enteringFrom', this.enteringFrom);
			localStorage.setItem('Stats',JSON.stringify(this.stats._values));
			localStorage.setItem('taskLog', JSON.stringify(this.taskLog.getSerializable()));
		};

		def.loadSaveData = function loadSaveData ()
		{
			this.currentLevel = parseInt(localStorage.getItem('currentLevel') || '0');
			this.currentSpotNr = 0;
			this.enteringFrom = localStorage.getItem('enteringFrom') || 'east';

			this.taskLog = localStorage.getItem('taskLog')
					? AK.TaskLog.fromSerializable(JSON.parse(localStorage.getItem('taskLog')))
					: on(AK.TaskLog(),
							function (taskLog) { taskLog.startCachingEventNames(AK.Config.Game.EventNameCacheSize); })

			this.stats = new AK.Stats(localStorage.getItem('Stats')
					? JSON.parse(localStorage.getItem('Stats'))
					: { player:
							{ name: "Cumberdale"
							, morale: 11
							, nationality: 'british'
							, gold: 20000
							, food: 200
							, crewCount: 31
							, strength: 5
							}
						, ship:
							{ speed: 0.2
							, crewCapacity: 52
							}
						}
					);

			this._setupStatisticsHandlers();
		};

		/**
		 * Wrapper for switching states, which makes it a little easier and cleaner,
		 * since it leaves out the clearing option and passes default values down.
		 * Clears world, but leaves texture cache be.
		 */
		def.startState = function (stateName /*, args... */)
		{
			var args = Array.prototype.slice.call(arguments, 1)
				;
			return this.game.state
					.start.apply(this.game.state, [stateName, true, false].concat(args));
		};

		/**
		 *
		 */
		def._setupStatisticsHandlers = function ()
		{
			this.stats.registerValueChangedHandler(function(statName, newValue)
			{
				var play = this.game.state.getCurrentState()
					;
				if (play instanceof AK.Play
						&& newValue <= 0
						&& endscreenStats[statName])
				{
					play.events.afterCurrentEvent(function()
					{
						this.startState('endscreen', true, statName);
					}, this)
				}
				
			}, this);
		};
		var endscreenStats =
					{ "player.strength": true
					, "player.crewCount": true
					, "player.food": true
					, "player.gold": true
					};
	}); //Game.prototype


	{ //funny console text, J4F
		var easterTeggst =
				'====================================== FELIX, TONI, ANDRE, GREGOR & AXEL PRÄSENTIEREN ================================================\n'+
				'                                                                                                                                      \n'+
				'                                                                             ##########    ##########   ########          #####       \n'+
				'                                                                            ############  ############  ########          #####       \n'+
				'                                                                            ############  ############  ########         ######       \n'+
				'      #####                                                                 ############  ############  ########         ######       \n'+
				'      ######   ###                                                          ####    ####  ####    ####     #####        #######       \n'+
				'      ######   ###                                                          ####    ####  ####    ####     #####        #######       \n'+
				'      ##  ##                                                                ####    ####  ####    ####     #####       ########       \n'+
				'      ##  ##                                                                ####   #####  ####    ####     #####       ########       \n'+
				'      ##  ##   ### ######  ######  ###### ##  ##########  ########  ###           ######  ####    ####     #####      #########       \n'+
				'      ##  ##   ############################## ########### ########  ###           #####   ####    ####     #####      #########       \n'+
				'      ##  ##   ######  ###################### ########### #### ###  ###         ######    ####    ####     #####      #########       \n'+
				'      ##  ##   ######  ######  ######  ###### ### ##  ### ##   ### ###          ######    ####    ####     #####     ##########       \n'+
				'      ##  ##   #######  # ###   # ###  ########## ####### ##    ######         #####      ####    ####     #####    ##### #####       \n'+
				'      ##  ##   ### #####  ###     ###  ########## ####### ##    ######        ######      ####    ####     #####    ####  #####       \n'+
				'      ##  ##   ###   #### ###     ###  #########  ####### ##    ######        #####       ####    ####     #####    ############      \n'+
				'      ##  ##   ### #  #######   # ###  ### #####  ######  ##    ######       #####        ####    ####     #####   #############      \n'+
				'      ######   ######  ######  ######  ### #####  ##      ##    #####       #####         ####    ####     #####   #############      \n'+
				'      ######   ######  ################### #####  ######  ##     ####       #####         ####    ####     #####   #############      \n'+
				'      ######   ###########################  ####  ######  ##     ####       ####          ####    ####     #####    ############      \n'+
				'      #####    ### ####### ######  ######   ####  ######  ##     ###        ############  ############   ##########       #####       \n'+
				'                                                                 ###        ############  ############  ############      #####       \n'+
				'                                                                 ###        ############  ############  ############      #####       \n'+
				'                                                                ####        ############   ##########   ############      #####       \n'+
				'                        ####                            #        ##         ############    ########     ##########        ###        \n'+
				'                      #######   ##                     ###                                                                            \n'+
				'                      ########  ###                    ###          ##                                                                \n'+
				'                      ########  ##                     ###          ##                                                                \n'+
				'                      ### ####                        ###          ##                                                                 \n'+
				'                      ###  ##   ##  # ##  ##    #   ## ###   ####   #####  #####   # ##                                               \n'+
				'                      ####      ## ##########  ###  ## ###  ###### ######  ###### #####                                               \n'+
				'                       ####     ## ########### ###  ## ###  ############# ####### #####                                               \n'+
				'                        ####    ## ########### ###  ## ###   ###### ##### ####### #####                                               \n'+
				'                        ####    ## ### ### ### ###  ## ###      ###  ##   ###  ## ###                                                 \n'+
				'                         ####   ## ### ### ### ###  ## ###   ######  ##   ###  ## ###                                                 \n'+
				'                         ####   ## ### ### ### ###  ## ###   ######  ##   ###  ## ###                                                 \n'+
				'                          ####  ## ### ### ### ###  ## #### #######  ##   ###  ## ###                                                 \n'+
				'                      ##  ####  ## ### ### ### ###  ## #### #######  ##   ###  ## ###                                                 \n'+
				'                      ### ####  ## ### ### ### ###  ## #### ### ###  ##   ###  ## ###                                                 \n'+
				'                      ########  ## ### ### ### ###  ## #### ### ###  ##   ###  ## ###                                                 \n'+
				'                      ########  ## ### ### ### ####### #### #######  #### ####### ###                                                 \n'+
				'                      #######   ## ### ### ### ####### ###  #######  #### ####### ###                                                 \n'+
				'                        ####    ##  #   #   #   ######  #    ### #    ###  #####   #                                                  \n';
	}
});
