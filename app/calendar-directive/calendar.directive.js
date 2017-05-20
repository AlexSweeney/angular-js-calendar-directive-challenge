(function() {
    'use strict';

    angular.module('calendarDemoApp')
        .factory('CalendarUtils', function(CalendarRange) {
            var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            function getMonthIndex(targetMonth) {
        		return MONTHS.indexOf(targetMonth.trim());
        	}

        	function getDateObject(selectedYear, selectedMonth) {
        		var year = selectedYear; 
                var month = getMonthIndex(selectedMonth); 

                return new Date(year, month, 1);
        	}

            return {
            	getMonths: function(){
            		return MONTHS.slice();
            	},
            	getMonthIndex: getMonthIndex,
            	getDateObject: getDateObject,
            	setYearRange :  function(scope) {
                    scope.years = [];
                    var date = new Date();
                    var thisYear = date.getFullYear();

                    var startYear = thisYear - 20;
                    var finalYear = thisYear + 20;

                    for (var i = 0; i <= 40; i++) {
                        scope.years.push(startYear + i);
                    }

                    scope.selectedYear = thisYear;
                },
                setMonths: function(scope) {
                    var date = new Date();
                    var thisMonth = MONTHS[date.getMonth()];

                    scope.months = MONTHS;
                    scope.selectedMonth = thisMonth;
                },
                setDays: function(scope) {
                    var range = CalendarRange.getMonthlyRange(getDateObject(scope.selectedYear, scope.selectedMonth));

                    scope.days = range.days;

                    scope.start = range.start;
                    scope.end = range.end;
                }
            };
        })
        .directive('calendar', function(CalendarRange, CalendarUtils) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'calendar-directive/calendar.template.html',
                link: function(scope, element, attrs) {
                    scope.months = CalendarUtils.getMonths();

                    scope.returnIfOutOfRange = function(date) { 
                        if (date < scope.start || date > scope.end) {
                            return true;
                        } else {
                            return false;
                        } 
                    }
                    
                    scope.selectMonth = function(month) { 
                        scope.selectedMonth = month; 
                        CalendarUtils.setDays(scope);
                    };

                    scope.selectYear = function(year) {
                        scope.selectedYear = year;
                        CalendarUtils.setDays(scope);
                    }; 

                    var init = function() {
                        CalendarUtils.setYearRange(scope);
                        CalendarUtils.setMonths(scope);
                        CalendarUtils.setDays(scope);
                    }();
                }
            }
        });
}())
