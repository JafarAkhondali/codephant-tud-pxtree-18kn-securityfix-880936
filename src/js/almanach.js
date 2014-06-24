namespace("PXTree.AchtzehnKnoten", function(AK)
{
	var Config = AK.Config.Desk;
	var data_almanach = AK.Data.Almanach;
	var alm_view;
	var paper = null;
	var exit = null;
	var txtGrp;
	
	AK.Almanach = function Almanach (parentCtrl) {
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.play = parentCtrl;
		this.game = parentCtrl.game;
		this.preload();
		this.create();

	};
	
	AK.Almanach.prototype.preload = function preload() {
		this.game.load.image('background','assets/ui/ui-almanach.png');
		this.game.load.spritesheet('exit','assets/icons/almanach-back.png', 64, 64);
		
	};
	
	AK.Almanach.prototype.create = function create(){
		alm_view = this.game.make.group();
		data_almanach = AK.Data.Almanach;
		this.makeBackground();
		alm_view = this.game.add.group();
		txtGrp = this.game.add.group();


		
	};
	
	AK.Almanach.prototype.update = function update(){};

	
	AK.Almanach.prototype.openAlmanach = function openAlmanach(){

		var index_page;
		paper.visible = true;
		exit.visible = true;
		var titles = [];
		var count = 0;
		var title, text_img;
		var text = "Keine gültigen Daten gefunden";
		text.inputEnabled = true;
		var textstyle = Config.StatPaper.TextStyle;
		var headline = this.game.add.text(Config.Left + 150, 80+count, 'Almanach - Index', textstyle);
		txtGrp.add(headline);
		for(var i=0; i<data_almanach.length;i++) {
			count+=30;
			if(text == null) text = "Keine gültigen Daten gefunden";
			text = this.game.make.text(Config.Left + 50, 100+count, data_almanach[i].title, textstyle);
			txtGrp.add(text);
			//text.events.onInputOver.add(mouseInHandler, this);
			//text.events.onInputOut.add(mouseOutHandler, this);
			//text.events.onInputDown.add(this.openPage(title,0), this);
		};
		txtGrp.setAll('visible','true');
;
		

	};
	
	
	AK.Almanach.prototype.makeBackground = function (){
		paper = this.game.add.sprite(Config.Left, 0, 'background');
		paper.visible = false;
		exit = this.game.add.sprite(Config.Left + 55, 530, 'exit');
	    exit.anchor.set(0.5);
	    exit.scale.set(1);
	    exit.visible = false;
	    exit.inputEnabled = true;
	    exit.events.onInputDown.add(
	    		this.closeAlmanach,this);
	};
	
	
	AK.Almanach.prototype.openPage = function (title, page) {
		var page_data = null;
		var cpp = 3; //Content Per Page: number of paragraphs/pictures per page
		for(var i=0;i<data_almanach.length;i++){
			if(data_almanach[i].title==title) {page_data = data_almanach[i].content; break; }
		}
		
		var content_text;
		for(var i=0;i<cpp;i++){
			if(page_data[i+page*cpp].type = 'paragraph') {
				content_text+=page_data[i+page*cpp].text;
			}
			if(page_data[i+page*cpp].type = 'image') {
				
			}
		}
		if(page_data.length>(page*cpp+cpp)){
			//TODO: Link zur nächsten Seite   this.openPage(title, page+1);
		}
		
		if(page>0){
			//TODO: Link zur vorhergehenden Seite
			//this.openPage(title, page-1);
		}
		
	};
	
	AK.Almanach.prototype.closeAlmanach = function(){
    	paper.visible = false;
    	exit.visible = false;
    	txtGrp.setAll('visible','false');
    	txtGrp.removeAll();
    	
    }
	
	mouseInHandler = function ()
	{
		label.fill = Config.Button.HoverTextStyle.fill;
		bg.frame = 1;
	};
	mouseOutHandler = function ()
	{
		label.fill = Config.Button.TextStyle.fill;
		bg.frame = 0;
	};
	
});