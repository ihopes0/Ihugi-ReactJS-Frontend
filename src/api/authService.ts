const API = "http://localhost:5102/api/users";

export async function login(email: string, password: string) {
    const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!response.ok)
        throw new Error(await response.text());

    return await response.json();
}