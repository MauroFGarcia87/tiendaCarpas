
import { Carpa } from "./carpasClass.js";  
import {validarSelect, campoRequerido, validarGeneral, validarNumeros, validarUrl} from "./validaciones.js"


let codigo = document.getElementById('codigo');
let nombre = document.getElementById('nombre');
let tipo = document.getElementById('inputTipo');
let personas = document.getElementById('inputPersona');
let cantidad = document.getElementById('cantidad');
let descripcion = document.getElementById('descripcion');
let url = document.getElementById('url');
let formulario = document.getElementById('formulario');
let tabla = document.getElementById('cuerpoTabla');
let listaCarpas = [];
let paraModificar = false;

tipo.addEventListener('blur', () =>{validarSelect(tipo)});
nombre.addEventListener('blur', () => {campoRequerido(nombre)});
descripcion.addEventListener('blur', ()=> {campoRequerido(descripcion)});
personas.addEventListener('blur', ()=>{validarSelect(personas)});
formulario.addEventListener('submit', guardar);


cargaIncial();

function guardar(e){
    e.preventDefault();
    if(validarGeneral()){

        if(paraModificar == false){
            crearCarpa();
        }else{
            guardarCarpa();
            limpiarFormulario();
        }
        
    }else{
        // no hace nada
    }   
}

 function crearNumerosId(){
    // Creamos el valor para el id
    let n = Date.now().toString(30);       
    return n;
}

function cargaIncial(){
    listaCarpas= JSON.parse(localStorage.getItem('listaCarpas')) || [];
    console.log(listaCarpas);
    listaCarpas.forEach(itemCarpa => {
        crearFila(itemCarpa);
    });
}

function crearCarpa(){
    // crea el numero id
    codigo.value = crearNumerosId();
    // Recuperamo el texto del select Tip
    let valorTipo = tipo.options[tipo.selectedIndex].text
    // creamo el objeto carpa
    let carpaNueva = new Carpa(codigo.value, nombre.value, valorTipo, personas.value, cantidad.value, descripcion.value, url.value);
    console.log(carpaNueva);
    // Agregamos el objeto a la listaCapas
    listaCarpas.push(carpaNueva);
    //Lo Agregamos a localstorage
    localStorage.setItem('listaCarpas', JSON.stringify(listaCarpas));
    crearFila(carpaNueva);
    limpiarFormulario();
    
}
function crearFila(objCarpa){
    tabla.innerHTML += ` <tr>
    <th scope="row">${objCarpa.codigo}</th>
    <td>${objCarpa.nombre}</td>
    <td>${objCarpa.tipo}</td>
    <td>${objCarpa.personas}</td>
    <td>${objCarpa.cantidad}</td>
    <td>${objCarpa.descripcion}</td>
    <td>${objCarpa.url}</td>
    <td>
      <button class="btn btn-secondary" onclick="editarCarpa('${objCarpa.codigo}')">
        Editar
      </button>
      <button class="btn btn-danger" onclick="eliminarCarpa('${objCarpa.codigo}')">
        Eliminar
      </button>
    </td>
  </tr>`
}

window.eliminarCarpa = (cod)=>{
    let carpaFiltrada = listaCarpas.filter((itemCarpa)=>{return itemCarpa.codigo != cod});
    listaCarpas = carpaFiltrada;
    console.log(listaCarpas);
    localStorage.setItem('listaCarpas', JSON.stringify(listaCarpas));
    borrarTabla();
    listaCarpas.forEach((itemCarpa)=>{
        crearFila(itemCarpa);
    });
}

function borrarTabla(){
    tabla.innerHTML = '';
}

function limpiarFormulario(){
    formulario.reset();
    nombre.className ='form-control';
    tipo.className = 'form-select';
    personas.className = 'form-select';
    cantidad.className = 'form-control';
    descripcion.className = 'form-control';
    url.className = 'form-control';
    paraModificar = false;
}

window.editarCarpa = (codigoCarpa)=>{
    listaCarpas.find((itemCarpa)=>{
        if(itemCarpa.codigo == codigoCarpa){
            descripcion.value = itemCarpa.descripcion;
            cantidad.value = itemCarpa.cantidad;
            nombre.value = itemCarpa.nombre;
            tipo.value = itemCarpa.tipo;
            personas.value = parseInt(itemCarpa.personas);
            url.value = itemCarpa.url;
            console.log(itemCarpa.nombre);
            let codi = ""+ itemCarpa.codigo;
            console.log(codi);
            codigo.value = codi;
        }
    });
    paraModificar = true;
}

const guardarCarpa = () => {
   let  indexCarpa = listaCarpas.findIndex((itemCarpa) => {return itemCarpa.codigo == codigo.value});
   console.log(indexCarpa);
   listaCarpas[indexCarpa].codigo = codigo.value;
   listaCarpas[indexCarpa].nombre = nombre.value;
   listaCarpas[indexCarpa].tipo = tipo.options[tipo.selectedIndex].text;
   listaCarpas[indexCarpa].personas = personas.options[tipo.selectedIndex].text;
   listaCarpas[indexCarpa].cantidad = cantidad.value;
   listaCarpas[indexCarpa].descripcion = descripcion.value;
   listaCarpas[indexCarpa].url = url.value;
   console.log(listaCarpas);
   localStorage.setItem('listaCarpas', JSON.stringify(listaCarpas));
   
   borrarTabla();
   listaCarpas.forEach((itemCarpa)=>{
       crearFila(itemCarpa);
   })
   
   
  
}


