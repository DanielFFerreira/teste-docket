export default async response => {
    if (response.ok) return await response.json();
    else throw (await response.json()) || 'An unexpected error occured';
}