const express = require("express");
const cors= require("cors");

const app = express();

app.use(cors());
app.use(express.json())

const jugadores=[]
class Jugador { 
    constructor(id){
    this.id=id
}
   asignarMokepon(mokepon){
    this.mokepon=mokepon
}
actualizarPosicion(x,y) {
    this.x=x;
    this.y=y
}
}

class Mokepon {
    constructor(nombre){
        this.nombre=nombre
    }
        }

app.get("/unirse", (_req, res) => {
    const id=`${Math.random()}` 
    const jugador=new Jugador(id)
       jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
});
app.post("/mokepon/:jugadorId", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon(nombre);
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
        
    } else {
        console.log(`Jugador con ID ${jugadorId} no encontrado.`);
    }

    res.end();
});
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0 ;
    const y = req.body.y || 0 ;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y);
        
    } else {
        console.log(`Jugador con ID ${jugadorId} no encontrado.`);
    }

    res.end();
});


app.listen(8080, () => {
    console.log("servidor funcionando en el puerto 8080");
});



