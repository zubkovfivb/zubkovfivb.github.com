var b1 = true && !0; // -> true
 
var b2 = !'Hey there' || !1; // -> false
 
var b3 = 0 || !0 && true; // -> true
 
var b4 = !10 && !(!!0 || false); // -> false
 
var b5 = !(null && undefined) && (![] || !0); // -> true
 
var b6 = (!!!!(false) || !0) && !!({} && []); // -> true