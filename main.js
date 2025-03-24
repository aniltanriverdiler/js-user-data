const fetchDataWithErrors = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error ('Request failed with status ' + response.status);
        }
        const data = await response.json();
        console.log(data);
        createCards(data);
    } catch (error) {
        console.log('Error:', error.message);
    }
};

const createCards = (users) => {
    const cardContainer = document.getElementById('card-container');
    let cardsHtml = '';

    users.forEach(user => {
        cardsHtml += `
        <div class="col-md-3">
         <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${user.username}</p>
            <p class="card-text">${user.email}</p>
            <p class="card-text">${user.phone}</p>
            <p class="card-text">${user.address}</p>
            <p class="card-text">${user.company}</p>
            <a href="https://${user.website}" class="btn btn-primary">Website</a>
          </div>
         </div>
        </div>
        `;
    });

    cardContainer.innerHTML = cardsHtml;
}

fetchDataWithErrors();