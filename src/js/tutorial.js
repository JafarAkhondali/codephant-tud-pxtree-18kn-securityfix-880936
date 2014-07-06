namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config;
	var txtGrp;
	var viewGrp;
	var tut_data = AK.Data.Tutorial;
	var textstyle = Config.TextStyle;
	
	//TODO: Tutorial
	
	AK.Tutorial = function Tutorial (parentCtrl) {
		this.parent = parentCtrl;
		this.top = parentCtrl.top;
		this.play = parentCtrl;
		this.game = parentCtrl.game;
		this.self = this;
	};
	
	AK.Tutorial.prototype.preload = function preload(){
		this.game.load.image('paper', 'assets/ui/ui-paper.png');
		this.game.load.spritesheet('exit','assets/icons/almanach-back.png', 64, 64);
	}
	
	AK.Tutorial.prototype.create = function create(){
		viewGrp = this.game.add.group();
		txtGrp = this.game.add.group();
		this.makeBackground();
		viewGrp.setAll('visible','false');
		viewGrp.visible = false;
	}
	
	
	AK.Tutorial.prototype.makeBackground = function (){
		paper = this.game.add.sprite(500, 275, 'paper');
		paper.anchor.set(0.5);
		paper.visible = false;
		paper.scale.set(2.6);
		exit = this.game.add.sprite(250, 500, 'exit');
	    exit.anchor.set(0.5);
	    exit.scale.set(1);
	    exit.visible = false;
	    exit.inputEnabled = true;
	    exit.events.onInputDown.add(
	    		this.closeTutorial,this);
	    viewGrp.add(paper);
	    viewGrp.add(exit);
	};
	
	AK.Tutorial.prototype.createButton = function(title, x, y, textlength, obj) {
		var textbutton = this.game.add.tileSprite(x-5,y-5,textlength*10, y+5, null);
		viewGrp.add(textbutton);
		var self = this;
		textbutton.inputEnabled = true;
		textbutton.events.onInputDown.add(function() {
			self.openTutorial(title);
				});
		textbutton.events.onInputOver.add(function() {
			obj.fill='#ff774b';
		});
		textbutton.events.onInputOut.add(function() {
			obj.fill='black';
		});
	};
	
	AK.Tutorial.prototype.splitText = function (text){
		var lines = [];
		var txt = text.split(" ");
		var line = "";
		for(var i=0;i<txt.length;i++){
			if(txt[i].length>100) {
				var longtxt = txt[i].match(/[\s\S]{1,80}/g) || [];
				for(var j=0;j<longtxt.length;j++) {lines.push(longtxt[j]);}
			}
			else{
				var temp_line=line;
				temp_line+=txt[i]+' ';
				if(temp_line.length>65){
					lines.push(line);
					line = "";
				}
				line+=txt[i]+' ';
			}
		}
		if(line!="") lines.push(line);
		lines.push('');
		return lines;
	}
	
	AK.Tutorial.prototype.closeTutorial = function(){
    	txtGrp.removeAll();
    	viewGrp.removeAll();
    	this.parent.first_start_flag = 0;
    	
    }
	
	AK.Tutorial.prototype.openTutorial = function openTutorial(page){
		this.parent.first_start_flag = 0;
		var pagetitle, text, title, pagenum;
		txtGrp.removeAll();
		(!page)? pagetitle='Willkommen bei 18 Knoten' : pagetitle = tut_data[page].title;
		var headline = this.game.add.text(500, 100, pagetitle, textstyle);
		headline.anchor.set(0.5);
		txtGrp.add(headline);
		viewGrp.setAll('visible','true');
		txtGrp.setAll('visible','true');
		viewGrp.visible = true;
		txtGrp.visible = true;
    	var self = this;
		var page_data = tut_data[0].content;
		pagenum = page;
    	page_data = tut_data[pagenum].content;
		var count = 0;
		var content_text;
		var content_lines = [];
		headline.fill='black';
		txtGrp.add(headline);
		for(var i=0;i<page_data.length;i++){
			if(page_data[i].type == 'paragraph') {
				content_text = page_data[i].text;
				if(content_lines.length <= 0 || typeof content_lines == 'undefined') content_lines = self.splitText(content_text);
				else {
					content_lines.push.apply(content_lines, self.splitText(content_text));
				}
				
			}
		}
		
		for(var j=0;j<content_lines.length;j++){
				var contenttext = this.game.make.text(270, 140+count, content_lines[j], textstyle);
				contenttext.fill = 'black';
				txtGrp.add(contenttext);
				count+=25;
			}
		if(page<tut_data.length-1){
			var next_link = this.game.add.text(630, 470, 'Nächste Seite', textstyle);
			txtGrp.add(next_link);
			this.createButton(pagenum+1, 630, 480, tut_data[pagenum+1].title, next_link);
		}
		if(page>0){
			var prev_link = this.game.add.text(300, 470, 'Vorherige Seite', textstyle);
			txtGrp.add(prev_link);
			this.createButton(pagenum-1, 300, 480, tut_data[pagenum-1].title, prev_link);
		}
		txtGrp.setAll('visible','true');
	}
});
