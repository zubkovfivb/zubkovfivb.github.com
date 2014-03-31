var myNamber = 5;
var result = prompt('Угадай число от 1 до 10');
var val = parseInt(result, 10);

if(result === null){
    alert('Ну как хотите');
}else if(result === false && result !== 0){
    alert('Вы не ввели чесло');        
    }else{   
        if(isNaN(val)){
            alert('Вы ввели не число');
        }else{
            if(val == myNamber){
                alert('Вы угадали');
            }else if(val < 1 || val > 10){
                alert('Введите число от 1 до 10 !');
            }else{
                alert('Вы не угадали');                
        }          
    }  
}


