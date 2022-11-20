/* Global Variables */
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
let checkBox = document.getElementById("otherCountries");
let other = document.getElementById("other");
let usa=document.getElementById("USA");
const countryDict={};
// Personal API Key for OpenWeatherMap API
const BaseURL='https://api.openweathermap.org/data/2.5/weather?'
const apiKey = 'a185278e72bea975e73b1671b02d7e28&units=imperial';

// show and hide div when check 'other counteries' input
function showHide() {
    let other = document.getElementById("other");
    let usa=document.getElementById("USA");
    if (checkBox.checked == true){
        other.style.display = "block";
        usa.style.display = "none";
    } else {
        usa.style.display = "block";
        other.style.display = "none";
    }
}

// read local 'city.list.json' file => convert it to json notation
const selectedCoord={};
fetch('./city.list.json')
.then(res=>{return res.json()})
.then(res=>{
    // construct a dictionary with countries
    //  names=> keys 
    // & a list of cities names with their coordinates => value
    for(const ans of res){
        let city = ans.name;
        let elemDict = {};
        elemDict[city] = ans.coord;
        let country=ans.country;
        try{
            countryDict[country].push(elemDict);
        }catch{
            countryDict[country]=[elemDict];
        } 
    }

    // add countries names to first <select> element
    const selectElem=document.getElementById('countryList');
    for(const key of Object.keys(countryDict).sort()){
        // remove empty entry
        if(key!=''){
            let optElem=document.createElement('option');
            optElem.textContent=key;
            selectElem.appendChild(optElem);
        }
    }

    // listen to country_select element to fill city_select element
    const cityElem=document.getElementById('cityList');
    selectElem.addEventListener("change",  function(event){
        let selectedCountry=event.target.value;
        // for every new selected country update city list
        // remove all prev childs
        cityElem.innerHTML='';
        let optElem=document.createElement('option');
        optElem.textContent='--Please choose a city--';
        cityElem.appendChild(optElem);
        for (const elem of countryDict[selectedCountry]){
            let optElem=document.createElement('option');
            optElem.textContent=Object.keys(elem)[0];
            optElem.setAttribute('data-', JSON.stringify(Object.values(elem)[0]))
            cityElem.appendChild(optElem);
        }
    });
    // listen to selected city to find the corresponding coordinates
    cityElem.addEventListener("change", function(event){
        let cityname=event.target.value;
        let c=event.target.options[event.target.selectedIndex].getAttribute('data-')
        try{        
            selectedCoord.lat=JSON.parse(c).lat;
            selectedCoord.lon=JSON.parse(c).lon;
        }
        catch{
            alert('Please select city')
        }

    });
    //return selectedCoord;
})

// // Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', actionFunc);
// /* Function called by event listener */
function actionFunc(e){
    // first case: zip code
    if (checkBox.checked != true){
        let newZip=document.getElementById('zip').value;
        getWByZip(BaseURL,newZip, apiKey)
        .then(res=>{
            if(res!=undefined){
                let feelText=document.getElementById('feelings').value;
                postData('/sendData', {name:res.name,temp:res.main.temp,feel: feelText,date:newDate});
            }
            else{
                postData('/sendData', {name:'Not found',temp:'',feel: '',date:''});
            }
            retrieveData()
            })
    } 
    else{
        // other by using coord
        getNewcoord(BaseURL, apiKey)
        .then(res=>{
            if(res!=undefined){
                let feelText=document.getElementById('feelings').value;
                postData('/sendData', {name:res.name,temp:res.main.temp,feel: feelText,date:newDate});
            }
            else{
                postData('/sendData', {name:'Not found',temp:'',feel: '',date:''});
            }
            retrieveData()
        })        
    }
    
}

// fitch link by knowing zip code
const getWByZip = async (baseURL, zip, key)=>{
    let lnk=`${baseURL}zip=${zip}&appid=${key}`;
    const res = await fetch(lnk);
    //console.log(res.ok)
    try {
        if(!res.ok){
            return undefined;
            }
        else{
            const data = await res.json();
            return data; 
        }        
    }catch(error) {
        return undefined;
    }
}

// fitch link by knowing coordinates
const getNewcoord = async (baseURL, key)=>{
    let lat=selectedCoord.lat;
    let lon=selectedCoord.lon;
    let lnk=`${baseURL}lat=${lat}&lon=${lon}&appid=${key}`;
    const res = await fetch(lnk);
    try {
        const data = await res.json();
        return data; 
    }catch(error) {
        return undefined;
    }   
}


/* Function to POST data */
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      }
}

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
        const allData = await request.json();
        if(allData.temp !=undefined && allData.temp !=''){
            // Write updated data to DOM elements
            document.getElementById('city').innerHTML = allData.name;
            document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
            document.getElementById('content').innerHTML = allData.feel;
            document.getElementById("date").innerHTML =allData.date;
        }
        else{      
            document.getElementById('city').innerHTML = 'Not Found';
            document.getElementById('temp').innerHTML = '';
            document.getElementById('content').innerHTML ='';
            document.getElementById("date").innerHTML ='';
        }

    }
    catch(error) {
        document.getElementById('city').innerHTML = 'Wrong input';
        document.getElementById('temp').innerHTML = '';
        document.getElementById('content').innerHTML ='';
        document.getElementById("date").innerHTML ='';
    }
   }
