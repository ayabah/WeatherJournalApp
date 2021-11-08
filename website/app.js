/* Global Variables */

let city ="";
let country="";
let feelings="";
let d =new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Created API using OpenWeatherMap */
const myAppApi = '74ba2477dae87502cd9b3cdaaa7983a2';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS

function myDate(){
    newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate
}
myDate();
/* using asynchronous function to stop executing until 
the promise is resolved "function myOutPut is executed"
and then run my function */


async function myMainFunc(){
    /* Getting the enteryField and textErea input to use in 
       the API call 
    */
    const enteryField = document.getElementById('zip');
    const zipCode = enteryField.value;
    const feeling = document.getElementById('feelings');
    feelings= feeling.value
   try{
      const stopExe=await myOutPut(zipCode)
   }
   catch(err){
      `there is an error:${err}!!!`
   }
}
generate.addEventListener('click',myMainFunc);

/* API key saved as a const variable
   the API value passed to fetch 
   the info is successfully returned from external API */

   /* using asynchronous function to stop executing until 
the promise is resolved "function postInfo is executed"
and then run my function */

   async function myOutPut(zipCode){
    /* Created API credentials using OpenWeatherMap.com 
   using API call by Zip code */

   // Directives &units=imperial for Fahrenheit has been added as recommended by the reviewer.
   // boilerplate code has been deleted .
    const myUrl =`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myAppApi}&units=imperial`
    const fullInfo = await fetch(myUrl);
    const fullInfoJson = await fullInfo.json();
    country=fullInfoJson.sys.country
    city = fullInfoJson.name;
    const temp = fullInfoJson.main.temp;
    await postInfo(temp);
    return temp
    }
   
    /*
     An async function takes two arguments,
     the URL to make a POST to, and an object holding the data to POST
     */

     async function postInfo(temp){
        await fetch('/saveMyData',{
        method:'POST' ,
        credentials:'same-origin',
        headers:{
        'Content-Type':'application/json'
     },
     /* using the Json.stringify method to convert the data 
        into a string so the app can read it */
     body: JSON.stringify({
     country: country,
     name: city,
     temp: temp,
     date: newDate,
     feelings: feelings
     })
     });
     await endPoint();
}
/*GET Route2:ClientSide>>  an asynchronous function
 to fetch the data from the app endpoint */

 /* using asynchronous function to stop executing until 
the promise is resolved "function endPoint is executed"
and then run my function */

async function endPoint(){
    
    const nodeEnd = await fetch('/myData');
    const nodeJson = await nodeEnd.json();
    /* Div enteryHolder has four children name,temp,date and content 
       to be viewed on the UI */
    let myDivCITY = document.getElementById('name')
     myDivCITY.innerHTML=`Today in  <span style=color:red>${nodeJson.country}</span>  <span style=color:blueviolet>${nodeJson.name}</span>`
     let myDivTemp= document.getElementById('temp')
     myDivTemp.innerHTML=`<h3>Temp: <span style= color:lightblue>${nodeJson.temp}</span> °F<h3>`
   let myDivDate= document.getElementById('date')
    myDivDate.innerHTML=`Date: ${nodeJson.date}`
   let myDivFeelings= document.getElementById('content')
     myDivFeelings.innerHTML= `I feel: ${nodeJson.feelings}`
}

/* 
Four icons were made on the HTML file and called here to manipulate
a function with a set time out was made to change colors from the original order
to a reversed one for one time
*/

function makeFun(){
 
 let myFirstCloud= document.getElementById('white');
 let mySecondCloud= document.getElementById('violet');
 let myUmberlla= document.getElementById('red');
 let mySnow= document.getElementById('blue');

 setTimeout(()=>{
     
    myFirstCloud.style.color='blueviolet';
    mySecondCloud.style.color='red';
    myUmberlla.style.color='lightblue';
    mySnow.style.color='white'
 }, 1000)
 
 setTimeout(() => {
    
    myFirstCloud.style.color='white';
    mySecondCloud.style.color='blueviolet';
    myUmberlla.style.color='red';
    mySnow.style.color='lightblue';    
 }, 2000);
 }
 makeFun();
 
 /*
 using setinterval to repeat the function 
 */

 setInterval(makeFun, 3000);

