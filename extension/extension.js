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
            checkList(list);
            console.log(list);
        })
        .then(function changeColor(){
            changeWords();
        })
}

function checkList(mots) {
    for (i=0; i < mots.length; i++) {
        for (j=0; j<mots.length; j++) {
            if (mots[j] == mots[i] && j != i) {
                mots.splice(j, 1);
            } else {
                
            }
        }
    }
}

function changeWords() {
    const elements = document.getElementsByTagName("*");
    for (i=0; i<elements.length; i++) {
        console.log(elements[i])
        if (elements[i] == "text de test pour l'extension") {
            console.log("ok");
        }else {
            console.log("pas ok");
        }
    }
}

parseRecettes(api);