const errores ={
    required:{
        nombre: "El nombre es obligatorio",
        genero: "Seleccionar un género",
        colorPiel: "Seleccionar un color de piel",
        tipoCuerpo: "Seleccionar un tipo de cuerpo",
        alturaCuerpo: "Seleccionar una altura del cuerpo"
    },
    length:{
        nombre: "El nombre debe tener al menos 3 caracteres"
    }
}

function obtenerError(tipo, campo){
    return errores[tipo][campo] || "Error desconocido";
}

function mostrarError(campo, mensaje){
    const errorDiv = document.getElementById(`${campo}-error`);
    if(errorDiv){
        errorDiv.textContent = mensaje;
        errorDiv.style.display = "block";
    }
    return null;
}

function ocultarError(campo){
    const errorDiv = document.getElementById(`${campo}-error`);
    if(errorDiv){
        errorDiv.style.display = "none";
    }
    return null;
}

function validarCampo(campo, reglas = {}){
    const input = document.getElementById(campo);
    if(!input) return null;

    const valor = input.value.trim();
    if(reglas.required && !valor){
        const mensaje = obtenerError("required", campo);
        return mostrarError(campo, mensaje);
    }
    if(reglas.length && valor.length < reglas.length){
        const mensaje = obtenerError("length", campo);
        return mostrarError(campo, mensaje);
    }
    return ocultarError(campo);
}

function validarFormulario(event){
    event.preventDefault();
    const validaciones = [
        {campo: "nombre", reglas: {required: true, length: 3}},
        {campo: "genero", reglas: {required: true}},
        {campo: "colorPiel", reglas: {required: true}},
        {campo: "tipoCuerpo", reglas: {required: true}},
        {campo: "alturaCuerpo", reglas: {required: true}}
    ];
    const resultados = validaciones.map(v => validarCampo(v.campo, v.reglas));
    if(resultados.every(r => r === null)){
        alert("Formulario válido. Avatar creado exitosamente.");
    } else{
        alert("Por favor corrige los errores en el formulario.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("avatarForm");
    if(form){
        form.addEventListener("submit", validarFormulario);
    }
});