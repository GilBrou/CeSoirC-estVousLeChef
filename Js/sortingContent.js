/////Menus Settings/////-------------DONE-------------
function menuSettings(){
  /////for Ingredients menu
  let IngredientsTags = document.getElementById('ingredients').querySelectorAll('.ing');
  let IngredientsMenu = document.getElementById('ingredients').querySelector('.ulWrapper');  
  let tagText = [];
  for (let i in IngredientsTags){tagText.push(IngredientsTags[i].innerText);}
  IngredientsTags.forEach(function(element){element.remove();});
  tagText = [...new Set(tagText)];
  for (let i in tagText){
     if (tagText[i] != undefined){    
      let tag = document.createElement('p');
      tag.classList.add('tag', "ing");
      IngredientsMenu.appendChild(tag);
      tag.id = tagText[i];
      tag.innerHTML = tagText[i];
      if (i > 29){ tag.style.display = "none";}
    }
  }
  /////for Appliances menu
  let appliancesTags = document.getElementById('appareil').querySelectorAll('.app');
  let appliancesMenu = document.getElementById('appareil').querySelector('.ulWrapper');  
  let tagText2 = [];
  for (let i in appliancesTags){tagText2.push(appliancesTags[i].innerText);}
  appliancesTags.forEach(function(element){element.remove();});
  tagText2 = [...new Set(tagText2)];
  for (let i in tagText2){
    if (tagText2[i] != undefined){
      let tag = document.createElement('p');
      tag.classList.add('tag', "app");
      appliancesMenu.appendChild(tag);
      tag.id = tagText2[i];
      tag.innerHTML = tagText2[i]; 
      if (i > 29){ tag.style.display = "none";}
     }
  }
  /////for Utensils menu
  let ustensilesTags = document.getElementById('ustensiles').querySelectorAll('.us');
  let ustensilesMenu = document.getElementById('ustensiles').querySelector('.ulWrapper');  
  let tagText3 = [];
  for (let i in ustensilesTags){tagText3.push(ustensilesTags[i].innerText);}
  ustensilesTags.forEach(function(element){element.remove();});
  tagText3 = [...new Set(tagText3)];
  for (let i in tagText3){
    if (tagText3[i] != undefined){
      let tag = document.createElement('p');
      tag.classList.add('tag', "us");
      ustensilesMenu.appendChild(tag);
      tag.id = tagText3[i];
      tag.innerHTML = tagText3[i]; 
      if (i > 29){ tag.style.display = "none";}
     }
  }
}  
/////Menu Dropdown event listennng and displaying/////-------------DONE-------------
function dropDownMenusToggling(){
  /////Dom elements
  let ingMenu = document.getElementById('ingredients');
  let appMenu = document.getElementById('appareil');
  let usMenu = document.getElementById('ustensiles');
  let searchI = document.getElementById('searchI');  
  let searchA = document.getElementById('searchA');
  let searchU = document.getElementById('searchU');
  let ingWrapper = document.getElementById('IWrapper');
  let appWrapper = document.getElementById('AWrapper');
  let usWrapper = document.getElementById('UWrapper');
  let ingSearch = document.getElementById('searchIngredients');
  let appSearch = document.getElementById('searchApparels');
  let usSearch = document.getElementById('searchUtensils');
  /////Variables
  let allSearchFields = [ingSearch, appSearch, usSearch];
  let allClickablesForMenus = [ ingMenu, appMenu, usMenu, searchI, searchA, searchU, ingWrapper, appWrapper, usWrapper, ingSearch, appSearch, usSearch];
  /////Toggle & Untoggle menu dropdowns
  allClickablesForMenus.forEach(function(){addEventListener("click", clickMenu);});
  function clickMenu(){
    //If menu is clicked
    if (event.target.classList.contains('menu')){event.target.classList.toggle("clickedMenu");}
    //If wrapper div is clicked
    else if(event.target.classList.contains('wrapper')){event.target.parentNode.classList.toggle("clickedMenu");}
    //If label is clicked
    else if(event.target.id == 'searchI' || event.target.id  == 'searchA' || event.target.id  == 'searchU'){event.target.parentNode.parentNode.classList.toggle("clickedMenu");}   
    //Removing label and displaying search field  
    //for Ingredients menu
    if(ingMenu.classList.contains('clickedMenu')){ ingSearch.style.display = "flex"; searchI.style.display = "none";} 
    //for Appliances menu
    if(appMenu.classList.contains('clickedMenu')){appSearch.style.display = "flex"; searchA.style.display = "none";} 
    //for Utensils menu
    if(usMenu.classList.contains('clickedMenu')){usSearch.style.display = "flex"; searchU.style.display = "none";}   
  }
  /////Close menus on elsewhere click, Removing search fields and displaying labels
  document.addEventListener("click", (e) => {
    //for Ingredients menu
    if (ingMenu.contains(e.target) == false){
      ingMenu.classList.remove('clickedMenu');
      ingSearch.style.display = "none";
      searchI.style.display = "flex";
      Search = ingSearch;
      noMatch =  document.getElementById('noMatchI');
      theseTag = document.getElementById('ingredients').querySelectorAll('.ing');
      resetMenuSearch(Search, noMatch, theseTag);
    }
    //for Appliances menu
    if (appMenu.contains(e.target) == false){
      appMenu.classList.remove('clickedMenu')
      appSearch.style.display = "none";
      searchA.style.display = "flex";
      Search = appSearch;
      noMatch =  document.getElementById('noMatchA');
      theseTag = document.getElementById('appareil').querySelectorAll('.app');
      resetMenuSearch(Search, noMatch, theseTag);
    }
    //for Utensils menu
    if (usMenu.contains(e.target) == false){
      usMenu.classList.remove('clickedMenu')
      usSearch.style.display = "none";
      searchU.style.display = "flex";
      Search = usSearch;
      noMatch =  document.getElementById('noMatchU');
      theseTag = document.getElementById('ustensiles').querySelectorAll('.us');
      resetMenuSearch(Search, noMatch, theseTag);
    }
  });
}
/////Menus Search/////-------------DONE-------------
function menuSearch() {
  /////Dom elements
  noMatchI = document.getElementById('noMatchI');
  noMatchA = document.getElementById('noMatchA');
  noMatchU = document.getElementById('noMatchU');
  let searchIngredients = document.getElementById('searchIngredients');
  let searchApparels = document.getElementById('searchApparels');
  let searchUtensils = document.getElementById('searchUtensils');
  let ingredientsTags = document.getElementById('ingredients').querySelectorAll('.ing');
  let appliancesTags = document.getElementById('appareil').querySelectorAll('.app');
  let utensilsTags = document.getElementById('ustensiles').querySelectorAll('.us');
  /////Events  
  searchIngredients.addEventListener('keyup', e => {searchTags(e, ingredientsTags, noMatchI);});
  searchApparels.addEventListener('keyup', e => {searchTags(e, appliancesTags, noMatchA);});
  searchUtensils.addEventListener('keyup', e => {searchTags(e, utensilsTags, noMatchU);});
  /////Filter tags
  function searchTags (e, theseTag, noMatch){
    event.preventDefault();      
    let SearchTarget = e.target.value;
    let SearchId = e.target.id;
    if(SearchTarget.length >= 3){
      let Length = 0;
      theseTag.forEach(function(element){
        if (element.id.includes(SearchTarget)){
          element.style.display = "flex";
          Length++
        }
        else{element.style.display = "none";}
      });
      if(Length == 0){noMatch.style.display=" flex";}
      else{noMatch.style.display=" none";}
    }
    else if (SearchTarget.length < 3){
      noMatch.style.display=" none";
      let N = 0;
      theseTag.forEach(function(element){
        if (N < 29){
          element.style.display = "flex";
          N++;
        }
        else{element.style.display = "none";}
      });               
    }
  }
}
/////Reset shearch fields/////-------------DONE-------------
function resetMenuSearch(search, noMatch,theseTag){
  search.value = "";
  noMatch.style.display=" none";
  let N = 0;
  theseTag.forEach(function(element){
    if (N < 29){element.style.display = "flex";N++;}
    else{element.style.display = "none";}
  }); 
};
/////Create Up tags when user select menu tag/////-------------DONE-------------
function UpTagsToggling(rData){
  /////Dom elements
  let alltags = document.querySelectorAll(".tag");
  let tagList = document.getElementById("taglist"); 
  let allUpTags = document.querySelectorAll(".Uptag");
  /////event listenning
  Array.from(alltags).map(element =>{
    element.addEventListener("click", function(){
      let thisId = event.target.id; 
      if(allUpTags.length > 0){
        allUpTags.forEach(function(UT){
          let thatId = UT.id;
          if( thatId != thisId){appendIt(element, thisId);}
          //remove tag if duplicate   
          else { UT.remove();}
        });
      } else {appendIt(element, thisId);}
    });
  });
  /////Up tags creations
  function appendIt(element, thisId){
    //Append new Tag
    let targetParent0 = event.target.parentNode;
    if (targetParent0 != null){
      let targetParent = targetParent0.parentNode.id;
      let newTag = document.createElement("button");
      let newP = document.createElement("p");
      newTag.appendChild(newP);
      let newImg = document.createElement("img");
      newImg.src = "Ressources/quit.png";
      newTag.appendChild(newImg);
      newP.innerHTML = element.innerHTML;
      newTag.classList.add('Uptag', 'btn');
      newTag.id = thisId;
      if(targetParent == "ingredients"){newTag.style.backgroundColor = "#3282f7"; newTag.classList.add('ing');}
      else if(targetParent == "appareil"){newTag.style.backgroundColor = "#68d9a4"; newTag.classList.add('app');}
      else if(targetParent == "ustensiles"){newTag.style.backgroundColor = "#ed6454"; newTag.classList.add('us');};
      tagList.appendChild(newTag);
      checkTagList(rData);
    }
  }
}

/////check current TagList for sorting recipes/////
function checkTagList(rData){
  //Dom elements  
  let allUpTags = document.querySelectorAll(".Uptag");
  let tagList = document.getElementById("taglist");   
  //remove UpTags when clicked
  Array.from(allUpTags).map(element => {
    element.addEventListener("click", function(){
      element.remove();
      sortTaggedContent(rData);
    });
  });
  //Sort recipe by user selected tags
  sortTaggedContent(rData);    
}
/////Listen to clicked tags and display the accordings recipes/////-------------DONE-------------
function sortTaggedContent(rData){
  /////Dom elements
  let allUpTags = document.querySelectorAll(".Uptag");
  /////Sort Recipes if at least one tag is selected
  if(allUpTags.length > 0){    
    /////Sorting Arrays
    let allConditions = [];  
    let ResultArray= [];  
    allUpTags.forEach(function(element){allConditions.push(element)});    
    /////Sorting by tags      
    for(let i in allConditions){
      eType = allConditions[i].className;
      element = allConditions[i].innerText.toUpperCase();
      if(i == 0){          
        rData.filter((item) => {
          let valid = 0;
          //name, description
          if(item.name.toUpperCase().includes(element)||item.description.toUpperCase().includes(element)){valid++}             
          //ingredients
          if(eType.includes("ing")){item.ingredients.forEach(function(R){if(R.ingredient.toUpperCase().includes(element)){valid++}});}
          //appliances
          if(eType.includes("app")){if(item.appliance.toUpperCase().includes(element)){valid++}}
          //utensils
          if(eType.includes("us")){item.ustensils.forEach(function(R){if(R.toUpperCase().includes(element)){valid++}});}
          if(valid > 0){ResultArray.push(item)}          
        });
      }
      else if(i >= 1){        
        ResultArray.filter((item) => {
          let itemIndex = ResultArray.indexOf('item')
          let valid = 0;
          //name, description
          if(item.name.toUpperCase().includes(element)||item.description.toUpperCase().includes(element)){valid++}             
          //ingredients
          if(eType.includes("ing")){item.ingredients.forEach(function(R){if(R.ingredient.toUpperCase().includes(element)){valid++}});}
          //appliances
          if(eType.includes("app")){if(item.appliance.toUpperCase().includes(element)){valid++}}
          //utensils
          if(eType.includes("us")){item.ustensils.forEach(function(R){if(R.toUpperCase().includes(element)){valid++}});}
          if(valid == 0){ResultArray.splice(itemIndex, 1)
          }        
        });
      }
      //Use filtered array to instanciate Recipe Class
      rData = ResultArray;
      //Create nex Dom
      appendDom(rData);
      UpTagsToggling(rData);
    }
  }
  else{
    let rData = recipes;
    globalSearch(rData)
  }
  //No match message toggling
  NoMatch(); 
}
