const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar() {
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
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
    }
    siguienteNivel(){
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
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            //let mantiene el valor para el for, var lo sobreescribe
            let color = this.transformarNumeroAColor(this.secuencia[i])
            console.log(color)
            //este delay es porque el for se ejecuta muy rapido y no daria tiempo de ver la iluminacion
            setTimeout(() => {
                console.log(color)
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
    elegirColor(event){
        console.log(this)
    }
}
function empezarJuego() {
    window.juego = new Juego()
}