// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//save selected dom element in variables
const inquiryDiv = document.querySelector('.inquiry-div');
const feelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
const button = document.getElementById('generate');
const resultDiv = document.querySelector('.result-div');
const backButton = document.querySelector('.back-botton');

// Event listener to add function to existing HTML DOM element
button.addEventListener('click', performAction);
backButton.addEventListener('click', backAction);

/* Function called by event listener */
function performAction(e){
    resultDiv.classList.toggle('result-div');
    inquiryDiv.classList.toggle('result-div');
    const zipCodeValue = zipCode.value;
    const feelingsValue = feelings.value;
   
    getTemp(baseURL,zipCodeValue,apiKey)

    //Post Data
    .then(function(data) {
        postData('/add',{temperature:data.main.temp_max,
             date:newDate, response:feelingsValue});
    })
    //update UI
    .then(function(res){UpdateUX('/all')});
}

/* Function called by event listener */
function backAction(e){
    
    resultDiv.classList.toggle('result-div');
    inquiryDiv.classList.toggle('result-div');

}


// Personal API Key for OpenWeatherMap API

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=345932f1d431e401b998413146797f47';

/* Function to GET Web API Data */

const getTemp = async (baseURL,zip,key)=>{

    let url = `${baseURL}${zip}${key}`;
    const res = await fetch(url);
    
       try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error',error);
    }
}

/* Function to POST data */

const postData = async ( url = '', data = {})=>{
    // console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  /* Function to GET Project Data */
 const UpdateUX = async (url='')=>{
    const request = await fetch(url);
    
    try {
       const allData = await request.json();
        document.querySelector('#date').innerHTML = allData[0].date;
       document.querySelector('#temp').innerHTML = allData[0].temperature;
       document.querySelector('#content').innerHTML = allData[0].response;
    } catch(error){
        console.log('error', error);
    }
}