
var cuentas = [
    {Id:1, nombre:'Mali', Saldo:200, password:'9516'},
    {Id:2, nombre:'Gera', Saldo:290, password:'7536'},
    {Id:3, nombre:'Maui', Saldo:67, password:'1860'}
]
const cuerpoDocumento = document.body
const maximoSaldo = Number(990)
const minimoSaldo = Number(10)
cuerpoDocumento.onload = inicio
var headerLogin = document.getElementById("loginUsuario")
var selectElement = document.getElementById("usuarios")
var seccionDatos = document.getElementById("datosUsuario")
var seccionConsignar = document.getElementById("seccionConsignar")
var seccionRetirar = document.getElementById("seccionRetirar")
var seccionDatosOcultos = document.getElementById("datosOcultos")
var inputUsuarioSesion = document.getElementById("usuarioSesion")
var articuloTransaccion = document.getElementById("articuloTransaccion")
var mensajeError = document.getElementById("mensajeError")
var ultimaTransaccion = document.getElementById("ultimaTransaccion")

function inicio() {
    // Código a ejecutar cuando la página ha cargado completamente
    headerLogin.hidden = false
    seccionDatos.hidden = true
    seccionDatosOcultos.hidden = true
    seccionConsignar.hidden = true
    seccionRetirar.hidden = true
    document.getElementById("claveUsuario").value = ""
    document.getElementById("usuarios").selectedIndex = 0
    ultimaTransaccion.innerHTML = ""
    inputUsuarioSesion.value = ""
    eliminarOpciones()
    var opcion = document.createElement('option')
    opcion.value = 0
    opcion.text = "Seleccione el usuario"
    selectElement.appendChild(opcion)
    cuentas.forEach(function(cuenta){
        agregarOpciones(cuenta.Id,cuenta.nombre)
        }
    )
}

function eliminarOpciones(){
    while(selectElement.options.length >0){
        selectElement.remove(0);
    }
}

function agregarOpciones( valor, texto) {
    var option = document.createElement('option')
    option.value = valor;
    option.text = texto;
    selectElement.appendChild(option);
};   

function Login(){
    console.log("Ingreso a Login")
    var indice = selectElement.selectedIndex
    console.log("indice= " + indice)
    if (indice>0){
        indice -=1
        var clave = document.getElementById("claveUsuario").value
        console.log("Obtuvo la clave= " + clave)
        var claveUsuario = cuentas[indice].password
        if(clave === claveUsuario){
            console.log("La clave es igual")
            headerLogin.hidden = true
            seccionDatos.hidden = false
            document.getElementById("claveUsuario").value = ""
            inputUsuarioSesion.value = indice
            mostrarSaldo(indice)
        }
        else{
            console.log("La Clave " + clave + " no es igual a " + claveUsuario)
            mensajeError.innerHTML="Clave errada"
        }
    }
    else{
        mensajeError.innerHTML="Digite una Clave"
    }
}

function mostrarSaldo(indice){
    articuloTransaccion.hidden = false
    seccionConsignar.hidden = true
    seccionRetirar.hidden = true
    var saldoUsuario = cuentas[indice].Saldo
    var nombreUsuario = cuentas[indice].nombre
    let divSaldousuario = document.getElementById("saldoUsuario")
    let mensajeSaldo = "<p> Usuario: <label>" + nombreUsuario + "</label> Saldo: <label>" + saldoUsuario + "</label> </p>"
    console.log("Usuario: " + nombreUsuario + " y saldo: " + saldoUsuario)
    divSaldousuario.innerHTML = mensajeSaldo
    mensajeError.innerHTML=""
}

function mostrarConsignar(){
    articuloTransaccion.hidden = true
    seccionConsignar.hidden = false
}

function cancelarConsignar(){
    document.getElementById("txtConsignar").value=""
    mostrarSaldo(inputUsuarioSesion.value)
}

function Consignar(){
    let indice = inputUsuarioSesion.value
    let saldoActual = Number(cuentas[indice].Saldo)
    let valorConsignar = Number(document.getElementById("txtConsignar").value)
    if(saldoActual+valorConsignar<=maximoSaldo){
        cuentas[indice].Saldo  = Number(saldoActual) + Number(valorConsignar)
        document.getElementById("txtConsignar").value=""
        ultimaTransaccion.innerHTML = "Última transacción: Consignación de: " + valorConsignar
        cancelarConsignar()
    }
    else{
        mensajeError.innerHTML = "Supera el Límite de la cuenta"
    }
}

function mostrarRetirar(){
    articuloTransaccion.hidden = true
    seccionRetirar.hidden = false
}

function cancelarRetirar(){
    document.getElementById("txtRetirar").value = ""
    mostrarSaldo(inputUsuarioSesion.value)
}

function Retirar(){
    let indice = inputUsuarioSesion.value
    let saldoActual = Number(cuentas[indice].Saldo)
    let valorRetirar = Number(document.getElementById("txtRetirar").value)
    if(valorRetirar <= saldoActual - minimoSaldo){
        cuentas[indice].Saldo  = Number(saldoActual) - Number(valorRetirar)
        document.getElementById("txtRetirar").value = ""
        ultimaTransaccion.innerHTML = "Última transacción: Retiro de: " + valorRetirar
        cancelarRetirar()
    }
    else{
        mensajeError.innerHTML = "No puede retirar más de lo permitido"
    }
}

























function consultar(){
    let div = document.getElementById("dvPrueba")
    div.innerHTML = "Prueba ok"
}