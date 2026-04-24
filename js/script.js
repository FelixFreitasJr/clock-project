const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalClock = document.querySelector('.digital-clock');

const formatTime = (hours, minutes, seconds) =>{
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2,'0');
    const s = String(seconds).padStart(2,'0');
    return `${h}:${m}:${s}`;
};

const getTime = ()=>{
    const date = new Date();

 return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };
}

setInterval(() =>{

    const { seconds, minutes, hours } = getTime();

    // Atualiza ponteiros
    secondHand.style.transform = `translate(0, -50%) rotate(${seconds * 6}deg)`
    minuteHand.style.transform = `translate(0, -50%) rotate(${minutes * 6}deg)`
    hourHand.style.transform = `translate(0, -50%) rotate(${hours * 30}deg)`

    //Atualiza digital
    digitalClock.textContent = formatTime(hours, minutes, seconds);

}, 1000);

