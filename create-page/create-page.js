import { checkAuth, logout, addNewItem } from '../fetch-utils.js';


const addItemForm = document.getElementById('add-item-form');
const logoutButton = document.getElementById('logout');

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(addItemForm);
    const newItem = {
        name: data.get('item-name'),
        quantity: data.get('item-quantity'),
    };
    const response = await addNewItem(newItem);
    console.log(response);
    window.location.href = '/list-page';
});

console.log(addItemForm);
// // The way Julie did it
// addItemForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const itemData = new FormData(addItemForm);
//     console.log(itemData.get('item-name'));
//     console.log(itemData.get('item-quantity'));
//     const data = await addNewItem(itemData.get('item-name'), itemData.get('item-quantity'));
//     if (data) {
//         window.location.href = '/list-page';
//     } else {
//         alert('Something went wrong');
//     }
// });