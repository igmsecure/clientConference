import { useState } from "react";
import { Author } from "../config/interfaces";


// Components
// import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import AuthorDetails from "../components/AuthorDetails/";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";



function AuthorPage() {

  const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)

  return (
    <>

      <Navbar />
      <section className="main">
        <div className="container">
          <Breadcrumbs />
          <div className="main-content">
            <Sidebar />
            <AuthorDetails selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />
          </div>
        </div>
      </section>

    </>
  );
}

export default AuthorPage;
