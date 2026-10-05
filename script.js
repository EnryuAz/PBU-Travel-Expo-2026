const destination = document.getElementById("destination");
const activity = document.getElementById("activity");
const participants = document.getElementById("participants");
const totalFee = document.getElementById("totalFee");
const registrationForm = document.getElementById("registrationForm");

let activityPrice = 0;

const activities = 
{
    Japan: 
    {
        name: "Japan Cultural Tour",
        price: 150
    },

    Malaysia: 
    {
        name: "Malaysia Nature Tour",
        price: 80
    },

    Indonesia: 
    {
        name: "Indonesia Island Hopping",
        price: 120
    },

    Singapore: 
    {
        name: "Singapore City Tour",
        price: 100
    }
};

destination.addEventListener("change", function() 
{

    activity.innerHTML = "";

    if (destination.value === "") 
    {

        activity.innerHTML = `
            <option value="">
                Select destination first
            </option>
        `;

        activityPrice = 0;
        calculateTotal();

        return;
    }

    const selectedActivity = activities[destination.value];

    activity.innerHTML = `
        <option value="${selectedActivity.name}">
            ${selectedActivity.name} - RM${selectedActivity.price}
        </option>
    `;

    activityPrice = selectedActivity.price;

    calculateTotal();
}
);


participants.addEventListener("input", function() 
{
    calculateTotal();
}
);


function calculateTotal() 
{

    const numberOfParticipants = Number(participants.value);

    const total = activityPrice * numberOfParticipants;

    totalFee.textContent = total;
}


const tooltipTriggerList = document.querySelectorAll
(
    '[data-bs-toggle="tooltip"]'
);

tooltipTriggerList.forEach(function(tooltipTriggerEl) 
{
    new bootstrap.Tooltip(tooltipTriggerEl);
}
);


const popoverTriggerList = document.querySelectorAll
(
    '[data-bs-toggle="popover"]'
);

popoverTriggerList.forEach(function(popoverTriggerEl) 
{
    new bootstrap.Popover(popoverTriggerEl);
}
);


registrationForm.addEventListener("submit", function(event) 
{

    event.preventDefault();

    if (!registrationForm.checkValidity()) 
    {
        event.stopPropagation();

        registrationForm.classList.add("was-validated");

        return;
    }

    const name = document.getElementById("fullName").value;
    const studentID = document.getElementById("studentID").value;
    const selectedDestination = destination.value;
    const selectedActivity = activity.value;
    const numberOfParticipants = participants.value;

    document.getElementById("confirmName").textContent = name;
    document.getElementById("confirmID").textContent = studentID;
    document.getElementById("confirmDestination").textContent = selectedDestination;
    document.getElementById("confirmActivity").textContent = selectedActivity;
    document.getElementById("confirmParticipants").textContent = numberOfParticipants;
    document.getElementById("confirmFee").textContent = totalFee.textContent;

    const modal = new bootstrap.Modal
    (
        document.getElementById("confirmationModal")
    );

    modal.show();
}
);


document.getElementById("confirmButton").addEventListener("click", function() 
{

    alert("Registration submitted successfully!");

    registrationForm.reset();

    activity.innerHTML = `
        <option value="">
            Select destination first
        </option>
    `;

    activityPrice = 0;

    calculateTotal();

    registrationForm.classList.remove("was-validated");

    const modalElement = document.getElementById("confirmationModal");

    const modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();
}
)