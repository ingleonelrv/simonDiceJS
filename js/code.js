const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    generarSecuencia(){
        //declaramos un array de 10 elementos y le asignamos 0 a c/u para luego mapearlo con aleatorios de 0-3 q representan 1color
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
    }
}
function empezarJuego() {
    window.juego = new Juego()
}