import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="Logo" />
        <span>Chartify</span>
      </div>
    </div>
  );
}

export default Navbar;
