import { checkAuth, togglePurchased, fetchShoppingList } from '../fetch-utils.js';
import { renderList } from '../render-utils.js';

const shoppingListEl = document.getElementById('shopping-list');

checkAuth();

async function displayShoppingList() {
    shoppingListEl.textContent = '';
    const data = await fetchShoppingList();
    if (data) {
        for (let item of data) {
            const listElem = renderList(item);
            listElem.addEventListener('click', async (e) => {
                e.preventDefault();
                await togglePurchased(item);
                displayShoppingList();
            });

            shoppingListEl.append(listElem);
        }
    }
}

displayShoppingList();