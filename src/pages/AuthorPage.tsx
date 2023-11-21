import {useState} from "react";
import {Author} from "../config/interfaces";


// Components
import Sidebar from "../components/Sidebar";
import AuthorDetails from "../components/AuthorDetails/";
import Breadcrumbs from "../components/Breadcrumbs";



function AuthorPage() {

    const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)

  return (
    <>

    <section className="main">
          <div className="container">
          <Breadcrumbs selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor}/>
              <div className="main-content">
                  <Sidebar />
                  <AuthorDetails selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor}/>       
              </div>
          </div>
    </section>

    </>
  );
}

export default AuthorPage;
