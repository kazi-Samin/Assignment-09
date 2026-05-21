// "use client";

// import { createAuthClient } from "better-auth/react";

// export const authClient =
//   createAuthClient({
//     baseURL:
//       process.env.NEXT_PUBLIC_API_URL,

//     fetchOptions: {
//       credentials: "include",
//     },
//   });

// export const {
//   signIn,
//   signUp,
//   signOut,
//   useSession,
// } = authClient;

"use client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  email,
  password
) {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
}

export async function registerUser(
  data
) {
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function getUser() {
  const response = await fetch(
    `${API_URL}/me`,
    {
      credentials: "include",
    }
  );

  return response.json();
}

export async function logoutUser() {
  const response = await fetch(
    `${API_URL}/logout`,
    {
      method: "POST",

      credentials: "include",
    }
  );

  return response.json();
}