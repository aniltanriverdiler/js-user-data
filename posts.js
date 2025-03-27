const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.some_key;

console.log(userId);

// UserId Controls
const userIdControl = (userId) => {
  if (!userId) {
    userId = prompt("Please enter a number between 1 and 10 for your userId: ");
  }

  userId = Number(userId);

  try {
    if (isNaN(userId) || userId < 1 || userId > 10) {
      throw new Error("Invalid userId! Please enter a number between 1-10.");
    }
    console.log("Login successful.");
  } catch (error) {
    alert(error.message);
    return;
  }
};

userIdControl(userId);

// Get API for UserId
const getFilteredUsers = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const data = await response.json();
    console.log(data);
    createFilteredCards(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

// Create card in Html
const createFilteredCards = (users) => {
  const cardContainer = document.getElementById("user-card-info");
  let cardsHtml = "";

  users.forEach((post) => {
    cardsHtml += `
      <div class="col-md-3 mt-5">
       <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
       </div>
      </div>
      `;
  });

  cardContainer.innerHTML = cardsHtml;
};

getFilteredUsers();
