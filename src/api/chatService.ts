const API = "http://localhost:5102/api/chats";

const authHeader = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getChats() {
    const response = await fetch(API, {
        headers: authHeader(),
    });

    if (!response.ok)
        throw new Error(`Unable to load chats: ${await response.text()}`);

    return await response.json();
}

export async function createChat(name: string) {
    const response = await fetch(API, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({
            name
        })
    });

    if (!response.ok) {
        throw new Error(`Unable to create chat: ${await response.text()}`);
    }

    return await response.json();
}

export async function deleteChat(id: string) {
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: authHeader()
    });

    if (!response.ok && response.status !== 204)
        throw new Error(`Unable to delete chat: ${await response.text()}`);
}