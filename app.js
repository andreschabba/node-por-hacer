// const argv = require('yargs').argv;
// const colors = require('colors');
const argv = require('./config/yargs').argv;
const { crear, getListado, actualizar, borrar, listar } = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listarTodas':
        getListado();
        break;
    case 'actualizar':
        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;
    case 'listar':
        listar(argv.completado);
        break;
    default:
        console.log('Comando no reconocido');
}