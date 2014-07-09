createTimer(document.querySelectorAll('.container-timer')[0]);

function createTimer(domElement){
    var oldMs = new Date().getTime();
    var timer ;
    var ms = 0;
    var sec = 0;
    var min = 0;
    var hour = 0;
    var timerState = 1;
    var timerValue = domElement.querySelector('.stopwatch-current');
    var timerGetLap = domElement.querySelector('.stopwatch-laps');
    var startStopBtn = domElement.querySelector('.btn.btn-primary');

    function initEvent(event){

        if(event.target.className === 'btn btn-primary'){
            stopStartTimer();
        }
        if(event.target.className === 'btn btn-info'){
            addLap();
        }
        if(event.target.className === 'btn btn-danger btn-sm'){
            resetTimer();
        } 
        if(event.target.className === 'label label-danger'){
            timerGetLap.removeChild(event.target.parentNode);
        }   
    }

    function resetTimer(){
        startStopBtn.innerHTML = 'Start';
        clearInterval(timer);
        hour = min = sec = ms = 0;
        timerValue.innerHTML = '0';
        timerState = 1;
        var timerGetLapLength = timerGetLap.children.length;
        for(var i = 0; i < timerGetLapLength; i++){
            timerGetLap.removeChild(timerGetLap.children[0]);
        }
    }

    function stopStartTimer(){
    
        if((timerState % 2) === 0){
            startStopBtn.innerHTML = 'Start';
            clearInterval(timer);
        }else{
            startStopBtn.innerHTML = 'Stop';
            timer = setInterval(function (){startTimer()}, 0);
        }
        timerState++;
    }

    function addLap(){
      
        var timerCreateLap = document.createElement('div');
        var closer = document.createElement('span');
    
        closer.className = 'label label-danger';
        closer.innerHTML = 'x';    
        timerCreateLap.className = 'alert alert-info';
        timerCreateLap.innerHTML = createTimerValue();
        timerCreateLap.appendChild(closer);
        if(timerGetLap.children.length){
            timerGetLap.insertBefore(timerCreateLap,timerGetLap.children[0]);
        }else{
            timerGetLap.appendChild(timerCreateLap);
        }
    }

    function startTimer(){

        var newMs = new Date().getTime();
        ms = newMs - oldMs;

        if(ms > 999){
            ms = '0';
            oldMs = newMs;
            sec++ ;
        }
        if(sec > 59){
            sec = 0;
            min++;
        }
        if(min > 59){
            min = 0;
            hour++;
        }
     
        timerValue.innerHTML = createTimerValue();
    }

    function createOutStr(time){
        time = '' + time;
        if (time.length === 1){
            time = '0'+time;
        }
        return time               
    }
            
    function createTimerValue(){

        var msStr = ''+ms;
        if(msStr.length === 1){
            msStr = '00'+ms;
        }
        if(msStr.length === 2){
            msStr = '0'+ms;
        }

        return createOutStr(hour) + ':' + createOutStr(min) + ':' + createOutStr(sec) + ':' + msStr;
    }   
         
    function initKeyEvent(event){
        
        if(event.keyCode === 83){
            stopStartTimer();    
        }
        if(event.keyCode === 76){
            addLap();    
        }
        if(event.keyCode === 82){
            resetTimer();    
        }
   
    } 
      
    domElement.addEventListener('click', initEvent, false);
    domElement.addEventListener('keydown', initKeyEvent, false); 
}

    