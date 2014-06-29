namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config;
	var txtGrp;
	var viewGrp;
	var tut_data = AK.Data.Tutorial;
	
	//TODO: Tutorial
	
	AK.Tutorial = function Tutorial (parentCtrl) {
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.play = parentCtrl;
		this.game = parentCtrl.game;
		this.self = this;
		this.preload();
		this.create();

	};
	
	AK.Tutorial.prototype.preload = function preload(){
		this.game.load.image('paper', 'assets/ui/ui-paper.png');
		this.game.load.spritesheet('exit','assets/icons/almanach-back.png', 64, 64);
	}
	
	AK.Tutorial.prototype.create = function create(){
		viewGrp = this.game.add.group();
		txtGrp = this.game.add.group();
		this.makeBackground();
	}
	
	
	AK.Tutorial.prototype.makeBackground = function (){
		paper = this.game.add.sprite(500, 275, 'paper');
		paper.anchor.set(0.5);
		paper.visible = true;
		paper.scale.set(2.6);
		exit = this.game.add.sprite(270, 480, 'exit');
	    exit.anchor.set(0.5);
	    exit.scale.set(1);
	    exit.visible = true;
	    exit.inputEnabled = true;
	    exit.events.onInputDown.add(
	    		this.closeTutorial,this);
	    viewGrp.add(paper);
	    viewGrp.add(exit);
	};
	
	AK.Tutorial.prototype.closeTutorial = function(){
    	txtGrp.removeAll();
    	viewGrp.removeAll();
		/*if(page_flag == 0){
		paper.visible = false;
    	exit.visible = false; 
    	txtGrp.setAll('visible','false'); 
    	temp_page=0; }*/
    	//if(page_flag == 1) this.openTutorial();
    	
    }
	
	AK.Tutorial.prototype.openTutorial = function openTutorial(){
		var headline = this.game.add.text(500, 80, 'Willkommen bei 18 Knoten', Config.Textstyle);
		headline.anchor.set(0.5);
		txtGrp.add(headline);
		this.closeTutorial();
	}
});