import { renderList, fetchShoppingList } from '../render-utils.js';

const shoppingListEl = document.getElementById('shopping-list');

async function displayShoppingList() {
    shoppingListEl.textContent = '';
    const data = await fetchShoppingList();
    if (data) {
        for (let item of data) {
            const shoppingList = renderList(item);
            shoppingList.addEventListener('click', async (e) => {
                e.preventDefault();
                await togglePurchased(item);
                displayShoppingList();
            });

            shoppingListEl.append(shoppingList);
        }
    }
}

displayShoppingList();