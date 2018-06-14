const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }

};

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, err => {
        if (err) throw new Error('No se pudo grabvar', err);
    });

};

const getListado = () => {
    cargarDB();
    if (listadoPorHacer.length === 0) {
        console.log('No hay tareas por hacer');
        return;
    }
    for (let tarea of listadoPorHacer) {
        console.log('======Por Hacer====='.green);
        console.log('Tarea:'.underline.red, tarea.descripcion.grey);
        console.log('Estado:', tarea.completado);
        console.log('===================='.green);
    }
};

const actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
};

const borrar = descripcion => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    }
    return false;
};

const listar = completado => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.completado === completado;
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        getListado();
    } else {
        listadoPorHacer = nuevoListado;
        for (let tarea of listadoPorHacer) {
            console.log('======Por Hacer====='.green);
            console.log('Tarea:'.underline.red, tarea.descripcion.grey);
            console.log('Estado:', tarea.completado);
            console.log('===================='.green);
        }
    }
};


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    listar
};