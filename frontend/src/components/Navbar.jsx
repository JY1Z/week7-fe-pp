import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();  // Use navigate if needed for logout

  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");  // Redirect after logging out
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isAuthenticated && user ? (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            {/* Add the link for editing a job */}
            <Link to="/edit-job/1">Edit Job</Link> {/* Replace `1` with the actual job ID when needed */}
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
