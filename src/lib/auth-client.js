
// "use client";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL;

// export async function loginUser(
//   email,
//   password
// ) {
//   const response = await fetch(
//     `${API_URL}/login`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//           "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     }
//   );

//   return response.json();
// }

// export async function registerUser(
//   userData
// ) {
//   const response = await fetch(
//     `${API_URL}/register`,
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//           "application/json",
//       },

//       credentials: "include",

//       body: JSON.stringify(
//         userData
//       ),
//     }
//   );

//   return response.json();
// }

// export async function logoutUser() {
//   const response = await fetch(
//     `${API_URL}/logout`,
//     {
//       method: "POST",

//       credentials: "include",
//     }
//   );

//   return response.json();
// }

// export async function getCurrentUser() {
//   const response = await fetch(
//     `${API_URL}/me`,
//     {
//       credentials: "include",
//     }
//   );

//   return response.json();
// }


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
  name,
  email,
  password,
  image
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

      body: JSON.stringify({
        name,
        email,
        password,
        image,
      }),
    }
  );

  return response.json();
}

export async function getCurrentUser() {
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