window.addEventListener('load', () => {
    var oneSecond = 1000;
    setInterval( currentTime, oneSecond);
});


var currentTime = function(){
    var clock = document.getElementById('clock');
    var date1 = document.getElementById('date');
    var currentTime = new Date();
    var hours  = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes <10){
        minutes = "0"+minutes;
    }

    if (seconds< 10){
        seconds = "0"+ seconds;
    }

    var Clock = hours + ":"+ minutes +":"+seconds;
    var date = new Date();
    var day  = date.getDate();
    // .getDate() - vraca dan u mesecu kao broj
    // .getDay() - vraca koji je dan u nedelji (0-Nedelja, 1-Ponedeljak ...)
    var month = date.getMonth() +1; // .getMonth()- niz koji pocinje od nule, januar ima indeks 0, a decembar 11, potrebno je dodati +1

    if( day<10){
        day = "0"+day;
    }

    if (month<10){
        month="0"+month;
    }
    var currentDate = day +"."+month+"."+date.getFullYear();
    date1.innerHTML = currentDate;
    clock.innerHTML = Clock;
}


























