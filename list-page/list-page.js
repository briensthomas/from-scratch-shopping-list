import { checkAuth, togglePurchased, fetchShoppingList, deleteList, logout } from '../fetch-utils.js';
import { renderList } from '../render-utils.js';

const logoutButton = document.getElementById('logout');
const shoppingListEl = document.getElementById('shopping-list');
const deleteButton = document.getElementById('delete-button');


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

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

deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await deleteList();
    displayShoppingList();
});