const sectionSelecionarAtaque = document.getElementById("selecionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar"); 

const sectionSelecionarMascota = document.getElementById("selecionar-mascota");

const spanMascotaJugador = document.getElementById("mascota-jugador");


const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const seccionMensajes = document.getElementById("resultado");
const mensajesJugador = document.getElementById("mensajes-jugador");
const mensajesEnemigo = document.getElementById("mensajes-enemigo");


const contenedorPersonajes = document.getElementById("contenedor-personajes");
const contenedorAtaques = document.getElementById("contenedorAtaques");
let spanMascotaenemigo = document.getElementById("mascota-enemigo");
let primerAtaque=document.getElementById("primer-ataque");
let segundoAtaque=document.getElementById("segundo-ataque");
let tercerAtaque=document.getElementById("tercer-ataque");
let cuartoAtaque=document.getElementById("cuarto-ataque");
let quintoAtaque=document.getElementById("quinto-ataque");

const sectionVerMapa=document.getElementById("ver-mapa")
const canvas=document.getElementById("mapa")

let jugadorId=null
let mokepones=[]
let opcionesDeMokepones
let ataqueJugador=[]
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponesEnemigo
let botones=[]
let botonAgua
let botonTierra 
let botonFuego 
let ataqueEnemigo=[]
let vidasJugador=3
let vidasEnemigo=3
let victoriasJugador=0
let victoriasEnemigo=0
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo=mapa.getContext("2d")
let intervalo
let mapabackground=new Image()
mapabackground.src="./imagenes/mokemap.webp"
let alturaBuscada
let anchoMapa=window.innerWidth - 20 
const anchoMaximoMapa=350



if (anchoMapa > anchoMaximoMapa) {  
    anchoMapa =anchoMaximoMapa - 20
}


alturaBuscada= anchoMapa * 600/800

mapa.width=anchoMapa
mapa.height=alturaBuscada



class Mokepon { constructor(nombre,foto,vida,fotoMapa) {  
        this.nombre=nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
        this.ancho=70
        this.alto=70
        this.x=Aleatorio(0,mapa.width-this.ancho)
        this.y=Aleatorio(0,mapa.height-this.alto)
        this.mapafoto=new Image()
        this.mapafoto.src=fotoMapa
        this.velocidadx=0
        this.velocidady=0
}

 pintarMokepon () {  
    lienzo.drawImage(
        this.mapafoto,
        this.x,//posicion en x
        this.y,// posicion en y 
        this.ancho,// ancho de la imagen
        this.alto,// alto de la imagen
           )  
}

}

let hipodoge=new Mokepon("Hipodoge","./imagenes/Hipodoge.png",5,"./imagenes/Hipodoge.png")
let capipepo=new Mokepon("Capipepo","./imagenes/Capipepo.png",5,"./imagenes/Capipepo.png")
let ratigueya=new Mokepon("Ratigueya","./imagenes/Ratigueya.png",5,"./imagenes/Ratigueya.png") 
let hipodogeEnemigo=new Mokepon("Hipodoge","./imagenes/Hipodoge.png",5,"./imagenes/Hipodoge.png")
let capipepoEnemigo=new Mokepon("Capipepo","./imagenes/Capipepo.png",5,"./imagenes/Capipepo.png")
let ratigueyaEnemigo=new Mokepon("Ratigueya","./imagenes/Ratigueya.png",5,"./imagenes/Ratigueya.png")

hipodoge.ataques.push(

        {  nombre:"💧" ,id:"boton-agua"},
        {  nombre:"💧", id:"boton-agua"},
        {  nombre:"💧" ,id:"boton-agua"},
        {  nombre:"🔥", id:"boton-fuego"},
        {  nombre:"🪴",id:"boton-tierra"}
)

hipodogeEnemigo.ataques.push(

    {  nombre:"💧" ,id:"boton-agua"},
    {  nombre:"💧", id:"boton-agua"},
    {  nombre:"💧" ,id:"boton-agua"},
    {  nombre:"🔥", id:"boton-fuego"},
    {  nombre:"🪴",id:"boton-tierra"}
)
capipepo.ataques.push(

        {  nombre:"🪴",id:"boton-tierra"},
        {  nombre:"🪴",id:"boton-tierra"},        
        {  nombre:"🪴",id:"boton-tierra"},
        {  nombre:"💧" ,id:"boton-agua"},
        {  nombre:"🔥", id:"boton-fuego"},
)

capipepoEnemigo.ataques.push(

    {  nombre:"🪴",id:"boton-tierra"},
    {  nombre:"🪴",id:"boton-tierra"},        
    {  nombre:"🪴",id:"boton-tierra"},
    {  nombre:"💧" ,id:"boton-agua"},
    {  nombre:"🔥", id:"boton-fuego"},
)

ratigueya.ataques.push(

        {  nombre:"🔥", id:"boton-fuego"},
        {  nombre:"🔥", id:"boton-fuego"},    
        {  nombre:"🔥", id:"boton-fuego"},
        {  nombre:"🪴",id:"boton-tierra"},
        {  nombre:"💧" ,id:"boton-agua"},
)

ratigueyaEnemigo.ataques.push(

    {  nombre:"🔥", id:"boton-fuego"},
    {  nombre:"🔥", id:"boton-fuego"},    
    {  nombre:"🔥", id:"boton-fuego"},
    {  nombre:"🪴",id:"boton-tierra"},
    {  nombre:"💧" ,id:"boton-agua"},
)
mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() { 
        
   sectionSelecionarAtaque.style.display="none"        
   sectionReiniciar.style.display="none"  
   sectionVerMapa.style.display="none" 
        
   mokepones.forEach((mokepon) => {
   opcionesDeMokepones= `                
                <input type="radio" name="mascota" id=${mokepon.nombre} />  
                <label class="tarjeta-mokepon" id="color${mokepon.nombre.toLowerCase()}" for="${mokepon.nombre}" > 
                    <p class="nombres-mokepones">${mokepon.nombre}</p>
                    <img src="${mokepon.foto}" alt="${mokepon.nombre}">
                </label>
                `;
         contenedorPersonajes.innerHTML += opcionesDeMokepones  ;  
         
         inputHipodoge =document.getElementById("Hipodoge");

            } );
   inputHipodoge =document.getElementById("Hipodoge");
   inputCapipepo =document.getElementById("Capipepo");
   inputRatigueya =document.getElementById("Ratigueya"); 

                 
   botonMascotaJugador.addEventListener("click",selecionarMascotaJugador);        
   botonReiniciar.addEventListener("click",reiniciarJuego)
   unirseAlJuego()
} 
function unirseAlJuego() { 
    fetch("http://localhost:8080/unirse")
         .then(function(res) { 
              console.log(res)
              if(res.ok) { 
                res.text()
                    .then (function(respuesta) { 
                    console.log(respuesta)
                    jugadorId=respuesta
                })
                 }
            } )

} 

function selecionarMascotaJugador() {   
    sectionSelecionarMascota.style.display="none"; 

  if(inputHipodoge.checked) { 
        spanMascotaJugador.innerHTML=inputHipodoge.id
        mascotaJugador=inputHipodoge.id 
} 
    else if(inputCapipepo.checked) { 
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador=inputCapipepo.id
    }
    else if(inputRatigueya.checked) { 
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador=inputRatigueya.id
    }
    else{alert("Seleciona alguna mascota para continuar")}
   
     extraerataques(mascotaJugador)
     sectionVerMapa.style.display="flex"       
     iniciarMapa()
     selecionarMokepon(mascotaJugador)
}
function selecionarMokepon(mascotaJugador)  { 
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, { 
    method:"post",
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify( {
        mokepon:mascotaJugador
    })
  }) 

} 



function extraerataques(mascotaJugador)  { 
        let ataques 
        for (let i = 0; i< mokepones.length; i++) {
               if (mascotaJugador===mokepones[i].nombre){ 
                ataques=mokepones[i].ataques
               } } 
        mostrarataques(ataques)
} 

function mostrarataques(ataques) {
      contenedorAtaques.innerHTML = "";  // Limpia el contenedor antes de añadir los ataques


        ataques.forEach((ataque)=> {
        ataquesMokepon=   `                
        <button id=${ataque.id} class="boton-ataque BAtaque"> ${ataque.nombre}</button>        
        `
        console.log(ataquesMokepon); // Verificar qué ataques se están generando
       contenedorAtaques.innerHTML+=ataquesMokepon
       
       botonAgua =document.getElementById("boton-agua")
       botonTierra =document.getElementById("boton-tierra")
       botonFuego =document.getElementById("boton-fuego")
        });

        botones=document.querySelectorAll(".BAtaque")
        

}

function secuenciaAtaque() {
  botones.forEach((boton) => {
  boton.addEventListener("click",(e)=> {
        let ataqueId = e.target.id;
        if (ataqueId === "boton-fuego") {
            ataqueJugador.push("FUEGO");
            console.log(ataqueJugador);
            boton.style.background = "yellow";
            boton.disabled=true // aqui se agrego el codigo
        } else if (ataqueId === "boton-agua") {
            ataqueJugador.push("AGUA");
            console.log(ataqueJugador);
            boton.style.background = "yellow";
            boton.disabled=true// aqui se agrego el codigo
        } else if (ataqueId === "boton-tierra") {
            ataqueJugador.push("TIERRA");
            console.log(ataqueJugador);
            boton.style.background = "yellow";
            boton.disabled=true// aqui se agrego el codigo
        }
        ataqueAleatorioEnemigo()
  
                });
            });
           
}
 

function selecionarMascotaEnemigo (){    
    let mascotaAleatoria=Aleatorio(0,mokepones.length -1)
    spanMascotaenemigo.innerHTML=mokepones[mascotaAleatoria].nombre
    ataquesMokeponesEnemigo=mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()    
}



function ataqueAleatorioEnemigo() { 

    console.log("ataque Enemigo",ataquesMokeponesEnemigo)

    let ataqueAleatorio=Aleatorio(0,ataquesMokeponesEnemigo.length -1 )   
    if(ataqueAleatorio==0|| ataqueAleatorio==1 ) {
    ataqueEnemigo.push("AGUA") } 
    else if(ataqueAleatorio==3 || ataqueAleatorio==4) {
    ataqueEnemigo.push("TIERRA")} 
    else  {
    ataqueEnemigo.push("FUEGO")} 
    console.log(ataqueEnemigo) 
    iniciarPelea() 
}

function iniciarPelea () { 
    if(ataqueJugador.length===5) { 
        Combate()
    }
}
function indexAmbosoponentes(jugador,enemigo)  {     
    
    indexAtaqueJugador===ataqueJugador[jugador]
    indexAtaqueEnemigo===ataqueEnemigo[enemigo]
    }

    
function Combate() {     
    
    for (let index = 0; index < ataqueJugador.length; index++) {

        if ((ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "AGUA") ||
            (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "TIERRA") ||
            (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "FUEGO")) {
            crearMensajes("Empate", ataqueJugador[index], ataqueEnemigo[index]);         
        }
        else if ((ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "TIERRA") ||
            (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") ||
            (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA")) {
            crearMensajes("Ganaste", ataqueJugador[index], ataqueEnemigo[index]);
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador; }
            
        else {
            indexAmbosoponentes (index,index)
            crearMensajes("Perdiste", ataqueJugador[index], ataqueEnemigo[index]);
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML=victoriasEnemigo }
            revisarVidas() 
 }
}

function revisarVidas() { 
        if(victoriasJugador===victoriasEnemigo) {
            crearMensajesFinal("Esto fue un empate!!!")}
        else if(victoriasJugador > victoriasEnemigo) {
        crearMensajesFinal("FELICITACIONES, Ganaste eres un crack:)")}
        else {
            crearMensajesFinal("Perdiste, mejor suerte para la otra:(")}
}
function crearMensajes(resultado,ataqueJugador,ataqueEnemigo){  

    let nuevoAtaqueJugador=document.createElement("p")
    let nuevoAtaqueEnemigo=document.createElement("p")
    seccionMensajes.innerHTML=resultado
    nuevoAtaqueJugador.innerHTML= ataqueJugador
    nuevoAtaqueEnemigo.innerHTML= ataqueEnemigo    
    mensajesJugador.appendChild(nuevoAtaqueJugador) 
    mensajesEnemigo.appendChild(nuevoAtaqueEnemigo)  
    
    // Asignar los resultados a los elementos correspondientes

    const ataques = [primerAtaque, segundoAtaque, tercerAtaque, cuartoAtaque, quintoAtaque];
    for (let i = 0; i < ataques.length; i++) {
        if (!ataques[i].innerHTML) {
            ataques[i].innerHTML = resultado;
            break;
        }
    }
} 


function crearMensajesFinal(resultadoFinal)
 {     
             
        seccionMensajes.innerHTML=resultadoFinal 
        botonAgua.disabled=true       
        botonTierra.disabled=true        
        botonFuego.disabled=true         
        sectionReiniciar.style.display="block"}
        function reiniciarJuego() {
        location.reload() } 

window.addEventListener("load", function() {
            iniciarJuego();
           
        });

function pintarCanvas () {
    
    mascotaJugadorObjeto.x=mascotaJugadorObjeto.x+mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y=mascotaJugadorObjeto.y+mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0,0,mapa.width, mapa.height)
    lienzo.drawImage(
        mapabackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()
   enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()

   if(mascotaJugadorObjeto.velocidadx !==0 || mascotaJugadorObjeto.velocidady !==0)
    {   revisarCoalicion(hipodogeEnemigo)
        revisarCoalicion(capipepoEnemigo)
        revisarCoalicion(ratigueyaEnemigo)
                   }

    
}

function enviarPosicion (x,y)  { 
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, { 
      method:"post",
      headers:{
          "content-type": "application/json"
      },
        body:JSON.stringify( {
           x,
           y,
      })
    }) 
  
  } 

function moverDerecha()  {
    mascotaJugadorObjeto.velocidadx=5

    
}
function moverIzquierda()  {
    mascotaJugadorObjeto.velocidadx=-5

    
}
function moverArriba()  {
    mascotaJugadorObjeto.velocidady=-5

    
}
function moverAbajo()  {
    mascotaJugadorObjeto.velocidady=5
}   
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadx=0
    mascotaJugadorObjeto.velocidady=0
}

function presionarTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
                break
        case 'ArrowRight':
            moverDerecha()
                break
         case 'ArrowLeft':
            moverIzquierda()
               break
        default:
            break 
    }

}
function iniciarMapa() {
 
    mascotaJugadorObjeto=obtenerObjetoMascota(mascotaJugador)
    intervalo=setInterval(pintarCanvas,50)
    window.addEventListener("keydown",presionarTecla)
    window.addEventListener("keyup",detenerMovimiento)  
}
function obtenerObjetoMascota() {
    for (let i = 0; i< mokepones.length; i++) {
        if (mascotaJugador===mokepones[i].nombre){ 
         return mokepones[i]
        } } 
}
function revisarCoalicion(enemigo){
    const arribaEnemigo=enemigo.y
    const abajoEnemigo=enemigo.y +enemigo.alto
    const derechaEnemigo=enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x

    const arribaMascota=mascotaJugadorObjeto.y
    const abajoMascota=mascotaJugadorObjeto.y +mascotaJugadorObjeto.alto
    const derechaMascota=mascotaJugadorObjeto.x+mascotaJugadorObjeto.ancho
    const izquierdaMascota=mascotaJugadorObjeto.x

    if (abajoMascota<arribaEnemigo ||
        arribaMascota>abajoEnemigo ||
        derechaMascota<izquierdaEnemigo ||
        izquierdaMascota>derechaEnemigo 
    ) 
    {
        return ;}
        detenerMovimiento()
        console.log("hay una coalicion")
        clearInterval(intervalo)
         sectionSelecionarAtaque.style.display='flex';
         sectionVerMapa.style.display= "none"
         selecionarMascotaEnemigo (enemigo) 

}
function Aleatorio(min,max){return Math.floor(Math.random()*(max-min+1)+min)}


