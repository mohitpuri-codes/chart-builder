import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ marginRight: "10px", width: "50px" }}
        />
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Chartify</span>
      </div>
    </div>
  );
}

export default Navbar;
