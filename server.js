//Modules:
//2 ways to make requests in this app from the client: 
//  1: Changing the URL
//  2: Fetch
const http = require('http'); //network access (listen and respond to requests)
const fs = require('fs') //disk access (look at disk, grab files off the drive)
const url = require('url'); //look at the URL as part of the request
const querystring = require('querystring'); //Look at query parameters that are part of the request
const figlet = require('figlet') //ASCI art module

//Classes (Hogwars Houses):
class HogwartsHouse {
  constructor(name,trait,animal,founder,motto){
    this.name = name;
    this.trait = trait;
    this.animal = animal;
    this.founder = founder;
    this.motto = motto;
  }
  greeting(){
    return `I belong to house ${this.name}! Our motto is ${this.motto}`
  }
}
//Hogwarts Houses Objects
// const gryffindor = new HogwartsHouse("Gryffindor", "Bravery", "Lion", "Godric Gryffindor", "Brave at Heart!")
// const ravenclaw = new HogwartsHouse("Ravenclaw", "Wise", "Eagle", "Rowena Ravenclaw", "Of Wit and Learning!")
// const hufflepuff = new HogwartsHouse("Hufflepuff", "Loyal", "Badger", "Helga Hufflepuff", "Just and Loyal!")
// const slytherin = new HogwartsHouse("Slytherin", "Cunning", "Snake", "Salazar Slytherin", "By Any Means!")

//The code below is looking at what is being ASKED, and if understood, it gives a RESPONSE!
//If not understood, it will give error 404! (look around line 72 for 404 error)
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') { //When you type in localhost:8000 in the browser and hit enter, you made a server REQUEST! 
    fs.readFile('index.html', function(err, data) { //The response to the request is 'index.html'
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  //API starts here:
  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'gryffindor'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const gryffindor = new HogwartsHouse("Gryffindor", "Bravery", "Lion", "Godric Gryffindor", "\"Brave at Heart!\"")
        res.end(JSON.stringify(gryffindor));
      }//student = leon
      else if(params['student']== 'ravenclaw'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const ravenclaw = new HogwartsHouse("Ravenclaw", "Wise", "Eagle", "Rowena Ravenclaw", "\"Of Wit and Learning!\"")
        res.end(JSON.stringify(ravenclaw));
      }//student != leon
      else if(params['student']== 'hufflepuff'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const hufflepuff = new HogwartsHouse("Hufflepuff", "Loyal", "Badger", "Helga Hufflepuff", "\"Just and Loyal!\"")
        res.end(JSON.stringify(hufflepuff));
      }//student != leon
      else if(params['student']== 'slytherin'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const slytherin = new HogwartsHouse("Slytherin", "Cunning", "Snake", "Salazar Slytherin", "\"By Any Means!\"")
        res.end(JSON.stringify(slytherin));
      }
      else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "404 Error Not Found!",
        }
        res.end(JSON.stringify(objToJson));
      }
      //student != leon
    }//student if
  }//else if
  //Randomization for API starts here:
  else if (page == `/api2`) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let random = Math.ceil(Math.random() *4)
    let randomHouse = ""
    if (random == 1){
      const gryffindor = new HogwartsHouse("Gryffindor", "Bravery", "Lion", "Godric Gryffindor", "\"Brave at Heart!\"")
      randomHouse = gryffindor
    }else if ( random == 2){
      const ravenclaw = new HogwartsHouse("Ravenclaw", "Wise", "Eagle", "Rowena Ravenclaw", "\"Of Wit and Learning!\"")
      randomHouse = ravenclaw
    }else if ( random == 3){
      const hufflepuff = new HogwartsHouse("Hufflepuff", "Loyal", "Badger", "Helga Hufflepuff", "\"Just and Loyal!\"")
      randomHouse = hufflepuff
    }else if (random == 4){
      const slytherin = new HogwartsHouse("Slytherin", "Cunning", "Snake", "Salazar Slytherin", "\"By Any Means!\"")
      randomHouse = slytherin
    }else{
      randomHouse = "Error with random calculation (server)!"
    }
    res.end(JSON.stringify(randomHouse));
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!!!!!!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
