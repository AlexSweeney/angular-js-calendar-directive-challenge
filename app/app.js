/*
	x When you initially visit the page, it should display the current month.
	
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
		.factory('CalendarRange', CalendarRange)
		.run(function($rootScope, Months, CalendarRange) {
			var init = function() {
				setYears();
				setMonth();
				setDays();
			}

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

			var returnMonthNumber = function(targetMonth) {
				var count = 1;

				for(var i in Months) {
					var month = Months[i];

					if(month == targetMonth) {
						return count;
					} else {
						count ++;
					}  
				}
			}

			var retrunSelectedDate = function() {
				var year = String($rootScope.selectedYear).substring(2, 4);
				var month = returnMonthNumber($rootScope.selectedMonth); 

				var date = new Date(year, month, 1);
				return date;
			}

			var setDays = function() {
				var range = CalendarRange.getMonthlyRange(retrunSelectedDate() );

				$rootScope.days = range.days; 
			} 

			init();

			$rootScope.selectMonth = function(month) {
				$rootScope.selectedMonth = month;

				setDays();
			}

			$rootScope.selectYear = function(year) {
				$rootScope.selectedYear = year;

				setDays();
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

	function CalendarRange() {
		return {
			DAY : 24 * 60 * 60 * 1000,

			prepareDate : function(date) {
			    date = new Date(date);
			    var day = date.getDay();
			    return {
			      date : date,
			      weekday : day != 0 && day != 6,
			      day : date.getDate(),
			      month : date.getMonth(),
			      year : date.getFullYear()
			    };
			},

			getMonthlyRange : function(date) {
			    var month = date.getMonth();
			    var startDay = new Date(date);
			    startDay.setDate(1);

			    var firstDay = new Date(startDay);
			    if (firstDay.getDay() > 0) { //Not Sunday
			      firstDay.setDate(firstDay.getDate() - (firstDay.getDay()));
			    }

			    var endDay = new Date(startDay);
			    if(month == 11) {
			      endDay.setMonth(0);
			      endDay.setYear(endDay.getFullYear() + 1);
			    } else {
			      endDay.setMonth(month + 1);
			    }

			    endDay.setDate(endDay.getDate() - 1);

			    var lastDay = new Date(endDay);
			    lastDay.setDate(lastDay.getDate() + (6 - endDay.getDay()));

			    var day = new Date(firstDay);
			    var days = [];
			    while(day <= lastDay) {
			      days.push(this.prepareDate(day));
			      day.setDate(day.getDate() + 1);
			    }

			    return {
			      first : firstDay,
			      start : startDay,
			      end : endDay,
			      last : lastDay,
			      days : days
			    };
			} 
		}
	} 
}());