function GameBoard() {

	this.drawElement = function (classname, xpos,ypos) {
		var $element = $('<div/>').addClass(classname);
		$element.css('top',ypos+'px').css('left',xpos+'px');
		$('#gameField').append($element);
	};
	
	this.clearBoard = function(){
		$('div.bodypart').remove();
		$('.food').remove();
	};
	
	this.clearGameInfo = function() {
		$('#score').html('0');
		$('#loseMsg').css('visibility','hidden');
		$('#speed').html('1');
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
	
	this.updateScore = function(currentRound) {
		var $currentScore = Number($('#score').html());
		$currentScore+=currentRound;
		$('#score').html($currentScore);
	};
	
	this.showLoseMessage = function(){
		$('#loseMsg').css('visibility','visible');
	};
	
	this.showNextRoundMsg = function() {
		$('#nextRndMsg').hide().css({visibility: 'visible'}).fadeIn(2000);
		$('#nextRndMsg').fadeOut(2000, function() {
				$(this).show().css({visibility: 'hidden'});
			});
			
		var $currentSpeed = Number($('#speed').html());
		$currentSpeed++;
		$('#speed').html($currentSpeed);
	};
}



