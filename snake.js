function BodyPart(xpos,ypos) {
	this.xPos=xpos;
	this.yPos=ypos;
	this.direction;
};

function Snake(startX,startY) {
	var moveStep = 8;
	var bodyParts = [new BodyPart(startX,startY)];
	var direction = 'right';
	
	this.eatFood = function() {
		bodyParts.push(getNewTail());
	};
	
	this.move = function(newDirection) {
		direction = newDirection;
		var newHead = getNewHead();
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
	
	var getNewHead = function(){
		var currentHead = bodyParts[0];
		
		switch(direction){
			case 'right':
				return new BodyPart(currentHead.xPos+moveStep,currentHead.yPos);
			case 'left':
				return new BodyPart(currentHead.xPos-moveStep,currentHead.yPos);
			case 'up':
				return new BodyPart(currentHead.xPos,currentHead.yPos-moveStep);
			case 'down':
				return new BodyPart(currentHead.xPos,currentHead.yPos+moveStep);
		};
	};
	
	var getNewTail = function(){
		var currentTail = bodyParts[bodyParts.length-1];
		
		switch(direction){
			case 'right':
				return new BodyPart(currentTail.xPos-moveStep,currentTail.yPos);
			case 'left':
				return new BodyPart(currentTail.xPos+moveStep,currentTail.yPos);
			case 'up':
				return new BodyPart(currentTail.xPos,currentTail.yPos+moveStep);
			case 'down':
				return new BodyPart(currentTail.xPos,currentTail.yPos-moveStep);
		};
	};
};