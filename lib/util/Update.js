'use strict';

const Area     = require('../model/Area');
const Project  = require('../model/Project');
const Template = require('../model/Template');

/**
 * Retorna una promesa con el estado de la actualización
 * @param { Error } err
 * @param { Query } data
 * @returns { Promise } data
 */

const callback = (err, data) => {

    if (err)
        console.error(err);

    console.log(data);

    return data;
};


/**
 * Busca una ruta y actualiza un documento de el modelo project.
 * @param { string } level
 * @param { any } searchValue
 * @param { string } updateOperator
 * @param { string } levelSet
 * @param { any } value
 * @example project('ruta a buscar', 'valor a buscar', '$operador', 'ruta a asignar', 'valor a asignar').
 * @return void ? void : err
 */

const project = (level, searchValue, updateOperator, levelSet, value) => {

    let find = '{ \"' + level + '\" : \"' + searchValue + '\" }';
    find = JSON.parse(find);
    let update = '{ \"' + updateOperator + '\" : {' + '\"' + levelSet + '\" : \"' + value + '\" } }';
    update = JSON.parse(update);

    Project.updateOne(find, update, callback);
};

/**
 * Busca un id y una ruta, después actualiza un documento de el modelo template.
 * @param { string } templateId
 * @param { string } level
 * @param { any } searchValue
 * @param { string } updateOperator
 * @param { string } levelSet
 * @param { any } value
 * @example project('ruta a buscar', 'valor a buscar', '$operador', 'ruta a asignar', 'valor a asignar').
 * @return void ? void : err
 */

const template = (id, level, searchValue, updateOperator, levelSet, value) => {

    let find = '{ \"_id\" : \"' + id + '\" ,' + '\"' + level + '\" : \"' + searchValue + '\" }';
    find = JSON.parse(find);
    let update = '{ \"' + updateOperator + '\" : {' + '\"' + levelSet + '\" :' + value + ' } }';
    update = JSON.parse(update);
    
    Template.updateOne(find, update, callback);
};

/**
 * Actualiza un documento de el modelo area.
 * @param { string } id
 * @param { string } attribute
 * @param { any } updateOperator
 * @return void ? void : err
 */

const area = (id, attribute, value) => {

    let set = '{ \"' + attribute  + '\": ' + value + '}';
    set = JSON.parse(set);

    Area.update( { '_id': id }, { $set: set }, callback );

};


module.exports = {
    project,
    template,
    area
};
