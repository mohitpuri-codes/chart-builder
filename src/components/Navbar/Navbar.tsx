import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" />
        <span>Chartify</span>
      </div>
    </div>
  );
}

export default Navbar;
