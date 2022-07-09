/**************METHOD 1*****************/
/*console.log("This is the first method");*/
/////Listen to global searchbar/////
function globalSearch(){

  /////Dom element
  let globalSearchField = document.getElementById('searchBar');

  /////When main searchbar is used, reset all tags and sort recipes
  globalSearchField.addEventListener('keyup', function(){
    let allUpTags = document.querySelectorAll(".Uptag");
    Array.from(allUpTags).map(element => {element.remove();});    
    //Get user input and convert it in lower case
    let SearchTarget = globalSearchField.value.toLowerCase();
    //Filter recipes
     searchIt(SearchTarget);
  });

  /////Get user input, convert it in lower case & filter recipes
  let SearchTarget = globalSearchField.value.toLowerCase();  
  searchIt(SearchTarget);

/*********************************************/
/**************METHOD 1 START*****************/
/*********************************************/
  ////Filter function/////-------------DONE-------------
  function searchIt(SearchTarget){  
    //Check if there is at least 3 letters
    if(SearchTarget.length >= 3){
      //Filter recipes
      let rData = recipes;
      let filteredArray = rData.filter((item) =>{
        //Check name & description
        let name0 = item.name.toLowerCase();
        let description0 = item.description.toLowerCase();
        if( name0.includes(SearchTarget) || description0.includes(SearchTarget))
        {return item};
        //Check ingredients
        item.ingredients.forEach(function(ing){
          let ing0 = ing.ingredient.toLowerCase();
          if(ing0.includes(SearchTarget)){return item};
        });
      });
      //Use filtered array to instanciate Recipe Class
      rData = filteredArray;
      //Create nex Dom
      appendDom(rData);      
    }    
    //if there isn't at least 3 letters reset Dom
    else{recipeReset();}
  }

/*********************************************/
/**************METHOD 1 END*****************/
/*********************************************/
}

/////Dom appending/////-------------DONE-------------
function appendDom(rData){
  //Dom Reset
  let allTags = document.querySelectorAll(".tag");  
  let allRecipes = document.querySelectorAll("section");
  allTags.forEach(function(element){element.remove();});
  allRecipes.forEach(function(element){element.remove();});
  //Delete doubles
  rData = [...new Set(rData)];
  //append new Dom
  for (let i in rData){
    let newRecipe = new Recipe(
      rData[i].id,
      rData[i].name,
      rData[i].servings,
      rData[i].ingredients,
      rData[i].time,
      rData[i].description,
      rData[i].appliance,
      rData[i].ustensils
    );
    //Create Dom elements from recipe infos
    newRecipe.createAndDisplayRecipes();
  }
  //No match message toggling
  NoMatch();
  //Dropdown Menus & Tags
  menuSearch();
  UpTagsToggling(rData);
}
/////Dom Reset/////-------------DONE-------------
function recipeReset(){
  rData = recipes;
  appendDom(rData);
}
/////No Match message toggling/////-------------DONE-------------
function NoMatch(){
  //No match message toggling
  let allRecipes = document.querySelectorAll("section");  
  let errorMessage = document.getElementById('errorMessage');
  if(allRecipes.length == 0){errorMessage.style.display = 'flex';}
  else{errorMessage.style.display = 'none';}
}