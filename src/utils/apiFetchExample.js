const baseUrl = "http://localhost:3000/api";

async function getAllUsers() {
  const usersUrl = `${baseUrl}/users/`;
  //localstorage.setItem("auth-token",token)
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
    if (!response.ok) throw new Error("Error al obtener todos los usuarios");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error.message);
  }
}
