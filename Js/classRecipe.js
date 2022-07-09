/////Recipe Class Creation/////
class Recipe {
  constructor(id, name, servings, ingredients, time, description, appliance, ustensils){
    this.id = id;
    this.name = name;    
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  //Create And Display into Dom Recipe's Cards
  createAndDisplayRecipes(){

    //Dom elements
    const main = document.getElementById('main-section');

    //Dom element creation
    let recipeSection = document.createElement('section');
    let recipeIllus = document.createElement('img');
    let recipeHeader = document.createElement('div');
    let recipeTitle = document.createElement('h1');
    let timer = document.createElement('div');
    let timeimg = document.createElement('img');
    let timeText = document.createElement('p');
    let recipe = document.createElement('article');
    let recipeLeft = document.createElement('div');
    let recipeRight = document.createElement('div');
    let recipeRightP = document.createElement('p');

    //Dom appending    
    main.appendChild(recipeSection);
    recipeSection.appendChild(recipeIllus);
    recipeSection.appendChild(recipeHeader);
    recipeHeader.appendChild(recipeTitle);
    recipeHeader.appendChild(timer);
    timer.appendChild(timeimg);
    timer.appendChild(timeText);
    recipeSection.appendChild(recipe);
    recipe.appendChild(recipeLeft);
    recipe.appendChild(recipeRight);
    recipeRight.appendChild(recipeRightP);

    //Assing to Dom    
    recipeIllus.src = "Ressources/CookingIllus.jpg";
    recipeIllus.alt = "Illustration de recette";
    recipeTitle.innerHTML = this.name;
    timeimg.src = "Ressources/chrono.png";
    timeimg.alt = "Chronomètre";    
    timeText.innerHTML = this.time + " " + "min.";
    let trimmedString = this.description.substring(0, 180);
    recipeRightP.innerHTML = trimmedString + "...";
    
    //Display Ingredients
    let Allingredients = [];
    Allingredients.push(this.ingredients);
    for (let i in Allingredients){
      let those = Allingredients[i];
      for(let i in those){
        let recipeLine = document.createElement('div');
        let recipeIngredients = document.createElement('p');        
        recipeLeft.appendChild(recipeLine);
        recipeLine.appendChild(recipeIngredients);
        let recipeProportions = document.createElement('p');
        recipeLine.appendChild(recipeProportions);
        if(those[i].unit == undefined){recipeProportions.innerHTML = ":" + " " + those[i].quantity;}
        else{recipeProportions.innerHTML = ":" + " " + those[i].quantity + " " + those[i].unit;}         
        recipeIngredients.innerHTML = those[i].ingredient;
        recipeIngredients.classList.add("recipeIngredients");
        recipeProportions.classList.add("recipeProportions");
        recipeLine.classList.add("recipeLine");
        if(those[i].quantity == undefined){
          recipeLine.removeChild(recipeProportions);
          recipeIngredients.innerHTML = those[i].ingredient;
        }        
      }
    }
    
    //Assign classes or ids to Dom elements    
    recipeHeader.classList.add("recipeHeader");
    timer.classList.add("timer");
    recipeLeft.classList.add("recipeLeft");    
    recipeRight.classList.add("recipeRight");
    recipeSection.id = this.id;

    //Adding menu tags
    this.addingTagsToMenus() ;
  }

  //Create And Display tags into menu 
  addingTagsToMenus(){ 
  
    /////Displaying this Ingredients in Ingredients menu tags
    let IngredientsMenu = document.getElementById('ingredients').querySelector('.ulWrapper');  
    for( let i in this.ingredients){ 
      if ( this.ingredients[i] != undefined){
        let tag = document.createElement('p');
        tag.classList.add('tag', "ing");
        IngredientsMenu.appendChild(tag);
        tag.innerHTML = this.ingredients[i].ingredient;  
        tag.innerHTML =  tag.innerHTML.toLowerCase();
      }
    }

    /////Displaying this appliances in aplliances menu tags
    let appliancesMenu = document.getElementById('appareil').querySelector('.ulWrapper');
      if ( this.appliance != undefined){
        let tag = document.createElement('p');
        tag.classList.add('tag', "app");
        appliancesMenu.appendChild(tag);
        tag.innerHTML = this.appliance;  
        tag.innerHTML =  tag.innerHTML.toLowerCase();
      }    

    /////Displaying this utensils in Utensils menu tags
    let ustensilesMenu = document.getElementById('ustensiles').querySelector('.ulWrapper');
    for( let i in this.ustensils){ 
      if ( this.ustensils[i] != undefined){
        let tag = document.createElement('p');
        tag.classList.add('tag', "us");
        ustensilesMenu.appendChild(tag);
        tag.innerHTML = this.ustensils[i];                  
        tag.innerHTML =  tag.innerHTML.toLowerCase();
      }
    }
    menuSettings();
  } 
}