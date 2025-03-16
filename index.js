const htmlBody = document.getElementById("body");
const valuePage = document.getElementById("pageSize")
let firstLoad = true
let page = 0
let heroesTable = []
let placeBirth
let fullName
let race
let gender
let height
let weight
let alignment

// This function is called only after the data has been fetched, and parsed.
const loadData = (heroes) => {
    console.log(heroes);
    console.log(valuePage.value)
    page = 0
    htmlBody.innerHTML = "";
    if (firstLoad) {
        firstLoad = false
        heroesTable.sort((a, b) => a.name.localeCompare(b.name)); 

        for (let index = 0; index < heroesTable.length; index++) {
            if (heroesTable[index].biography.fullName === "") {
                heroesTable[index].biography.fullName = "zz"
            }
            if (heroesTable[index].appearance.race === null) {
                heroesTable[index].appearance.race = "zz"
            }
            if (heroesTable[index].biography.placeOfBirth === "-") {
                heroesTable[index].biography.placeOfBirth = "zz"
            }
            if (heroesTable[index].appearance.gender === "-") {
                heroesTable[index].appearance.gender = "zz"
            }
            if (heroesTable[index].appearance.height[1] === "0 cm") {
                heroesTable[index].appearance.height[1] = "zz"
            }
            if (heroesTable[index].appearance.weight[1] === "0 kg") {
                heroesTable[index].appearance.weight[1] = "zz"
            }
            if (heroesTable[index].biography.alignment === "-") {
                heroesTable[index].biography.alignment = "zz"
            }
        }
    }

    for (let index = 0; index < heroes.length; index++) {
        page = page +1
        if (page > valuePage.value) {
            break;
        }

        let hero = heroes[index]

        if (hero.biography.placeOfBirth === "zz") {
            placeBirth = "MISSING VALUE"
        } else {
            placeBirth = hero.biography.placeOfBirth
        }

        if (hero.biography.fullName === "zz") {
            fullName = "MISSING VALUE"
        } else {
            fullName = hero.biography.fullName
        }

        if (hero.appearance.race === "zz") {
            race = "MISSING VALUE"
        } else {
            race = hero.appearance.race
        }

        if (hero.appearance.gender === "zz") {
            gender = "MISSING VALUE"
        } else {
            gender = hero.appearance.gender
        }

        if (hero.appearance.height[1] === "zz") {
            height = "MISSING VALUE"
        } else {
            height = hero.appearance.height[1]
        }

        if (hero.appearance.weight[1] === "zz") {
            weight = "MISSING VALUE"
        } else {
            weight = hero.appearance.weight[1]
        }

        if (hero.biography.alignment === "zz") {
            alignment = "MISSING VALUE"
        } else {
            alignment = hero.biography.alignment
        }

        const row = document.createElement("tr");
        
        row.innerHTML = `<td><img src="${hero.images.xs}" alt="${hero.name}" width="50"></td>
            <td>${hero.name}</td>
            <td>${fullName || "-"}</td>
            <td>
                ${Object.entries(hero.powerstats).map(([varName, value]) => `<b>${varName}:</b> ${value}`).join(", ")}
            </td>
            <td>${race || "Unknown"}</td>
            <td>${gender}</td>
            <td>${height}</td>
            <td>${weight}</td>
            <td>${placeBirth || "-"}</td>
            <td>${alignment}</td>`;

        htmlBody.appendChild(row);
    }
};

const nameCase = document.getElementById("name")
const fullNameCase = document.getElementById("fullName")
const statsCase = document.getElementById("stats")
const raceCase = document.getElementById("race")
const genderCase = document.getElementById("gender")
const heightCase = document.getElementById("height")
const weightCase = document.getElementById("weight")
const placeBirthCase = document.getElementById("placeBirth")
const alignmentCase = document.getElementById("alignment")
const searchBar = document.getElementById("search")

let ascendingName = false
let ascendingFullName = false
let ascendingStats = false
let ascendingRace = false
let ascendingGender = false
let ascendingHeight = false
let ascendingWeight = false
let ascendingPlaceBirth = false
let ascendingAlignment = false

searchBar.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredHeroes = heroesTable.filter(hero => 
        hero.name.toLowerCase().includes(searchText) ||
        hero.biography.fullName.toLowerCase().includes(searchText)
    );
    loadData(filteredHeroes);
});

nameCase.addEventListener("click", (event) => {
    if (ascendingName == true) { 
        ascendingName = false; 
        heroesTable.sort((a, b) => a.name.localeCompare(b.name)); 
    } 
    else { 
        ascendingName = true; 
        heroesTable.sort((a, b) => b.name.localeCompare(a.name)); 
    }
    loadData(heroesTable)
})

fullNameCase.addEventListener("click", (event) => {
    if (ascendingFullName == true) { 
        ascendingFullName = false; 
        heroesTable.sort((a, b) => a.biography.fullName.localeCompare(b.biography.fullName)); 
    } 
    else { 
        ascendingFullName = true; 
        heroesTable.sort((a, b) => b.biography.fullName.localeCompare(a.biography.fullName)); 
    }
    loadData(heroesTable)
})

raceCase.addEventListener("click", (event) => {
    if (ascendingRace == true) { 
        ascendingRace = false; 
        heroesTable.sort((a, b) => a.appearance.race.localeCompare(b.appearance.race)); 
    } 
    else { 
        ascendingRace = true; 
        heroesTable.sort((a, b) => b.appearance.race.localeCompare(a.appearance.race)); 
    }
    loadData(heroesTable)
})

genderCase.addEventListener("click", (event) => {
    if (ascendingGender == true) { 
        ascendingGender = false; 
        heroesTable.sort((a, b) => a.appearance.gender.localeCompare(b.appearance.gender)); 
    } 
    else { 
        ascendingGender = true; 
        heroesTable.sort((a, b) => b.appearance.gender.localeCompare(a.appearance.gender)); 
    }
    loadData(heroesTable)
})

heightCase.addEventListener("click", (event) => {
    if (ascendingHeight == true) { 
        ascendingHeight = false; 
        heroesTable.sort((a, b) => parseInt(a.appearance.height[1] - parseInt(b.appearance.height[1]))); 
    }
    else { 
        ascendingHeight = true; 
        heroesTable.sort((a, b) => parseInt(b.appearance.height[1] - parseInt(a.appearance.height[1])));
    }
    loadData(heroesTable)
})

weightCase.addEventListener("click", (event) => {
    if (ascendingWeight == true) { 
        ascendingWeight = false; 
        heroesTable.sort((a, b) => a.appearance.weight[1].localeCompare(b.appearance.weight[1])); 
    }
    else { 
        ascendingWeight = true; 
        heroesTable.sort((a, b) => b.appearance.weight[1].localeCompare(a.appearance.weight[1])); 
    }
    loadData(heroesTable)
})

placeBirthCase.addEventListener("click", (event) => {
    if (ascendingPlaceBirth == true) { 
        ascendingPlaceBirth = false; 
        heroesTable.sort((a, b) => a.biography.placeOfBirth.localeCompare(b.biography.placeOfBirth)); 
    } 
    else { 
        ascendingPlaceBirth = true; 
        heroesTable.sort((a, b) => b.biography.placeOfBirth.localeCompare(a.biography.placeOfBirth)); 
    }
    loadData(heroesTable)
})

alignmentCase.addEventListener("click", (event) => {
    if (ascendingAlignment == true) { 
        ascendingAlignment = false; 
        heroesTable.sort((a, b) => a.biography.alignment.localeCompare(b.biography.alignment)); 
    }
    else { 
        ascendingAlignment = true; 
        heroesTable.sort((a, b) => b.biography.alignment.localeCompare(a.biography.alignment)); 
    }
    loadData(heroesTable)
})

valuePage.addEventListener("change", (event) => {
    console.log(event.target.value);
    loadData(heroesTable)
});
  
  // Request the file with fetch, and the data will be downloaded to your browser cache.
  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
    .then((data) => {heroesTable = data; loadData(heroesTable)}); // .then will call the `loadData` function with the JSON value.
