import { colors } from "../colors";

const headerStyle = {
  backgroundColor: colors.primaryAppColor,
  display: "flex",
  height: "70px",
  justifyContent: "space-between",
  padding: "20px ",
};

const headerContent = {
  display: "flex",
  gap: "25px",
};

const headerLinkStyle = {
  textDecoration: "none",
  color: colors.headerSideTextColor,
  fontSize: 19,
  fontWeight: "bold",
};

const contentLinkStyle = {
  textDecoration: "none",
  color: colors.contentLinkTextColor,
  fontSize: 19,
  fontWeight: "bold",
};

const contentAlignment = {
  display: "flex",
  height: "90vh",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(to right, #3498db, #8e44ad)",
  zIndex: 0,
};

const foregroundStyle = {
  position: "relative",
  zIndex: 10,
  padding: "8px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const tailWindButton =
  "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ...";

export {
  headerStyle,
  headerContent,
  headerLinkStyle,
  contentLinkStyle,
  contentAlignment,
  tailWindButton,
  backgroundStyle,
  foregroundStyle,
};
