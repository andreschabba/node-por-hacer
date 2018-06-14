const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    demand: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea',
    type: 'boolean'
};

const argv = require('yargs')
    .command('crear', 'Crear un elementon por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina una tarea en la lista', {
        descripcion
    })
    .command('listar', 'Enlista las actividades según su búsqueda', {
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
}