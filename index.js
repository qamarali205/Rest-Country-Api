const url='https://restcountries.com/v3.1/all';

const countryContainer=document.querySelector('.countries-container');
const filterByRegion=document.querySelector('#filter-by-region');
const searchByCountry=document.querySelector('.search-container input');
const themeChange=document.querySelector('.themeChange');


let allCountryData;

fetch(url)
.then((res)=>res.json())
.then((data) =>{
    renderCountries(data);
    allCountryData=data;

});


// filter data by region

filterByRegion.addEventListener('change', (e) =>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res)=>res.json())
        .then(renderCountries);

})

function renderCountries(data){
    countryContainer.innerHTML='';
    data.forEach(country => {
         //console.log(country.name.common);
        const countryCard=document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href=`/country.html?name=${country.name.common}`;

    
        const cardHTML=`
            <img src="${country.flags.svg}" alt="flag">
            <div class="country-info">
                <h3 class="country-name">${country.name.common}</h3>
                <p><b>Population : </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region : </b>${country.region}</p>
                <p><b>Capital : </b>${country.capital}</p>
            </div>
            `;

        countryCard.innerHTML=cardHTML;

        countryContainer.append(countryCard);
        
    });
    
}

searchByCountry.addEventListener('input', (e) =>{
    allCountryData.filter((country) =>{
        const filteredCountries = allCountryData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
        renderCountries(filteredCountries);
    })
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

