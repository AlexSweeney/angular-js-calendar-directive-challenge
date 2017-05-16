(function() {
	'use strict';

	angular.module('calendarDemoApp')

	.directive('calendar', function(CalendarRange) {
		return {
			restrict: 'E',
			templateUrl: 'calendar-directive/calendar.template.html',
			link: function(scope, element, attrs) { 
				var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
				
				// utility 
					var returnMonthNumber = function(targetMonth) {
						targetMonth = targetMonth.trim(); 
						var count = 1;

						for(var i in months) {
							var month = months[i]; 

							if(month == targetMonth) { 
								return count;
							} else {
								count ++;
							}  
						}
					}

					var returnSelectedDate = function() {
						var year = String(scope.selectedYear);
						console.log(scope.selectedMonth);
						var month = returnMonthNumber(scope.selectedMonth);
						console.log(month);

						var date = new Date(year, month, 1);
						return date;
					} 

				// interact 
					scope.returnIfOutOfRange = function(date) { 
						if(date < scope.start || date > scope.end ) { 
							return true;
						} else { 
							return false;
						}
					} 

					scope.selectMonth = function(month) { 
						scope.selectedMonth = month;

						setDays();
					}

					scope.selectYear = function(year) {
						scope.selectedYear = year;

						setDays();
					}

				// init 
					var setYears = function() {
						scope.years = [];
						var date = new Date();
						var thisYear = date.getFullYear();

						var startYear = thisYear - 20;
						var finalYear = thisYear + 20;

						for(var i=0; i<=40; i++) {
							scope.years.push(startYear + i);
						}

						scope.selectedYear = thisYear;
					}

					var setMonth = function() {
						var date = new Date();
						var thisMonth = months[date.getMonth()];   

						scope.months = months;
						scope.selectedMonth = thisMonth;
					}

					var setDays = function() { 
						var range = CalendarRange.getMonthlyRange(returnSelectedDate() ); 
						console.log('setDays range: ');
						console.log(range);

						scope.days = range.days;

						scope.start = range.start;
						scope.end = range.end;  
					}  

					var init = function() {
						setYears();
						setMonth();
						setDays();  
					}();
			}
		}
	});
}())
