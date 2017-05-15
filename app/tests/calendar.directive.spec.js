describe('calendar', function() {

	beforeEach(function() {
		module('calendarDemoApp');
		module('calendar-directive/calendar.template.html'); 
	}); 

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new(); 

		html = '<calendar></calendar>';
		compiled = $compile(html);
		element = compiled(scope); 
		scope.$digest(); 
	}));

	it('the year button should display current year on load', function() {
		var year = new Date().getFullYear();

		expect(element.find('#yearButton').length).toBe(1); 
		expect(element.find('#yearButton').html() ).toContain(year);  
	});

	it('the month button should display current month on load', function() {
		var monthNumber = new Date().getMonth();
		var months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var month = months[monthNumber];

		expect(element.find('#monthButton').length).toBe(1); 
		expect(element.find('#monthButton').html() ).toContain(month);  
	});

	xit('should display days for current month on load', function() {

	});

	xit('year select should show choices for -20 years and +20 years from current year', function() {

	});

	xit('the days displayed should adjust when month changed', function() {

	});

	xit('the days displayed should adjust when year changed', function() {

	});

	xit('days from previous and next month should have different background color', function() {

	});
});