const users = [
  { username: "cliente1", password: "cliente1", role: "cliente" },
  { username: "vendedor1", password: "vendedor1", role: "vendedor" },
  { username: "proveedor1", password: "proveedor1", role: "proveedor" },
  { username: "kevinherveo14@gmail.com", password: "123", role: "cliente" },
];

export const loginUser = (username, password) => {
  return (
    users.find(
      (user) => user.username === username && user.password === password
    ) || null
  );
};
