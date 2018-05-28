var Trigger = function(){}

Trigger.now = function()
{
    return Trellinator.now();
}

Trigger.isWeekDay = function(date)
{
    return !((date.getDay() == 6) || (date.getDay() == 0));
}

//time given in 24 hour time with no seconds like 14:34
Trigger.xOclockTomorrow = function(time24)
{
    var time_parts = time24.split(":");
    var ret  = new Date();
    ret.setDate(ret.getDate() + 1);
    ret.setHours(time_parts[0]);
    ret.setMinutes(time_parts[1]);
    ret.setMilliseconds(0);
    return ret;
}

//time given in 24 hour time with no seconds like 14:34
Trigger.timeIsBetween = function(start,finish)
{
    var start_parts = start.split(":");
    var finish_parts = finish.split(":");
    var start = Trellinator.now();
    start.setHours(start_parts[0],start_parts[1],0,0);
    var finish = Trellinator.now();
    finish.setHours(finish_parts[0],finish_parts[1],0,0);
    var now = Trellinator.now();
    return ((now.getTime() >= start.getTime()) && (now.getTime() <= finish.getTime()));
}

Trigger.xHoursFromNow = function(x)
{
    return Trigger.now().addHours(x);
}

Trigger.xMinutesFromNow = function(x)
{
    return Trigger.now().addMinutes(x);
}

Trigger.xDaysFromNow = function(x,time)
{
    var date = Trigger.now().addDays(x);
    
    if(time)
        date.at(time);

    return date;
}

Date.prototype.onDate = function(date)
{
    this.setDate(date);
    return this;
}

Date.prototype.on = function(date)
{
  this.setDate(date);
  return this;
}
//format 24 hours HH:MM seconds not supported
Date.prototype.at = function(time)
{
    var time_parts = time.split(":");
    this.setHours(time_parts[0],time_parts[1],0,0);
    return this;
}

Date.prototype.addMinutes = function(minutes)
{
    this.setMinutes(this.getMinutes() + minutes);
    return this;
}

Date.prototype.addHours = function(hours)
{
    return this.addMinutes(hours*60);
}

Date.prototype.addDays = function(days)
{
    this.setDate(this.getDate() + days);
    return this;
}

Date.prototype.addWeeks = function(weeks)
{
    return this.addDays(weeks*7);
}

Date.prototype.minusWeeks = function(weeks)
{
    return this.minusDays(weeks*7);
}

Date.prototype.addMonths = function(months)
{
    this.setMonth(this.getMonth() + months);
    return this;
}

Date.prototype.minusMonths = function(months)
{
    this.setMonth(this.getMonth() - months);
    return this;
}

// returns week of the month starting with 0
Date.prototype.getWeekOfMonth = function() {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
}

Date.prototype.dayName = function()
{
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[this.getDay()];
}

Date.prototype.monthName = function()
{
    return this.getMonthName();
}

Date.prototype.getMonthName = function()
{
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    return monthNames[this.getMonth()];
}

Date.prototype.previous = function(day)
{
    index = new Array();
    index["Sunday"]    = 0;
    index["Monday"]    = 1;
    index["Tuesday"]   = 2;
    index["Wednesday"] = 3;
    index["Thursday"]  = 4;
    index["Friday"]    = 5;
    index["Saturday"]  = 6;
    var target = index[day];
    var daynum = this.getDay();
    var diff = ((target - daynum)-7);
    
    if(diff != -7)
        var offset = diff % 7;
    else
        var offset = diff;

    this.setDate(this.getDate() + offset);
    return this;
}

Date.prototype.next = function(day)
{ 
    var index = new Array();
    index["Sunday"]    = 0;
    index["Monday"]    = 1;
    index["Tuesday"]   = 2;
    index["Wednesday"] = 3;
    index["Thursday"]  = 4;
    index["Friday"]    = 5;
    index["Saturday"]  = 6;

    var day_to_find = index[day];
    var diff = (day_to_find + 7) - this.getDay();
    
    if(diff != 7)
        var offset = diff % 7;
    else
        var offset = diff;

    this.setDate(this.getDate() + offset);
    return this;
}

Date.prototype.butlerDefaultDate = function()
{
    //May 8, 2018
    return this.monthName()+" "+this.getDate()+", "+this.getFullYear();
}

Date.prototype.lastDayOfMonth = function()
{
    return new Date(this.getFullYear(), this.getMonth()+1, 0);
}

Date.prototype.minusDays = function(days)
{
    this.setDate(this.getDate()-days);
    return this;
}

Date.prototype.stringFormat = function(format)
{
    if(format == "YYYY-MM-DD")
    {
        var year = this.getFullYear();
        var month = this.getMonth()+1;
        var day = this.getDate();
        
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        
        var ret = format.replace("YYYY",year).replace("MM",month).replace("DD",day);
    }
    
    else if(format == "HH:MM")
    {
        var hours = this.getHours();
        var minutes = this.getMinutes();
        
        if (hours < 10) {
          day = '0' + day;
        }
        if (minutes < 10) {
          month = '0' + month;
        }
        
        var ret = format.replace("HH",hours).replace("MM",minutes);
    }

    else
        throw new Error("Unsupported format passed to Date.stringFormat: "+format+" add more formats!");

    return ret;
}

Trigger.getRandomArbitrary = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
