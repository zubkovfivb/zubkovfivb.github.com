"use strict";
function makeArmy() {
 
    var shooters = [];
 
    for(var i = 0; i < 10; i++) {
 
        var shooter = function func() {
            alert( func.i );
        }
        shooter.i = i;
        
        shooters.push(shooter);   
    }
 
    return shooters;
}