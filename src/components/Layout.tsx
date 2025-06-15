import React from "react";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Movie App</h1>
        <nav>
          <a href="/">Home</a> | <a href="/watchlist">Watchlist</a> |{" "}
          <a href="/search">Search</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer style={{ textAlign: "center", marginTop: "20px" }}>
        <p>&copy; 2023 Movie App. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Layout;
