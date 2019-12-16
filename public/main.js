//Cambiar tema
var tema = document.getElementById('tema').value

function cambiarTema(tema) {
  if (tema === "estilo.css") {
    tema.href === "dark.css";
  } else {
    tema.href === "estilo.css";
  }
};
//Función Date() para ver la fecha actual
function verFecha () {
    var fecha = new Date().toLocaleString();
    document.getElementById('fecha').innerHTML="Fecha y hora: "+ fecha
}
verFecha()

//Guardamos el nombre del cliente tipeado en mayúscula para evitar errores de tipeo
var nombre = document.getElementById('nombre').value
var nombre = nombre.toUpperCase()

//Definimos el número de teléfono en un formato amigable para enviar mensajes
var caracteristica = document.getElementById('caracteristica').value
var telefono = document.getElementById('telefono').value
var numero_de_telefono = caracteristica+telefono

//Guardamos la descripción del trabajo a realizar en una variable para poder usarla después
var descripcion = document.getElementById('descripcion').value
var descripcion = descripcion.toUpperCase()

//Buscamos los valores de total y la seña para calcular el saldo


function obtenerSaldo(total,sena) {
    var total = document.getElementById('total')
	var sena = document.getElementById('sena')
	var saldo = parseInt(total.value-sena.value);
    document.getElementById('saldo').innerHTML="Monto a saldar: $"+ parseFloat(saldo);
}

/*function mostrarSaldo() {
	document.getElementById('saldo').innerHTML="Monto a saldar: $"+ saldo;
}*/
//Chequeando que funcione...
console.log(nombre)
console.log(numero_de_telefono)

//Cuando hacemos click en "Enviar", la info del formulario se guarda
/*function enviarFormulario (){

}*/

//El número de la operación corresponde a la fecha(dia, minutos, segundos) en la que se guardaron los cambios
var fecha_actual = Date.now()
function numeroDeOperacion() {
    document.getElementById('operacion').innerHTML="Número de operación: "+ fecha_actual;
}
var numero_de_operacion = numeroDeOperacion()
