const api = 'http://localhost:8888';

class Recette {
    constructor(name, description, recette, ingredients) {
        this.name = name;
        this.description = description;
        this.recette = recette;
        this.ingredients = ingredients;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getRecette(){
        return this.recette;
    }
    getIngredients(){
        return this.ingredients;
    }
}
let Recettes = [];
let tempData = [];
let list = [];

function parseRecettes(api) {
    fetch(api)
        .then(function(recette){
            console.log("1er .then")
            let data = recette.json();
            console.log(data)
            return(data);
        })
        .then(function(data){
            console.log("2eme .then")
            console.log(data)
            //for (i=0; i<2; i++) {
                name = data.recette1.name;
                description = data.recette1.description;
                recette = data.recette1.recette;
                ingredients = data.recette1.ingredients;
                let plat = new Recette(name, description, recette, ingredients);
                console.log(plat)
                Recettes.push(plat[1]);
            //}
        })
        .then(function affichage(){
            console.log("3eme .then")
            console.log(Recettes) 
        })
}

/*function listing(list) {
    for (1=0; i < Recettes.length; i++) {

    }
}*/

parseRecettes(api);