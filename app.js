const $form = document.querySelector("#form");
const $nameInput = document.querySelector("#nameInput");
const $lastNameInput = document.querySelector("#lastNameInput");
const $ageInput = document.querySelector("#ageInput");
const $hotelCategory = document.querySelector("#hotelCategory");
const $result = document.querySelector("#result");

const HOTELS = JSON.parse(localStorage.getItem("tasks")) || [];

const handleHotel = (e) => {
    e.preventDefault();

    const name = $nameInput.value;
    const lastName = $lastNameInput.value;
    const age = $ageInput.value;

    const hotel = {
        name: name,
        lastName: lastName,
        age: age,
    };

    HOTELS.push(hotel); 
    saveHotelsToLocalStorage();
    renderHotels(HOTELS); 
    resetFormInputs(); 
};

const renderHotels = (hotels) => {
    $result.innerHTML = "";

    hotels.forEach((hotel, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p class="text-yellow">Name: ${hotel.name}</p>
            <p class="text-yellow">Last Name: ${hotel.lastName}</p>
            <p class="text-yellow">Age: ${hotel.age}</p>
            <p class="text-yellow">Category: ${hotel.category}</p>
            <br>
            <button data-hotel-id="${index}" class="delete bg-red-500 text-white py-1 px-10 rounded-md">Delete</button>
            <button data-hotel-id="${index}" class="update bg-blue-500 text-white py-1 px-10 rounded-md">Update</button>
            <hr>
        `;

        $result.appendChild(div);
    });
};

const handleHotelAction = (e) => {
    if (e.target.classList.contains("delete")) {
        const id = +e.target.getAttribute("data-hotel-id");
        HOTELS.splice(id, 1); 
        saveHotelsToLocalStorage(); 
        renderHotels(HOTELS); 
    } else if (e.target.classList.contains("update")) {
        const id = +e.target.getAttribute("data-hotel-id");
        const updatedText = prompt("Enter new name: ");
        if (updatedText) {
            HOTELS[id].name = updatedText;
            saveHotelsToLocalStorage(); 
            renderHotels(HOTELS); 
    }
}
};

const saveHotelsToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(HOTELS));
};

const resetFormInputs = () => {
    $nameInput.value = "";
    $lastNameInput.value = "";
    $ageInput.value = "";
};

$form.addEventListener("submit", handleHotel); 
$result.addEventListener("click", handleHotelAction); 

renderHotels(HOTELS);

