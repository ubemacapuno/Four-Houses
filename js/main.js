document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#sortingHat').addEventListener('click', makeReqRando)
//Classes only used for Random button!! Not yet sure how to incorporate in server.js!!
class HogwartsHouse {
  constructor(name,trait,animal,founder,motto){
    this.name = name;
    this.trait = trait;
    this.animal = animal;
    this.founder = founder;
    this.motto = motto;
  }
}
const gryffindor = new HogwartsHouse("Gryffindor", "Bravery", "Lion", "Godric Gryffindor", "Brave at Heart!")
const ravenclaw = new HogwartsHouse("Ravenclaw", "Wise", "Eagle", "Rowena Ravenclaw", "Of Wit and Learning!")
const hufflepuff = new HogwartsHouse("Hufflepuff", "Loyal", "Badger", "Helga Hufflepuff", "Just and Loyal!")
const slytherin = new HogwartsHouse("Slytherin", "Cunning", "Snake", "Salazar Slytherin", "By Any Means!")

async function makeReq(){

  const userName = document.querySelector("#userName").value.toLowerCase();
  const res = await fetch(`/api?student=${userName}`) //fetch request! It has a QUERY PARAMETER called "student"
  const data = await res.json()

  console.log(data);
  document.querySelector("#studentName").textContent = data.name
  document.querySelector("#studentTrait").textContent = data.trait
  document.querySelector("#studentAnimal").textContent = data.animal
  document.querySelector("#studentFounder").textContent = data.founder
  document.querySelector("#studentMotto").textContent = data.motto
}

function makeReqRando(){
  let random= Math.ceil(Math.random() *4)
  let randomHouse = ""
  if (random == 1){
    randomHouse = gryffindor
  }else if ( random == 2){
    randomHouse = ravenclaw
  }else if ( random == 3){
    randomHouse = hufflepuff
  }else if (random == 4){
    randomHouse = slytherin
  }else{
    console.log(`ERROR! ${randomHouse}`)
  }
  alert(`You belong to House . . . ${randomHouse.name.toString().toUpperCase()}!!`)
 
  const data = randomHouse;
  document.querySelector("#studentName").textContent = data.name
  document.querySelector("#studentTrait").textContent = data.trait
  document.querySelector("#studentAnimal").textContent = data.animal
  document.querySelector("#studentFounder").textContent = data.founder
  document.querySelector("#studentMotto").textContent = data.motto
  document.querySelector("#userName").value = ""
}

