const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalClock = document.querySelector('.digital-clock');
const dateDiv = document.querySelector('.date');
const formatToggle = document.querySelector('#formatToggle');
const ticksContainer = document.querySelector('.ticks');
const clock = document.querySelector('.clock');

//pega o raio do relógio para posicionar os ticks corretamente
const borderSize = 15;
const radius = clock.offsetWidth / 2 - borderSize;

let userLocale = "Localização não detectada"; // Valor padrão caso a localização não seja detectada

// cria os 60 ticks do relógio
for(let i = 0; i < 60; i++){
    const tick = document.createElement('div');

    //altura padrão
    let tickHeight = 15;

    //destacar os traços das horas
    if(i % 5 === 0){
        tickHeight = 25;
        tick.style.backgroundColor = '#a52a2a';
    }

    tick.style.height = `${tickHeight}px`;

    //posiciona levando em conta o raio - altura do traço
    const offset = radius - (tickHeight / 2);
    tick.style.transform = `rotate(${i * 6}deg) translateY(-${offset}px)`;
    
    ticksContainer.appendChild(tick);
}

const formatTime24 = (hours, minutes, seconds) =>{
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2,'0');
    const s = String(seconds).padStart(2,'0');
    return `${h}:${m}:${s}`;
};

const formatTime12 = (hours, minutes, seconds) =>{
    const period = hours >= 12 ? 'PM' : 'AM';
    const h = String(hours % 12 || 12).padStart(2, '0');
    const m = String(minutes).padStart(2,'0');
    const s = String(seconds).padStart(2,'0');
    return `${h}:${m}:${s} ${period}`;
};


const getTime = ()=>{
    const date = new Date();
    return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            fullDate: date.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        };
};

//Pega a localização do usuário
navigator.geolocation.getCurrentPosition(sucess, error);

function sucess(position){
    const { latitude, longitude } = position.coords;

    //Usando o OpenStreetMap Nominatim para obter a localização
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "Localização não detectada";
            const country = data.address.country || "Localização não detectada";
            userLocale = `${city}, ${country}`;
        })
        .catch(() => {
            userLocale = "Localização não detectada";
        });
}

function error(){
    userLocale = "Localização não detectada";
}

//Atualiza o relógio a cada segundo
setInterval(() =>{

    const { seconds, minutes, hours, fullDate } = getTime();

    // Atualiza ponteiros
    secondHand.style.transform = `translate(0, -50%) rotate(${seconds * 6}deg)`
    minuteHand.style.transform = `translate(0, -50%) rotate(${minutes * 6}deg)`
    hourHand.style.transform = `translate(0, -50%) rotate(${hours * 30}deg)`

    //Atualiza digital conforme checkbox
    if(formatToggle.checked){
        digitalClock.textContent = formatTime12(hours, minutes, seconds);
    } else {
        digitalClock.textContent = formatTime24(hours, minutes, seconds);
    }
        // Atualiza data   
    dateDiv.textContent = `${userLocale} - ${fullDate}`;
}, 1000);

