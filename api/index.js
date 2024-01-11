// Charge le module HTTP
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { writeFile } from 'node:fs/promises';
const host = "localhost";
const port = 8888;
let data= "";

//récupération des chats dans le fichier chats.json
try {
  const filePath = new URL('./recettes.json', import.meta.url);
  var recettes = await readFile(filePath);
} catch (err) {
  console.error(err.message);
}

//fonction qui renvoie les réponses du serveur via POSTMAN
const requestRecettes = function (req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method == "OPTION") {
    res.writeHead(204, headers);
    return;
  }
    switch ((req.url, req.method)) {
      case ("/recettes", "GET"):
        res.writeHead(200, headers);
        res.end(recettes);
        break;
      case ("/recettes", "POST"):
        req.on("data", (chunk) => {
          data = chunk;
        });
        req.on("end", () => {
          recettes = JSON.stringify(JSON.parse(recettes).concat(JSON.parse(data)));
          res.end(recettes);
          //écriture des données dans le fichier
          writeFile('recettes.json', recettes, (err) => {
          if (err) throw err;
            console.log('The file has been saved!');
          });
        });
        res.writeHead(200, headers);
        break;
      case ("/recettes/:id", "PUT"):
        recettesId = req.url.split("/").pop();
        req.on("data", (chunk) => {
          data = chunk;
        });
        req.on("end", () => {
          recettes = JSON.stringify(
            JSON.parse(recettes).map((recettes) => {
              if (recettes.id === recettesId) return JSON.parse(data);
                return recettes;
              })
            );
            res.end(recettes);
          });
        res.writeHead(200, headers);
        break;
      case ("/recettes/:id", "DELETE"):
        recettesId = req.url.split("/").pop();
        recettes = JSON.stringify(
          JSON.parse(recettes).filter((recettes) => recettes.id !== recettesId)
        );
        res.writeHead(200, headers);
        res.end(recettes);
        break;
    }
};

//crée l'objet server qui acceptera les requêtes HTTP 
const server = createServer(requestRecettes);

//démarre le serveur sur le port renseigné
server.listen(port, host, () => {
  console.log(`Server is running on <http://$>{host}:${port}`);
});