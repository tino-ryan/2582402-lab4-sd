//lemme get my values ready
const captial=document.getElementById('capital');
const population=document.getElementById('population');
const region =document.getElementById('region');
const flag=document.getElementById('flag');
const borderlist=document.getElementById('bordering-list');
const countryname=document.getElementById('country-name').value;
const borderingList = document.getElementById('bordering-list')



document.getElementById('submit-btn').addEventListener('click',async function(){
    if(!countryname){ return alert("Please enter country,PLEASE!!")};

    try{
        //need to fetch the stuff from the API
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryname}`);
        
        if (!response.ok) {
            throw new Error("Country not found. Lock in and try again.");
        }
        //i want the fisrt array item as a json
        const json= await response.json();
        const countryInfo =json[0];

        captial.textContent=countryInfo.capital;
        population.textContent=countryInfo.population;
        region.textContent=countryInfo.region;
        flag.innerHTML= `<img src="${countryInfo.flags.svg}"/>`

        const neighbours = countryInfo.borders ;

        if (neighbours.length >0){
            for (const border of neighbours){
                const borderData = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const borderJson = await borderData.json();
                const borderCountry = borderJson[0];

                const listItem = document.createElement('li');
                listItem.innerHTML = `<img src="${borderCountry.flags.svg}" alt="Flag of ${borderCountry.name.common}" /> ${borderCountry.name.common}`;
                borderingList.appendChild(listItem);
            }
            
        }else{
            borderingList.innerHTML = '<li> this country is lonely.No bordering countries</li>';
        }
        


    }catch(error){
        alert(error.message);
    }


})