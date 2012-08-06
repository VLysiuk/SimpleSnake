var snake;
var moveDirection = 'right';
var gameExecutor;
var gameSpeed= 50;

//actual field size(400px) divided by corresponding bodypart size(8px)
var gameFieldRelativeWidth = 50;
var gameFieldRelativeHeight = 50;

var snakeElementWidth = 8;
var snakeElementHeight = 8;

var food;

$(document).ready(function() {
    $('body').keydown(keyPressedHandler);
});

function move() {
	generateFood();
	snake.move(moveDirection);
	
	if(snake.holdsPosition(food.xPos,food.yPos))
		eatFood();
		
	drawSnake();
};

function keyPressedHandler(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
	switch(code) {
		case 37:
			moveDirection = 'left';
			break;
		case 38:
			moveDirection = 'up';
			break;
		case 39:
			moveDirection = 'right';
			break;
		case 40:
			moveDirection = 'down';
			break;
		case 32:
			startGame();
			break;
	}
 }

function startGame() {
	moveDirection = 'right';
	if(gameExecutor)
		clearInterval(gameExecutor);
	
	snake = new Snake(80,80);
	drawSnake();
	gameExecutor = setInterval(move,gameSpeed);
};

function drawSnake() {
	//clear field
	$('div.bodypart').remove();
	
	//draw the new snake
	var snakeBody = snake.getBody();
	
	for(var i=0; i<snakeBody.length; i++){
		drawElement('bodypart',snakeBody[i].xPos,snakeBody[i].yPos);
	}
};

function generateFood() {
	//if there is no food ->generate
	if($('.food').length == 0){
		do{
			xpos = Math.floor(Math.random() * gameFieldRelativeWidth) * snakeElementWidth;
			ypos = Math.floor(Math.random() * gameFieldRelativeHeight)* snakeElementHeight;
		}
		while(snake.holdsPosition(xpos,ypos));
		food = {xPos:xpos,yPos:ypos};
		drawElement('food',xpos,ypos);
	}
};

function drawElement(classname, xpos,ypos) {
	var $element = $('<div/>').addClass(classname);
	$element.css('top',ypos+'px').css('left',xpos+'px');
	$('#gameField').append($element);
};

function eatFood() {
	snake.eatFood();
	$('.food').remove();
	
	//update score
	$currentScore = Number($('#score').html());
	$currentScore++;
	$('#score').html($currentScore);
}