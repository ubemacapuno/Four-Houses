document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#sortingHat').addEventListener('click', makeReqRando)

async function makeReq(){ //async function for clicking on #clickMe - Server sends JSON that is dependent on the value provided in #userName

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

async function makeReqRando(){ //async function for clicking on #sortingHat - Server will randomly generate the House JSON (gryffindor, ravenclaw, etc.) 
  const res = await fetch(`/api2`) //fetch request! Unlike the above, there is no query parameter. We are linking this request to the click on #sortingHat. 
  //Server is doing the randomization and sending data!
  const data = await res.json()

  console.log(data);
  alert(`You belong to House . . . ${data.name.toString().toUpperCase()}!!`)
  document.querySelector("#studentName").textContent = data.name
  document.querySelector("#studentTrait").textContent = data.trait
  document.querySelector("#studentAnimal").textContent = data.animal
  document.querySelector("#studentFounder").textContent = data.founder
  document.querySelector("#studentMotto").textContent = data.motto
}

