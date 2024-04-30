/* Toutes les données collectés sont stocké dans cette map
 * id => {
 *     "x": string,
 *     "y": string,
 *     "z": string,
 *     "acc_x": string,
 *     "acc_y": string,
 *     "acc_z": string,
 *     "direction": string,
 * }
 */
const fs = require('fs')
let datas = new Map();

// Ajoute un event à la map, avec un id qui s'incrémente
function addRow(data) {
  const file = fs.readFileSync('./data.json')
  const jsonData = JSON.parse(file)
  datas.set(datas.size, data);
  jsonData.push({"id": jsonData.length, data})
  fs.writeFileSync('data.json', JSON.stringify(jsonData))
}

// Renvoie le dernier event de la map
function getLatestRow() {
  return getRow(datas.size - 1);
}

function getAll(){
  const file = fs.readFileSync('./data.json')
  const jsonData = JSON.parse(file)
  return jsonData
}

// Renvoie un event spécifique
function getRow(id) {
  if (typeof id == "string")
    id = parseInt(id);

  if (id >= datas.size || id < 0)
    return {};

  let toRet = { id };
  toRet.values = datas.get(id) || [];

  return toRet;
}

// Renvoie la liste des events qu'il y a eu depuis l'id passé en paramètre
function getSince(from) {
  let toRet = [];

  if (from >= datas.size || from < 0)
    return { "error": "Invalid range!" };

  for (let i = from; i < datas.size; i++) {
    toRet.push({
      ...getRow(i)
    });
  }

  return toRet;
}

module.exports = {
  addRow: addRow,
  getLatestRow: getLatestRow,
  getSince: getSince,
  getRow: getRow,
  getAll: getAll
}
