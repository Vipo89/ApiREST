const baseUrl = "http://localhost:3000/api";

async function getAllUsers() {
  const usersUrl = `${baseUrl}/users/`;
  // localStorage.setItem("access-token", token)
  const token = localStorage.getItem("access-token");
  if (!token)
    throw new Error("No se ha podido coger el token del localStorage");
  try {
    const response = await fetch(usersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) throw new Error("Error al obtener los usuarios");
    const data = await response.json();
    // Imaginemos  que dentro de nuetro data, que es un objeto, tenemos los usuarios en users.
    /**
     * data: {
     *  version: 3.4.5,
     *      date: "2025-12-25",
     *      users: [
     *          {
     *              name: "Alejandro",
     *              lastName: " García"
     *          },
     *          {
     *              name: "Victor",
     *              lastName: " Parras"
     *          },.........
     *      ],
     *      status: "Success"
     *  }
     */
    return data.users;
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

const allUserArray = getAllUsers();
showListUsers(allUserArray)
