// this is date genrating function cut from the app.js file 
//--  this is for function 1 --
module.exports.getdate = getdate;
function getdate() {
    var todayDate = new Date();
    var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    var weekDay = todayDate.toLocaleDateString("en-US", options);
return weekDay;
};

// -- this is for function 2--
module.exports.getBday = getBday; 
function getBday(){
    var todayDate = new Date();
    var options = { weekday: "long"};
    var weekDay = todayDate.toLocaleDateString("en-US", options);
return weekDay;
};