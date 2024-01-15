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
            console.log("1er .then");
            let data = recette.json();
            console.log(data);
            return(data);
        })
        .then(function(data){
            console.log("2eme .then");
            console.log(data);
            for (i=0; i<data.recettes.length; i++) {
                name = data.recettes[i].name;
                description = data.recettes[i].description;
                recette = data.recettes[i].recette;
                ingredients = data.recettes[i].ingredients;
                let plat = new Recette(name, description, recette, ingredients);
                for (j=0; j<plat.ingredients.length; j++) {
                    list.push(data.recettes[i].ingredients[j]);
                }
                Recettes.push(plat);
            }
        })
        .then(function affichage(){
            console.log("3eme .then");
            console.log(Recettes);
            console.log("list 1 = " + list);
            checkList(list);
            console.log("list 2 = " + list);
        })
}

function checkList(list) {
    for (i=0; i < list.length; i++) {
        for (j=0; j<list.length; j++) {
            if (list[j] == list[i] && j != i) {
                list.splice(j, 1);
            } else {
                
            }
        }
    }
}

parseRecettes(api);