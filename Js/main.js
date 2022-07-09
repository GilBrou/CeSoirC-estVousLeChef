const mainF = async () =>{  
  //Dropdown Menus & Tags
  dropDownMenusToggling();
  //Initialize Dom with all Recipes
  let rData = recipes;
  //Search 
  globalSearch(); 
};

//Initiate Main Function On Page Load
window.onload = mainF;




