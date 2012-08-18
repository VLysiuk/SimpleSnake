function GameBoard() {

	this.drawElement = function (classname, xpos,ypos) {
		var $element = $('<div/>').addClass(classname);
		$element.css('top',ypos+'px').css('left',xpos+'px');
		$('#gameField').append($element);
	};
	
	this.clearBoard = function(){
		$('div.bodypart').remove();
		$('.food').remove();
		$('#score').html('0');
	};
	
	this.hasNoCreatedFood = function() {
		return $('.food').length == 0 ;
	};
	
	this.removeSnakeBody = function() {
		$('div.bodypart').remove();
	};
	
	this.removeSnakeFood = function() {
		$('.food').remove();
	};
	
	this.updateScore = function() {
		var $currentScore = Number($('#score').html());
		$currentScore++;
		$('#score').html($currentScore);
	};
}



