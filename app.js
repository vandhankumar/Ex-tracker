document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category-select");
    const itemSelect = document.getElementById("item-select");
    const amountInput = document.getElementById("amount-input");
    const dateInput = document.getElementById("date-input");
    const addButton = document.getElementById("add-btn");
    const expenseTableBody = document.getElementById("expense-table-body");
    const totalAmount = document.getElementById("total-amount");
    const foodSubtotal = document.getElementById("food-subtotal");
    const drinksSubtotal = document.getElementById("drinks-subtotal");
    const iceCreamSubtotal = document.getElementById("ice-cream-subtotal");

    const items = {
        food: ["Pizza", "Burger", "Pasta"],
        drinks: ["Water", "Soda", "Juice"],
        "ice-cream": ["Vanilla", "Chocolate", "Strawberry"]
    };

    const subtotals = {
        food: 0,
        drinks: 0,
        "ice-cream": 0
    };

    function populateItems(category) {
        itemSelect.innerHTML = "<option value=''>Select an item</option>";
        if (items[category]) {
            items[category].forEach(item => {
                const option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                itemSelect.appendChild(option);
            });
        }
    }

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        populateItems(selectedCategory);
    });

    addButton.addEventListener("click", () => {
        const category = categorySelect.value;
        const item = itemSelect.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (!item || isNaN(amount) || !date) {
            alert("Please fill out all fields.");
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category}</td>
            <td>${item}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${date}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        expenseTableBody.appendChild(row);

        subtotals[category] += amount;
        updateSubtotals();

        amountInput.value = "";
        dateInput.value = "";

        row.querySelector(".delete-btn").addEventListener("click", () => {
            const amountToRemove = parseFloat(row.children[2].textContent);
            subtotals[category] -= amountToRemove;
            updateSubtotals();
            row.remove();
        });
    });

    function updateSubtotals() {
        const total = Object.values(subtotals).reduce((acc, val) => acc + val, 0);
        foodSubtotal.textContent = subtotals.food.toFixed(2);
        drinksSubtotal.textContent = subtotals.drinks.toFixed(2);
        iceCreamSubtotal.textContent = subtotals["ice-cream"].toFixed(2);
        totalAmount.textContent = total.toFixed(2);
    }

    populateItems(categorySelect.value);
});
