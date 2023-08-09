
 // console.log(module);

 //module.exports= "hello world";
  
//  module.exports.getdate= getdate;
 //module.exports.getday= getday;

 /* 
  function getdate(){


    var options = { weekday: 'long',  month: 'long', day: 'numeric' };
var today  = new Date();

var day= today.toLocaleDateString("en-US",options);

    return day;
}
*/
/*
module.exports.getday= getday;

function getday(){


    var options = { weekday: 'long'};
var today  = new Date();

var day= today.toLocaleDateString("en-US",options);

    return day;
}
*/

//console.log(module.exports);


exports.getdate=function (){


    var options = { weekday: 'long',  month: 'long', day: 'numeric' };
var today  = new Date();

var day= today.toLocaleDateString("en-US",options);

    return day;
}


exports.getday= function (){


    var options = { weekday: 'long'};
var today  = new Date();

var day= today.toLocaleDateString("en-US",options);

    return day;
}

