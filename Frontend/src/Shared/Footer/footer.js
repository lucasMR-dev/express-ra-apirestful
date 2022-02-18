const Footer = () => {
  const date = new Date();
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        padding: 6,
        backgroundColor: "#2196f3",
        textAlign: "center",
        color: "white",
      }}
    >
      <strong> Company Name &copy; {date.getFullYear()} </strong>
    </div>
  );
};

export default Footer;
