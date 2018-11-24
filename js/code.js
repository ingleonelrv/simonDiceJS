const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL =10

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
        
    }

    inicializar() {
        //corrigiendo la salida de contexto de this provocada por setTimeOut
        this.siguienteNivel = this.siguienteNivel.bind(this)
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        //array de los botones de cada color
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    generarSecuencia(){
        //declaramos un array de 10 elementos y le asignamos 0 a c/u para luego mapearlo con aleatorios de 0-3 q representan 1color
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }
    siguienteNivel(){
        this.subNivel = 0
        //cada vez q llegue al sig nivel ilumina
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(numero){
        switch (numero) {
            case 0:
               return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'        
        }
    }
    transformarColorANumero(color){
        switch (color) {
            case 'celeste':
               return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3        
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            //let mantiene el valor para el for, var lo sobreescribe
            let color = this.transformarNumeroAColor(this.secuencia[i])
            //este delay es porque el for se ejecuta muy rapido y no daria tiempo de ver la iluminacion
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i)
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light')
        // debugger
        setTimeout(() => {
            this.apagarColor(color)
        }, 350)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        // .bind(this) ata la referencia al juego ya que en el camino se puede perder el contexto y la trasladaria al boton
        // var self = this o var _this = this
        // this.elegirColor = this.elegirColor.bind(this) inicializado en el constructor no necesitaria bind en cada elemento
        this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
        this.colores.violeta.addEventListener('click', this.elegirColor.bind(this))
        this.colores.naranja.addEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.addEventListener('click', this.elegirColor.bind(this))
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.violeta.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.naranja.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.removeEventListener('click', this.elegirColor.bind(this))  
    }
    elegirColor(event){
        const nombreColor = event.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                // this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    //GANO
                }else{
                    //el setTimeOut delega en el navegador la ejecucion de la funcion, el this = window, usar bind para que this sea this
                    setTimeout(this.siguienteNivel, 1000)                    
                }
            }
        }else{
            //PERDIO
        }
    }
}
function empezarJuego() {
    window.juego = new Juego()
}