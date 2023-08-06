const countryName=new URLSearchParams(location.search).get('name');
const flagImage=document.querySelector('.country-details img');
const countryNameh=document.querySelector('.country-details h1');
const nativeName=document.querySelector('.native-name');
const population=document.querySelector('.population');
const region=document.querySelector('.region');
const subRegion=document.querySelector('.sub-region');
const capital=document.querySelector('.capital');
const topLevelDomain=document.querySelector('.top-level-domain');
const currency=document.querySelector('.currency');
const language=document.querySelector('.language');
const borderCountrys=document.querySelector('.border');
const themeChange=document.querySelector('.themeChange');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
 .then((res)=> res.json())
   .then(([country]) =>{

       console.log(country);
       flagImage.src=country.flags.svg;
       countryNameh.innerText=country.name.common;
       population.innerText=country.population.toLocaleString('en-IN');
       region.innerText=country.region;
       
       if(country.subregion){
        subRegion.innerText=country.subregion;
       }
       topLevelDomain.innerText=country.tld.join(', ');
       
       if(country.capital){
        capital.innerText=country.capital;
       }
       if(country.subregion){
        subRegion.innerText=country.subregion;
       }
       if(country.languages){
        language.innerText=Object.values(country.languages).join(', ');
       }
       if(country.borders){
        country.borders.forEach(border => {
          // console.log(border)
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
              .then(([borderCounry]) =>{
                // console.log(borderCounry);
                const borderCountryTag=document.createElement('a');
                borderCountryTag.innerText=borderCounry.name.common;
                borderCountryTag.href=`country.html?name=${borderCounry.name.common}`;
                
                borderCountrys.append(borderCountryTag);
              })
        });
       }
       if(country.name.nativeName){
        nativeName.innerText=Object.values(country.name.nativeName)[0].common;
       }else{
        nativeName.innerText=country.name.common;
       }
       if(country.currencies){
        currency.innerText=Object.values(country.currencies).map((currency) =>currency.name).join(', ');
       }
       if(country.border){

       }
       
   })

   //dark and light mode
  //  const themeChange=document.querySelector('.themeChange');
  //  themeChange.addEventListener('click', () => {
  //   document.body.classList.toggle('dark')
  //   themeChange.innerHTML=`<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Light Mode`;
  // })


  
   //dark aur light mode with local storage 
   
function updateThemePreference(newTheme) {
  document.body.classList.toggle('dark', newTheme);

  if (newTheme) {
    themeChange.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Light Mode';
  } else {
    themeChange.innerHTML = '<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;Dark Mode';
  }

  // Save the new theme preference in local storage
  localStorage.setItem('darkMode', newTheme);
}

themeChange.addEventListener('click', () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const newTheme = !isDarkMode;

  updateThemePreference(newTheme);
});

// Set initial theme based on local storage
const isDarkMode = localStorage.getItem('darkMode') === 'true';
updateThemePreference(isDarkMode);


   //scroll up 

   var scrollTab = document.getElementById('scrollTab');

   window.addEventListener('scroll', function() {
     if (window.pageYOffset > 300) {
       scrollTab.classList.add('show');
     } else {
       scrollTab.classList.remove('show');
     }
   });
   
   scrollTab.addEventListener('click', function(e) {
     e.preventDefault();
     window.scrollTo({
       top: 0,
       behavior: 'smooth'
     });
   });
