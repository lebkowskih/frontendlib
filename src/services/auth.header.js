export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('access'));

    return { Authorization: 'Bearer ' + token };
}