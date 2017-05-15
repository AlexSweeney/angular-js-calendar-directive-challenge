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
	
	it('year select should show choices for -20 years and +20 years from current year', function() {
		expect(element.find('#yearDropdown').find('li').length).toEqual(41);

		expect(element.find('#yearDropdown').first('li').text() ).toContain(String(year - 20));
		expect(element.find('#yearDropdown').last('li').text() ).toContain(String(year + 20));
	}); 

	it('the days displayed should adjust when month changed', function() {
		newMonthNumber = monthNumber + 2;
		newMonth = months[newMonthNumber];
		scope.selectMonth(newMonth);

		scope.$digest(); 
 
		newRange = CalendarRange.getMonthlyRange(new Date(year, newMonthNumber, 1))
		numDays = newRange.days.length;   

		expect(element.find('.day').length).toEqual(numDays);
	}); 

	it('days from previous month and next month should have different background color', function() { 
		for(var i in range.days) {
			var day = range.days[i];
			dayId = '#day_'+String(day.day)+'_month_'+String(day.month); 

			if(day.month == monthNumber -1 || day.month == monthNumber +1 ) {   
				expect(element.find(dayId).hasClass('outOfRange')).toEqual(true); 
			} 
		} 
	}); 

	it('should display correct number of days for the month', function() {
		// 2017
			scope.seletedYear = 2017;

		// January 
			scope.selectMonth('January');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// February 
			scope.selectMonth('February');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// March 
			scope.selectMonth('March');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// April 
			scope.selectMonth('April');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 

		// May
			scope.selectMonth('May');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// June 
			scope.selectMonth('June');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// July 2017
			scope.selectMonth('July');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 

		// August 2017
			scope.selectMonth('August');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// September 2017
			scope.selectMonth('September');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// October 2017
			scope.selectMonth('October');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// November 2017
			scope.selectMonth('November');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

		// December 2017
			scope.selectMonth('December');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 
	});

	it('days should start on Sunday and end on Saturday', function() {
		expect(range.days[0].date.getDay()).toEqual(0);
		expect(range.days[range.days.length-1].date.getDay()).toEqual(6);

	});
});