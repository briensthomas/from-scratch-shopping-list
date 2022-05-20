export function renderList(item) {
    const li = document.createElement('li');
    li.textContent = `${item.quantity} ${item.name}`;

    if (item.purchased) {
        li.classList.add('purchased');
    }

    return li;
}