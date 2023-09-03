let rowData = document.getElementById("rowData");
let search = document.getElementById("search");
let loadingScreen = document.querySelector('.loadingScreen')
let submitBtn = document.getElementById("submitBtn")
let nameInput =document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput =document.getElementById("phoneInput")
let ageInput =document.getElementById("ageInput")
let passwordInput =document.getElementById("passwordInput")
let repasswordInput = document.getElementById("repasswordInput")
let nameAlert = document.getElementById("nameAlert")
let emailAlert =document.getElementById("emailAlert")
let phoneAlert = document.getElementById("phoneAlert")
let ageAlert  =document.getElementById("ageAlert")
let passwordAlert  = document.getElementById("passwordAlert")
let repasswordAlert =document.getElementById("repasswordAlert")
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//^ var for validation
let ageInputTest = false;
let passwordInputTest = false;
let nameInputTest = false;
let emailInputTest = false;
let phoneInputTest = false;
let repasswordInputTest = false;
//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>......

let regexName = /^[A-Za-z]{1,}$/
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
let regexpassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/




//*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(document).ready(() => {
  searchByName("").then(() => {
    $('#loading').fadeOut(500)
      $("body").css("overflow", "visible")

  })
})


  //^loading
  $(".spinner").fadeOut(500, function () {
    $('#loading').fadeOut(500 , function() {
        $('body').css('overflow' , 'visible');
        $('#loading').remove();
    });
}) 


let sideBarWidth = $('.sideBar-inner').innerWidth();
$("#sideBar").css("left" , -sideBarWidth ); 


// $("a[href^='#']").click(function (e) { 
//   let aHref = e.target.getAttribute('href');
//   let sectionAboutOffset =$(aHref).offset().top;  
//   $("html , body").animate({scrollTop:sectionAboutOffset} , 1000)
  
//  })


 $('#sideBar').click(function(){
 
  let sideBarWidth = $('.sideBar-inner').innerWidth();
  if ($("#sideBar").css('left') == "0px" )
   {
      $("#sideBar").animate({left:-sideBarWidth} , 500)
   
      $(".openicon").click(function(){
        $(".openicon").removeClass("fa-bars");
      $(".openicon").addClass("fa-x");
       $(".navLink li a").animate({ top: 300} , 500)
      
      })
   
  }
  else
  {
       $("#sideBar").animate({left:'0px'} , 500)
        $(".openicon").click(function(){
      
        
      $(".openicon").removeClass("fa-x");
    $(".openicon").addClass("fa-bars");
    
    })
  }
 
 })

 function openSideanim(){
  if ($("#sideBar").css('left') == "0px" ){
    for (let i = 0; i < navbarMenu.length; i++) {
            $(".navLink li ").eq(i).animate({top: 0}, (i + 5) * 100)
          
         }
  }  else{
    $(".navLink li ").animate({ top: 300} , 500)
  }
 }

 



//^ animation nav

// $(".sideBar").click(function(){
//   if ($(".sideBar").css("left") == "0px"){
//      for (let i = 0; i < 5; i++) {
//     $(".navLink li a").eq(i).animate({top: -10}, (i + 5) * 100)

//  }
//   }else{
//     $(".navLink li a").animate({ top: 300} , 500)
//   }

// })

function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getMealDet('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="caption position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }

  rowData.innerHTML = cartoona
}





async function getCategorie(){
   rowData.innerHTML = "";
  $(".loadingScreen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let  responseResult = await response.json()
  // console.log(responseResult);
  displayCategories(responseResult.categories)
  $(".loadingScreen").fadeOut(300)


}
getCategorie();

function displayCategories(arr){
  let cartoona=``;
  for(let i=0;i<arr.length ;i++){
    cartoona += `<div class="col-md-3">
    <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="inner position-relative overflow-hidden top-0 rounded-2 cursor-pointer">
      <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
      <div class="caption position-absolute  text-center text-black p-2">
      <h3>${arr[i].strCategory}</h3>
        <p>${arr[i].strCategoryDescription.substring(0,30)}</p>
      </div>
    
    </div>
    
    </div> `
  }
  rowData.innerHTML =cartoona;
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".loadingScreen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".loadingScreen").fadeOut(300)

}
async function getArea(){
  rowData.innerHTML = "";
  $(".loadingScreen").slideUp(300);
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let  responseResult = await respone.json()
    //  console.log(responseResult.meals);

    displayArea(responseResult.meals)
    $(".loadingScreen").fadeOut(300)

}
function displayArea(arr){
  let cartoona = "";
  for (let i = 0; i < arr.length; i++){
    cartoona += `<div class="col-md-3">
    <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
    </div>
</div>`
  }



  rowData.innerHTML = cartoona;
}

async function getInGredients(){
  rowData.innerHTML = "";
  $(".loadingScreen").fadeIn(300);
  search.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  respone = await respone.json()
    console.log(respone);

    displayIngredients( respone.meals.slice(0, 20))
    $(".loadingScreen").fadeOut(300)

}
function displayIngredients(arr){
  let cartoona = ``;
  for (let i = 0; i < arr.length; i++){
     cartoona += `<div class="col-md-3">
     <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center ">
             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
             <h3>${arr[i].strIngredient}</h3>
             <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
     </div>
</div>`
  }
  rowData.innerHTML = cartoona;
}




async function getCategoryMeals(category) {
  rowData.innerHTML = ""
  $(".loadingScreen").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let  responseResult = await response.json()
  displayMeals(responseResult.meals.slice(0, 20))
  $(".loadingScreen").fadeOut(300)

}



async function getAreaMeals(area) {
  rowData.innerHTML = ""
  $(".loadingScreen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let  responseResult = await response.json()


  displayMeals(responseResult.meals.slice(0, 20))
  $(".loadingScreen").fadeOut(300)

}



async function getIngredientsMeals(ingredients){
  rowData.innerHTML = ""
  $(".loadingScreen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  let  responseResult = await response.json()
 // console.log(responseResult.meals);

 displayMeals(responseResult.meals.slice(0, 20))
  $(".loadingScreen").fadeOut(300)

}

async function getMealDet(mealID) {

  rowData.innerHTML = ""
  $("loadingScreen").fadeIn(300)

  search.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let responeResult = await respone.json();

  displayMealDet(responeResult.meals[0])
  $("loadingScreen").fadeOut(300)

}

function displayMealDet(meal) {
    
  search.innerHTML = "";


  let ingredients = ``

  for (let i = 1; i <= 20; i++) 
  {
      if (meal[`strIngredient${i}`]) {

        ingredients += `
          <li class=" text-center fw-bolder alert alert-warning m-3 p-3">

          ${meal[`strMeasure${i}`]}
          ${meal[`strIngredient${i}`]}

          </li>`
      }
  }

  let tagsMeal = meal.strTags?.split(",")
  if (!tagsMeal) tagsMeal = []

  let str = ''
  for (let i = 0; i < tagsMeal.length; i++) {
    str += `
      <li class="alert alert-danger m-2 p-1">${tagsMeal[i]}</li>`
  }



  let cartoona = `
  <div class="col-md-4 d-flex flex-column align-items-center justify-content-center">
    <h2 class= >${meal.strMeal}</h2>
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"alt="">
          </div>
           <div class="col-md-8">
      <h2>Instructions</h2>
      <p class="lead">${meal.strInstructions}</p>
      <h3><span class="fw-bolder pt-3"> Area:  </span>${meal.strArea}</h3>
      <h3><span class=" pt-3 fw-bolder"> Category:  </span>${meal.strCategory}</h3>
      <h3>Recipes :</h3>
      <ul class=" d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>

      <h3>Tags :</h3>

      <ul class=" d-flex g-3 flex-wrap">
        ${str}

      </ul>

      <a target="_blank" href="#" class="btn btn-warning p-2">Source</a>
      <a target="_blank" href="#" class="btn btn-danger p-2">Youtube</a>
  </div>
          
        `

  rowData.innerHTML = cartoona
}





function showSearchInputs() {
  search.innerHTML = `
  <div class="row py-4 ">
            <div class="col-md-6">
              <input onkeyup="searchByName(this.value)" class="form-control fs-5 p-3 text-white fw-bold bg-transparent" type="text" placeholder="Search By Name" >
            </div>
            <div class="col-md-6">
              <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control  text-white fs-5 p-3 fw-bold bg-transparent text-white" type="text" placeholder="Search By First Letter" >
            </div>

          </div>`

  rowData.innerHTML = ""
}


async function searchByName(term) {
 
  rowData.innerHTML = ""
  $(".loadingScreen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  let  responseResult = await response.json()
 
   responseResult.meals ? displayMeals(responseResult.meals) : displayMeals([])
  $(".loadingScreen").fadeOut(300)

}

async function searchByFLetter(term) {

  rowData.innerHTML = ""
  $("loadingScreen").fadeIn(300)

  term == "" ? term = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  let  responseResult = await response.json()

  responseResult.meals ? displayMeals(responseResult.meals) : displayMeals([])
  $("loadingScreen").fadeOut(300)

}






function showContacts() {
  rowData.innerHTML= ` <div class="contact min-vh-100 d-flex justify-content-center align-items-center"onkeyup="inputsValidation()">
  <div class="container w-75 text-center border border-warning p-5">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput"  type="text" class="form-control  p-3" placeholder="Enter Your Name"onkeyup="inputsValidation()">
              <div id="nameAlert" class="alert alert-warning w-100 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput"  type="email" class="form-control p-3" placeholder="Enter Your Email"onkeyup="inputsValidation()">
              <div id="emailAlert" class="alert alert-warning w-100 d-none ">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput"  type="text" class="form-control p-3" placeholder="Enter Your Phone"onkeyup="inputsValidation()">
              <div id="phoneAlert" class="alert alert-warning w-100 d-none ">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput"  type="number" class="form-control p-3" placeholder="Enter Your Age"onkeyup="inputsValidation()">
              <div id="ageAlert" class="alert alert-warning w-100 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput"  type="password" class="form-control p-3" placeholder="Enter Your Password"onkeyup="inputsValidation()">
              <div id="passwordAlert" class="alert alert-warning w-100 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" type="password" class="form-control p-3" placeholder="Repassword"onkeyup="inputsValidation()">
              <div id="repasswordAlert" class="alert alert-warning w-100 d-none ">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-warning px-2 mt-3">Submit</button>
  </div>
 </div>`


 $("#nameInput").click(function() {
        nameInputTest = true
    })

    $("#emailInput").click (function() {
        emailInputTest = true
    })

    $("#phoneInput").click (function(){
        phoneInputTest = true
    })

    $("#ageInput").click ( function() {
        ageInputTest = true
    })

    $("#passwordInput").click ( function() {
        passwordInputTest = true
    })

    $("#repasswordInput").click( function() {
        repasswordInputTest = true
    })
}
 
 


function inputsValidation() {
  if (nameInputTest) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailInputTest) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneInputTest) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageInputTest) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordInputTest) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordInputTest) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&     emailValidation() &&phoneValidation() &&ageValidation() && passwordValidation() && repasswordValidation()) 
  {
  submitBtn.removeAttribute("disabled")
  
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}


function nameValidation() {
  return (regexName.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (regexEmail.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (regexPhone.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (regexAge.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (regexpassword.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

















//!check code >>>>>>>>>>>>>>>>>>>>>>>>>?
// let regexName = /^[A-Za-z]{1,}$/
// let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
// let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
// let regexpassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/


// nameInput.onkeyup = function(){
//   if(nameValidation() ==true){

//      nameAlert.classList.replace("d-block", "d-none")
     
//   }else{
//      nameAlert.classList.replace("d-none", "d-block")
     
//   }
// }

// emailInput.onkeyup = function () {
// if(emailValidation() ==true)
// {
//  emailAlert.classList.replace("d-block", "d-none")
// }else {
//   emailAlert.classList.replace("d-none", "d-block")
// }
// }

// phoneInput.onkeyup = function () {
// if(phoneValidation() ==true)
// {
//   phoneAlert.classList.replace("d-block", "d-none")
// }else {
//   phoneAlert.classList.replace("d-none", "d-block")
// }
// }

// ageInput.onkeyup = function () {
// if(ageValidation() ==true)
// {
//   ageAlert.classList.replace("d-block", "d-none")
// }else {
//   ageAlert.classList.replace("d-none", "d-block")
// }
// }

// repasswordInput.onkeyup = function () {
// if(repasswordValidation() ==true)
// {
//   repasswordAlert.classList.replace("d-block", "d-none")
// }else {
//   repasswordAlert.classList.replace("d-none", "d-block")
// }
// }


// if (nameValidation() &&  emailValidation() && phoneValidation() &&  ageValidation() &&  repasswordValidation() && passwordValidation()  == true)
// {
// submitBtn.removeAttribute("disabled")

// } else {
//   submitBtn.setAttribute("disabled", true)
// }




// function inputsValidation(){

//   if(nameValidation() ==true)
//   {
//     "nameAlert.classList.replace("d-block", "d-none")
//   }else {
//     nameAlert.classList.replace("d-none", "d-block")
//   }

//   if(emailValidation() ==true)
//   {
//     emailAlert.classList.replace("d-block", "d-none")
//   }else {
//     emailAlert.classList.replace("d-none", "d-block")
//   }

//     if(phoneValidation() ==true)
//   {
//     phoneAlert.classList.replace("d-block", "d-none")
//   }else {
//     phoneAlert.classList.replace("d-none", "d-block")
//   }

//       if(ageValidation() ==true)
//   {
//     ageAlert.classList.replace("d-block", "d-none")
//   }
//   else {
//     ageAlert.classList.replace("d-none", "d-block")
//   }

//   if(passwordValidation() ==true)
//   {
//     passwordAlert.classList.replace("d-block", "d-none")
//   }
//   else {
//     passwordAlert.classList.replace("d-none", "d-block")
//   }

//    if(repasswordValidation() ==true)
//   {
//     repasswordAlert.classList.replace("d-block", "d-none")
//   }
//   else {
//     repasswordAlert.classList.replace("d-none", "d-block")
//   }

//   if (nameValidation() &&  emailValidation() && phoneValidation() &&  ageValidation() &&  repasswordValidation() && passwordValidation()  == true)
//  {
//   submitBtn.removeAttribute("disabled")
  
//   } else {
//       submitBtn.setAttribute("disabled", true)
//   }



// }





// function nameValidation(){
//   if(regexName.test(nameInput.value)){
//       return true;
//   }else{
      
//       return false;
// }   
 
// }

// function emailValidation(){
//   if(regexEmail.test(emailInput.value)){
   
//       return true;
      
//   }else{
      
//       return false;
      
// }   
 
// }

// function phoneValidation(){
//   if(regexPhone.test(phoneInput.value)){
   
//       return true;
      
//   }else{
      
//       return false;
      
// }   
 
// }

// function ageValidation(){
//   if(regexAge.test(ageInput.value)){
   
//       return true;
      
//   }else{
      
//       return false;
      
// }   
 
// }


// function passwordValidation(){
//   if(regexpassword.test(passwordInput.value)){
   
//       return true;
      
//   }else{
//       return false;
// }   
 
// }



// function repasswordValidation() {
//   if(repasswordInput.value ==passwordInput.value){
//     return true;
//   } else{
//     return false;
//   }
   

// }  