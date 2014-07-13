
namespace("PXTree.AchtzehnKnoten", function (AzK)
{ "use strict";

	var Config = AzK.Config
		, Climate = AzK.Config.Climate
		, __dirToAngle =
				{ "west": 0
				, "north-west": 45
				, "north": 90
				, "north-east": 135
				, "east": 180
				, "south-east": 225
				, "south": 270
				, "south-west": 315
				}
		;

	function Sea (parent)
	{
		this.parent = parent;
		this.top = parent.top;
		this.game = parent.game;
		this.ship = new AzK.Ship(this);
		this.spots = new AzK.Spots(this);
		this.currentSpotNr = null;
		this.currentLevel = null;

		this._coastSprite = null;
		this._bgGroup = null;
	};
	AzK.Sea = Sea;


	Sea.toRealAngle = function (dirOrNum)
	{
		return typeof(dirOrNum) === 'string'
				? __dirToAngle[dirOrNum]
				: dirOrNum
				;
	};
	
	AzK.Sea.prototype = 
			{ preload : function ()
				{
					this.game.load
						.image('water', 'assets/textures/water.png')
						.image('coast-temperate', 'assets/islands/normal-coast.png')
						.image('coast-arid', 'assets/islands/desert-coast.png')
						.image('coast-tropic', 'assets/islands/tropical-coast.png')
						;
					this.spots.preload();
					this.ship.preload();
				}
			, create: function ()
				{
					this._bgGroup = this.game.add.group();
					this._bgGroup.add(this.game.make.tileSprite(0, 0, this.game.width, this.game.height, 'water'));
					this.spots.create();
					this.ship.create();
					
				}
			, update: function ()
				{
					this.spots.update();
					this.ship.update();
				}
			
			, loadLevel: function (levelnr, enteringFrom)
				{
					if (null !== this.currentLevel)
					{	
						this.unloadLevel(function () { this.loadLevel(levelnr, enteringFrom); }, this);
					}
					else
					{
						var leveldat = AzK.Data.Levels[levelnr];
						if (!leveldat)
						{
							alert('Das Level existiert leider nicht. Versuche einen anderen Weg nach dem Fortsetzen.');
							this.top.startState(AzK.MainMenu.key);
						}
						
						//propagate data
						this.currentLevel = levelnr;
						this.top.currentLevel = levelnr;
						this.top.enteringFrom = enteringFrom;


						//store progresss
						this.top.storeSaveData();

						// real loading

						//coast
						if ('coast' in leveldat)
						{
							this._coastSprite = this.game.make.sprite(288, 288, 'coast-' + this.climaticZone());
							this._coastSprite.anchor.set(1.6 + (leveldat.coastDistance || 0), .5);
							this._coastSprite.angle = Sea.toRealAngle(leveldat.coast);
							this._bgGroup.add(this._coastSprite);
						}
						
						this.spots.loadLevel(leveldat, this.events);
						this.currentSpotNr = this.spots.spot.indexOf(this.spots.start[enteringFrom]);
						this.ship.move(
								this.spots.start[enteringFrom].peripheral.port,
								true);
						this.ship.move(this.spots.start[enteringFrom].port, function()
									{ this.spots.setActiveSpot(this.currentSpotNr); }, this);
						this.top.taskLog.startLevel(this.currentLevel);
					}
				}
			
			, unloadLevel: function (instantOrCompleteCallback, completeContext, callingBack)
				{
					if (!callingBack && 'end' in this.currentSpot())
					{
						this.ship.move(this.currentSpot().peripheral.port,
								function () { this.unloadLevel(instantOrCompleteCallback, completeContext, true); }, this);
						return;
					}
					else
					{
						this.ship.move({x:-100,y:-100}, true);
						this.spots.removeAll();
						if (this._coastSprite)
						{
							this._coastSprite.destroy();
							this._coastSprite = null;
						}
						this.currentLevel = null;
						this.top.taskLog.completeLevel();
						if (instantOrCompleteCallback instanceof Function)
							instantOrCompleteCallback.call(completeContext);
					}
				}
			
			, moveShip: function (port, onComplete, onCompleteContext)
				{
					this.ship.move(port, onComplete, onCompleteContext);
				}
			
			, moveShipToSpot: function (spotNr)
				{
				if (!this.ship.idling) return; //don't allow a course change will moving
					var spot = this.spots.spot[spotNr];
					if (this.spots.spotIsReachable(spotNr,
							this.currentSpotNr))
					{
						this.currentSpotNr = spotNr;
						if ('event' in spot)
						{
							this.moveShip(spot.port, function ()
							{
								var leveldat = AzK.Data.Levels[this.currentLevel]
									, spotEventDat = spot.event
									;
								
								this.spots.setActiveSpot(spotNr);
								
								// rewrite spot event data, if there are tags to merge
								if ('tags' in spot.event)
								{
									spotEventDat = { tags: spot.event.tags };
									spotEventDat.tags.push.apply(spotEventDat.tags, this.getDifficultyTags());
									if ('tags' in leveldat)
										spotEventDat.tags.push.apply(spotEventDat.tags, leveldat.tags);
								}
								else
								{
									spotEventDat.tags = [spot.type.name];
								}
console.dir(spotEventDat);
								
								this.parent.startEvent(spotEventDat);
							}, this);
						}
						else
						{
							this.moveShip(spot.port);
						}
					}
				}
			
			, currentSpot: function ()
				{
					return this.spots.spot[this.currentSpotNr];
				}

			, getDifficultyTags: function ()
				{
					return ["difficulty"
							+ Math.min(Math.floor(this.top.taskLog.countCompletedLevels()
									* Config.LevelDifficulty.Factor) + Config.LevelDifficulty.Offset,
									Config.LevelDifficulty.Maximum
								)];
				}

			, climaticZone: function ()
				{
					var lvltags = AK.Data.Levels[this.currentLevel].tags || []
						, zone = null
						, Zones = Climate.ZoneTags
						, i = 0, tag = null
						;
					while (!zone && i < lvltags.length)
					{
						tag = lvltags[i];
						if (Zones.indexOf(tag) >= 0)
						{
							zone = tag;
						}
						i += 1;
					}
					return zone || Climate.DefaultZone;
				}
			};
});
