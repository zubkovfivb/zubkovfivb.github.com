var enableBtn = document.getElementById("enable-plugin-btn");
var disableBtn = document.getElementById("disable-plugin-btn");
var tabableElement = $('.container-tabable');

enableBtn.onclick = function(){
    tabableElement.tabable();
}
disableBtn.onclick = function(){
	tabableElement.tabable().destroy();
}
