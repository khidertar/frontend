(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form");
fruitForm.addEventListener("submit", extractFruit);

function extractFruit(e) {
  e.preventDefault(); //stops page from refreshing
  //addFruit(e.target[0].value);
  // e being the submit info, target, first array, then "value" is the key for value mango
  fetchFruitData(e.target[0].value);
  e.target[0].value = ""; //clears the form
}

const fetchFruitData = async (fruit) => {
    try {
        const response = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`) //promise that is pending from fruity api
        if(response.ok){
            const data = await response.json()
            addFruit(data)
        } else{
            throw "Error: http status code = " + response.status
        }
    } catch(err) {
        console.log(err);
    }
}

function processResponse(resp) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw "Error: http status code = " + resp.status;
  }
}

const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

let calories = 0;
let fruitCal = {}

function addFruit(fruit) {
  //li.textContent = fruit
  if (!fruit) {
    console.log("Invalid!");
  } else {
    const li = document.createElement("li");
    li.addEventListener("click", removeFruit, {once:true})
    li.textContent = fruit["name"];  //gets the key name, and changes text to the value
    fruitList.appendChild(li);

    fruitCal[fruit.name] = fruit.nutritions.calories
    calories += fruit.nutritions.calories;
    fruitNutrition.textContent = calories;
    console.log(fruitCal);

  }
}

function removeFruit(e){
    const fruitName = e.target.textContent
    calories -= fruitCal[fruitName]
    fruitNutrition.textContent = calories

    delete fruitCal[fruitName]


    e.target.remove()
}

// may have to rebundle (npm run "script") if changes are not working in console

},{}]},{},[1]);
