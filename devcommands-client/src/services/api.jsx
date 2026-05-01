const BASE_URL = "/api/commands";

// GET commands (with optional search)

let controller;

export const fetchCommands = async (search = "") => {
  if (controller) {
    controller.abort();
  } // cancel previous request if still pending

  controller = new AbortController();
  const url = search
    ? `${BASE_URL}?search=${encodeURIComponent(search)}`
    : BASE_URL;

  const res = await fetch(url, {
    signal: controller.signal
  });

  if (!res.ok) {
    throw new Error("Failed to fetch commands");
  }

  return res.json();
};

// PATCH favorite toggle
export const toggleFavorite = async (name) => {
  const res = await fetch(`${BASE_URL}/${name}/favorite`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle favorite");
  }

  return res.json();
};

// POST new command
export const createCommand = async (command) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    throw new Error("Failed to create command");
  }

  return res.json();
};
