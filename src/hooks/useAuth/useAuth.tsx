
export const useAuth = () => {
    return !!localStorage.getItem("jwtToken");
  };
  