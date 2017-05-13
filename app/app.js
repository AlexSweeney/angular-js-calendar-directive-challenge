/*
	When you initially visit the page, it should display the current month.
	
	The drop down menu should allow you to choose a month and year to display. You should be able to display up to 20 years in the past, and 20 years in the future. When you select a new month/year, the calendar grid should update.
	
	The calendar should display as many rows for weeks as required for the month. The left most cell is for Sundays, and the right most for Saturdays.
	
	Any padded days from the previous/next month should be visually delineated from the days in the current month (as in the sketch above).
	
	Once your directive is working, write unit tests for your controller(s) and directive.
	
	Use Git/Github for version control.

*/
(function() {
	'use strict';

	angular.module('calendarDemoApp', [])
		.factory('Months', Months)
		.run(function($rootScope, Months) {
			var setYears = function() {
				$rootScope.years = [];
				var date = new Date();
				var thisYear = date.getFullYear();

				var startYear = thisYear - 20;
				var finalYear = thisYear + 20;

				for(var i=0; i<40; i++) {
					$rootScope.years.push(startYear + i);
				}

				$rootScope.selectedYear = thisYear;
			}

			var setMonth = function() {
				var date = new Date();
				var thisMonth = Months[date.getMonth()];   

				$rootScope.months = Months;
				$rootScope.selectedMonth = thisMonth;
			} 

			var init = function() {
				setYears();
				setMonth();
			}

			init();

			$rootScope.selectMonth = function(month) {
				$rootScope.selectedMonth = month;
			}

			$rootScope.selectYear = function(year) {
				$rootScope.selectedYear = year;
			}
		})
		.directive('calendar', function(Months) {
			return {
				restrict: 'E',
				templateUrl: 'calendar-template.html'
			}
		});

	function Months() {
		return ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	}

}());