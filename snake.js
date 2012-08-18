function BodyPart(xpos,ypos,direction) {
	this.xPos=xpos;
	this.yPos=ypos;
	this.direction=direction;;
};

function Snake(startX,startY) {
	var moveStep = 8;
	var bodyParts = [new BodyPart(startX,startY,'right')];
	var gameRegion;
	var onCrashCallback;
	var self = this;
	
	this.eatFood = function() {
		bodyParts.push(getNewTail());
	};
	
	this.move = function(newDirection) {
		var newHead = getNewHead(newDirection);
		
		if(crash(newHead))
			onCrashCallback();
			
		for(var i = bodyParts.length-1; i>0 ;i--){
			bodyParts[i] = bodyParts[i-1];
		}
		bodyParts[0] = newHead;
	};
	
	this.getBody = function() {
		return bodyParts;
	};
	
	this.holdsPosition = function(xpos,ypos) {
		for(var i = 0; i< bodyParts.length; i++){
			if(bodyParts[i].xPos == xpos && bodyParts[i].yPos == ypos)
				return true;
		}
		return false;
	};
	
	this.onCrash = function(crashCallback,fieldSize) {
		gameRegion = fieldSize;
		onCrashCallback = crashCallback;
	};
	
	var getNewHead = function(direction){
		var currentHead = bodyParts[0];
		
		switch(direction){
			case 'right':
				return new BodyPart(currentHead.xPos+moveStep,currentHead.yPos,direction);
			case 'left':
				return new BodyPart(currentHead.xPos-moveStep,currentHead.yPos,direction);
			case 'up':
				return new BodyPart(currentHead.xPos,currentHead.yPos-moveStep,direction);
			case 'down':
				return new BodyPart(currentHead.xPos,currentHead.yPos+moveStep,direction);
		};
	};
	
	var getNewTail = function(){
		var currentTail = bodyParts[bodyParts.length-1];
		var tailDirection = currentTail.direction;
		
		switch(tailDirection){
			case 'right':
				return new BodyPart(currentTail.xPos-moveStep,currentTail.yPos,tailDirection);
			case 'left':
				return new BodyPart(currentTail.xPos+moveStep,currentTail.yPos,tailDirection);
			case 'up':
				return new BodyPart(currentTail.xPos,currentTail.yPos+moveStep,tailDirection);
			case 'down':
				return new BodyPart(currentTail.xPos,currentTail.yPos-moveStep,tailDirection);
		};
	};
	
	var crash = function(head){
		if(head.xPos >= gameRegion.xPos
			|| head.yPos >= gameRegion.yPos
			|| head.xPos < 0
			|| head.yPos < 0
			|| self.holdsPosition(head.xPos,head.yPos))
			return true;
		
		return false;
	};
};