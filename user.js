// Get Search Bar Data and Filter
const searchBar = document.getElementById("searchBar");
let data = [];
console.log(searchBar);

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  const filteredCharacters = data.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.id.toString().includes(searchString)
    );
  });
  createCards(filteredCharacters);
});

// Get API
const fetchDataWithErrors = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    data = await response.json();
    console.log(data);
    createCards(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

// Create cards by filtering and API
const createCards = (users) => {
  const cardContainer = document.getElementById("card-container");
  let cardsHtml = "";

  users.forEach((user) => {
    cardsHtml += `
        <div class="col-md-3">
         <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${user.username}</p>
            <p class="card-text">${user.email}</p>
            <p class="card-text">${user.phone}</p>
            <p class="card-text">${user.address}</p>
            <p class="card-text">${user.company}</p>
            <a href="posts.html?userId=${user.id}" class="btn btn-primary">View posts</a>
          </div>
         </div>
        </div>
        `;
  });

  cardContainer.innerHTML = cardsHtml;
};

fetchDataWithErrors();
