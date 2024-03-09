import { GiSwan } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">
          <span style={{ fontSize: 30 }}>
            <GiSwan />
          </span>{" "}
          DoNoud
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
