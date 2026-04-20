const BASE_URL = "http://localhost:3000/api";

export async function fetchCommands(search = "") {
  const res = await fetch(`${BASE_URL}/commands?search=${search}`, {
    headers: { "x-user-id": "demo" }
  });
  return res.json();
}

export async function toggleFavorite(name) {
  await fetch(`${BASE_URL}/commands/${name}/favorite`, {
    method: "PATCH",
    headers: { "x-user-id": "demo" }
  });
}

export async function createCommand(command) {
  await fetch(`${BASE_URL}/commands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
}
