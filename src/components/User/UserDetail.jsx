import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService"; // Asegúrate de tener el servicio adecuado

export const UserDetail = () => {
  const { email } = useParams(); // Obtener el email desde la URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByEmail();
  }, [email]);

  const getUserByEmail = () => {
    UserService.getUserByEmail(email)
      .then((response) => {
        console.log("User details:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  return (
    <section className="w-[80%] mx-auto">
      <h2 className="flex justify-center my-8 text-3xl font-semibold">
        User Details
      </h2>
      {user ? (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Identity Number:</strong> {user.identityNumber}
          </p>
          <p>
            <strong>Cellphone:</strong> {user.cellphone}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </section>
  );
};
