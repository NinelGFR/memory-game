//Iniciación de variables
let tarjetasDestapadas = 0;
let tarjeta1= null;
let tarjeta2= null;
let primerResultado= null;
let segundoResultado= null;
let Movimientos= 0;
let aciertos= 0;
let temporizador= false;
let timer= 60;
let timerInicial= 60;
let tiempoRegresivoId= null;


//Apuntando a documento HTML
let mostrarMovimientos= document.getElementById('Movimientos')
let mostrarAciertos= document.getElementById('Aciertos')
let mostrarTiempo= document.getElementById('T-restante')

//Generación de numeros aleatorios
let numeros = [`🍔`,`🍔`,`🍕`,`🍕`,`🍟`,`🍟`,`🌭`,`🌭`,`🥓`,`🥓`,`🍗`,`🍗`,`🍖`,`🍖`,`🌮`,`🌮`,];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML= `Tiempo: ${timer} segundos`
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= numeros[i];
        tarjetaBloqueada.disabled= true;
        
    }
}
//Función principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador= true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1){
        //Mostrar primer numero
        tarjeta1= document.getElementById(id);
        primerResultado= numeros[id]
        tarjeta1.innerHTML= primerResultado;

        //Deshabilitar primer boton
        tarjeta1.disabled= true;

    } else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2= document.getElementById(id);
        segundoResultado= numeros[id];
        tarjeta2.innerHTML= segundoResultado;

        //Deshabilitar seugundo boton
        tarjeta2.disabled= true;

        //Incrementar movimientos
        Movimientos++;
        mostrarMovimientos.innerHTML= `Movimientos: ${Movimientos}`;

        if(primerResultado== segundoResultado){
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas= 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML= `Aciertos: ${aciertos}`;
            
            if(aciertos== 8){
                clearInterval(tiempoRegresivoId)
                mostrarAciertos.innerHTML= `Aciertos: ${aciertos} 😊`;
                mostrarTiempo.innerHTML= `Fantástico!!🎉🌹sólo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML= `Movimientos: ${Movimientos} ✌💕😘`;
            }
        }else{
            //Mostrar momentariamente valoresa y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML= ' ';
                tarjeta2.innerHTML= ' ';
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                tarjetasDestapadas = 0;
            },900)
        }
    }
} 

