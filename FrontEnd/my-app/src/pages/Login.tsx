import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      Login
      <Link to={`/home/`}>Ir para o home</Link>
    </div>
  );
};

export default Login;
