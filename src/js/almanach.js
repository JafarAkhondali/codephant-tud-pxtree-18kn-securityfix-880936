namespace("PXTree.AchtzehnKnoten", function(AK)
{
	var Config = AK.Config.Desk;
	//var data_almanach = AK.Data.Almanach;
	var alm_view;
	var paper;
	
	AK.Almanach = function Almanach (parentCtrl) {
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.play = parentCtrl;
		this.game = parentCtrl.game;

	};
	
	AK.Almanach.prototype.preload = function preload(){
		this.game.load.image('background','assets\ui\ui-paper.png');
		
	};
	
	AK.Almanach.prototype.create = function create(){
		alm_view = this.game.make.group();
		paper = this.game.add.tileSprite(Config.Left, 0, this.game.width, this.game.height, 'backgound');
		paper.visible = false;		
	};
	
	//AK.Almanach.prototype.update() = function update(){};
	AK.Almanach.prototype.openAlmanach = function openAlmanach(){
		alert('Almanach wurde geöffnet');
		var index_page;
		paper.visible = true;
		var titles = [];
		var count = 0;
		var title;
		var textstyle = Config.StatPaper.TextStyle;
		for(title in data_almanach) {
			titles[count] = data_almanach[count].title;
			this.game.add.text(this.game.world.centerX-300, 0, titles[count], textstyle);
		}
		
		
	};
	
	
});