const htmlBody = document.getElementById("body");
// This function is called only after the data has been fetched, and parsed.
const loadData = (heroes) => {
    console.log(heroes);
    htmlBody.innerHTML = "";

    for (let index = 0; index < heroes.length; index++) {
        let hero = heroes[index]
        const row = document.createElement("tr");
        
        row.innerHTML = `<td><img src="${hero.images.xs}" alt="${hero.name}" width="50"></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName || "N/A"}</td>
            <td>${hero.appearance.race || "Unknown"}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.appearance.height[1]}</td>
            <td>${hero.appearance.weight[1]}</td>
            <td>${hero.biography.placeOfBirth || "Unknown"}</td>
            <td>${hero.biography.alignment}</td>`;

        htmlBody.appendChild(row);
    }
  };
  
  // Request the file with fetch, and the data will be downloaded to your browser cache.
  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
    .then(loadData); // .then will call the `loadData` function with the JSON value.