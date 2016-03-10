//"use strict"; 

function getObsticle() {
	var obsticle = $('[name=obsticle_types]:checked').val();
	return obsticle
}

function getStaging() {
	var staging = $('.field_diagram_button.selected').attr('value');
	return staging;
}

function getGoal() {
	var goal = $('[name=shooting_target]:checked').val();
	return goal
}

function passingBall() {
	var passing_ball = $('[name=pass_ball]:checked').prop('checked');
	return passing_ball
}

$('[name=staging_position]').on('click', function() {
	console.log(getStaging()) 
	console.log('staging position changed'); 
	NetworkTables.putValue('/SmartDashboard/stagingposition', getStaging());
	});

$('[name=obsticle_types]').on('click', function() {
	console.log(getObsticle()) 
	console.log('obsticle type changed'); 
	NetworkTables.putValue('/SmartDashboard/obsticletypes', getObsticle());
	});

$('[name=shooting_target]').on('click', function() {
	console.log(getGoal()) 
	console.log('shooting goal changed'); 
	NetworkTables.putValue('/SmartDashboard/shootingtarget', getGoal());
});

$('[name=pass_ball]').on('click', function() {
	if (passingBall()== true) {
		console.log('Passing ball');
	}
	else {
		console.log('Not passing ball')
	}
	NetworkTables.putValue('/SmartDashboard/passball', passingBall());
});


// Staging Position Diagram

$('.field_diagram_button').on('click', function() {
	$('.field_diagram_button').attr('class', 'field_diagram_button');
	$(this).attr('class', 'field_diagram_button selected');
	var position = $(this).attr('value');
	NetworkTables.putValue('/SmartDashboard/position', position);
}); 

$('.field_diagram_button').on('click', function() {
	var value = $(this).attr('value');
	$('.field_trail').attr('class', 'field_trail');
	$('.field_trail[value=' + value + ']').attr('class', 'field_trail selected');
	var trail = $('.field_trail').attr('value');
}); 

// Shooting Diagram
$('[name=shooting_target], .field_diagram_button').on('click', function() {
	var stagingPosition = getStaging();
	var goal = getGoal();

	var classes = [];
	classes.push(goal);

	if(stagingPosition < 3) {
		classes.push('left');
	} else if(stagingPosition == 3) {
		classes.push('mid');
	} else {
		classes.push('right');
	}

	$('[name=shooting_diagram]').attr('class', classes.join(' '));
});

//Obsticle pictures

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==1)
		$('[name=obsticle]').attr('class','low_bar')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==2)
		$('[name=obsticle]').attr('class','portcullis')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==3)
		$('[name=obsticle]').attr('class','cheval_de_frise')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==4)
		$('[name=obsticle]').attr('class','moat')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==5)
		$('[name=obsticle]').attr('class','ramparts')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==6)
		$('[name=obsticle]').attr('class','drawbridge')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==7)
		$('[name=obsticle]').attr('class','sally_port')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==8)
		$('[name=obsticle]').attr('class','rock_wall')	
});

$('[name=obsticle_types]').on('change', function () {
	getObsticle()
	if (getObsticle()==9)
		$('[name=obsticle]').attr('class','rough_terrain')	
});

$('[name=staging_position]').on('click', function () {
	if (getStaging()==1)
		$('[name=obsticle]').attr('class','low_bar')	
});

$('[name=staging_position]').on('click', function () {
	if (getStaging()==1)
		$('[name=obsticle_types][value=1]').prop('selected', true);
});



// Initialize autonomous slider
$('.autonomous-mode-carousel').slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  //cssEase: 'linear',
  fade: true,
  slide: 'li',
  slidesToShow: 1,
  slidesToScroll : 1
});




function Steps($element, $carousel) {
	this.$element = $element;
	this.$steps = {};
	this.$carousel = $carousel;

	// initialize the steps and get the defaults
	var that = this;
	var defaults = {};
	var firstStep = null;
	$element.find('[data-step]').each(function() {
		var $step = $(this),
			step = $step.data('step'),
			defaultValue = $step.data('step-value');
		
		firstStep = firstStep || step;

		that.$steps[step] = $step;
		defaults[step] = defaultValue;	

		$step.text($step.text());
		$('<span class="value">' + defaultValue + '</span>').appendTo($step);

		// When step is clicked on, go to that step
		$step.on('click', function() {
			that.setStep(step);
		});
	});
 
	$element.trigger('stepInit', [defaults]);

	// set the current step
	this.setFirstStep();
};

Steps.prototype.setValue = function(step, value) {

};

Steps.prototype.setSteps = function(steps) {
	_.forEach(this.$steps, function($step, step) {
		console.log(steps.indexOf(step) >= 0);
		if(steps.indexOf(step) >= 0) {
			$step.removeClass('disabled');
		} else {
			$step.addClass('disabled');
		}
	});

	this.setFirstStep();
};

Steps.prototype.setFirstStep = function() {
	var $step = this.$element.find('[data-step]:not(.disabled)').first();
	if($step.length > 0) {
		this.setStep($step.data('step'));
	}
};

Steps.prototype.setStep = function(step) {

	var $step = this.$steps[step];

	// set to active step in dom
	this.$element.find('[data-step]').removeClass('active');
	$step.addClass('active');

	// set the carousel slide
	var $slide = this.$carousel.find('[data-step=' + step + ']');
	this.$carousel.slick('slickGoTo', $slide.index());
};


var steps = new Steps($('.steps'), $('.autonomous-mode-carousel'));
	
