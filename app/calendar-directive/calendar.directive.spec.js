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
		expect(element.find('#yearSelect').length).toBe(1); 
		expect(element.find('#yearSelect').html() ).toContain(year);  
	});

	it('the month button should display current month on load', function() {
		expect(element.find('#monthSelect').length).toBe(1); 
		expect(element.find('#monthSelect').html() ).toContain(month);  
	}); 

	it('year select should show choices for -20 years and +20 years from current year', function() {
		expect(element.find('#yearSelect').find('option').length).toEqual(41);

		expect(element.find('#yearSelect').first('option').text() ).toContain(String(year - 20));
		expect(element.find('#yearSelect').last('option').text() ).toContain(String(year + 20));
	}); 

	// check greyed
	it('should display correct number of days for the month and year with buffer days grey', function() {
		// 2017
			scope.seletedYear = 2017;

		// January 
			scope.selectMonth('January');
			scope.$digest();

			expect(element.find('.day').length).toEqual(35); 

			// grey 
				var days = [
					'#day_1_month_1',
					'#day_2_month_1',
					'#day_3_month_1',
					'#day_4_month_1'
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// February 
			scope.selectMonth('February');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [
					'#day_29_month_0',
					'#day_30_month_0',
					'#day_31_month_0',

					'#day_1_month_2',
					'#day_2_month_2',
					'#day_3_month_2', 
					'#day_3_month_2' 
				] 

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				})

		// March 
			scope.selectMonth('March');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [
					'#day_26_month_1',
					'#day_27_month_1',
					'#day_28_month_1', 

					'#day_1_month_3'
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// April 
			scope.selectMonth('April');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 

			// grey 
				var days = [
					'#day_26_month_2',
					'#day_27_month_2',
					'#day_28_month_2', 
					'#day_29_month_2',
					'#day_30_month_2',
					'#day_31_month_2',

					'#day_1_month_4',
					'#day_2_month_4',
					'#day_3_month_4',
					'#day_4_month_4',
					'#day_5_month_4',
					'#day_6_month_4'
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// May
			scope.selectMonth('May');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_30_month_3', 

					'#day_1_month_5',
					'#day_2_month_5',
					'#day_3_month_5'
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// June 
			scope.selectMonth('June');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_28_month_4', 
					'#day_29_month_4',
					'#day_30_month_4',
					'#day_31_month_4',

					'#day_1_month_6' 
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// July 2017
			scope.selectMonth('July');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 

			// grey 
				var days = [
					'#day_25_month_5',
					'#day_26_month_5',
					'#day_27_month_5',
					'#day_28_month_5', 
					'#day_29_month_5',
					'#day_30_month_5', 

					'#day_1_month_7',
					'#day_2_month_7',
					'#day_3_month_7',
					'#day_4_month_7',
					'#day_5_month_7' 
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// August 2017
			scope.selectMonth('August');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_30_month_6',
					'#day_31_month_6',

					'#day_1_month_8',
					'#day_2_month_8' 
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// September 2017
			scope.selectMonth('September');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_27_month_7',
					'#day_28_month_7', 
					'#day_29_month_7',
					'#day_30_month_7', 
					'#day_31_month_7' 
				]

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// October 2017
			scope.selectMonth('October');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_1_month_10',
					'#day_2_month_10',
					'#day_3_month_10',
					'#day_4_month_10' 
				] 

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// November 2017
			scope.selectMonth('November');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(35); 

			// grey 
				var days = [ 
					'#day_29_month_9',
					'#day_30_month_9',
					'#day_31_month_9',  

					'#day_1_month_11',
					'#day_2_month_11' 
				] 

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 

		// December 2017
			scope.selectMonth('December');
			scope.$digest();

			expect(element.find('.day').length ).toEqual(42); 

			// grey 
				var days = [ 
					'#day_26_month_10',
					'#day_27_month_10',
					'#day_28_month_10', 
					'#day_29_month_10',
					'#day_30_month_10', 

					'#day_1_month_0',
					'#day_2_month_0',
					'#day_3_month_0',
					'#day_4_month_0',
					'#day_5_month_0',
					'#day_6_month_0' 
				] 

				days.forEach(function(day) {
					expect(element.find(day).hasClass('outOfRange')).toEqual(true);
				}) 
	});
 
	it('days from previous month and next month should have different background color', function() {  
		for(var i in range.days) {
			var day = range.days[i];
			dayId = '#day_'+String(day.day)+'_month_'+String(day.month);  

			if(day.month == monthNumber - 1 || day.month == monthNumber + 1 ) {   
				expect(element.find(dayId).hasClass('outOfRange')).toEqual(true); 
			} 
		} 
	}); 

	it('days should start on Sunday and end on Saturday', function() {
		expect(range.days[0].date.getDay()).toEqual(0);
		expect(range.days[range.days.length-1].date.getDay()).toEqual(6);
	});
});