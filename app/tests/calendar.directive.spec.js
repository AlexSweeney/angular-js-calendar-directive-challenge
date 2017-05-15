describe('calendar', function() {

	beforeEach(function() {
		module('calendarDemoApp');
		module('calendar-directive/calendar.template.html');  
	}); 

	beforeEach(inject(function($rootScope, $compile, _CalendarRange_) {
		scope = $rootScope.$new(); 

		year = new Date().getFullYear();
		monthNumber = new Date().getMonth();
		months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		month = months[monthNumber];

		CalendarRange = _CalendarRange_;

		range = CalendarRange.getMonthlyRange(new Date());
		firstDay = range.firstDay;
		startDay = range.startDay;
		endDay = range.endDay;
		lastDay = range.lastDay;
		numDays = range.days.length; 

		html = '<calendar></calendar>';
		compiled = $compile(html);
		element = compiled(scope); 
		scope.$digest(); 
	}));

	it('the year button should display current year on load', function() {
		expect(element.find('#yearButton').length).toBe(1); 
		expect(element.find('#yearButton').html() ).toContain(year);  
	});

	it('the month button should display current month on load', function() {
		expect(element.find('#monthButton').length).toBe(1); 
		expect(element.find('#monthButton').html() ).toContain(month);  
	});

	it('should display days for current month on load', function() {
		expect(element.find('.day').length).toEqual(numDays);  
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