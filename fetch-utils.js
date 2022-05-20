const SUPABASE_URL = 'https://plkemcgrxzmmcpdtjfif.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsa2VtY2dyeHptbWNwZHRqZmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyOTcxOTYsImV4cCI6MTk2Nzg3MzE5Nn0.kfBRa_T42tBk603NpWRP4Wq03rowUysjlQ_fwhXu6Jw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./create-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function addNewItem(item) {
    const response = await client.from('Shopping_List').insert(item);
    if (response.data) {
        return response.data;
    } else {
        return console.error(response.error);
    }
}

export async function fetchShoppingList() {
    const response = await client.from('Shopping_List').select('*').order('name');

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function togglePurchased(item) {
    const response = await client.from('Shopping_List')
        .update({ purchased: !item.purchased })
        .match({ id: item.id });

    if (response.error) {
        console.error(response.error);
    } else {
        return response.data;
    }
}

export async function deleteList() {
    const response = await client.from('Shopping_List')
        .delete()
        .match({ user_id: getUser().id });

    if (response.error) {
        console.error(response.error);
    } else {
        return response.data;
    }
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
