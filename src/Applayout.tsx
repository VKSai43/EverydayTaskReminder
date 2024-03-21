import MyChecklist from "./checklist/Checklist";
import './Applayout.css';

const AppLayout = ()=>{

    return(
        <>
         <header>
            <h1>My Checklists</h1>
            <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </nav>
          </header>

          

          <main>
            <MyChecklist userId={'bf0bb5b2-cbfa-43a5-b0fb-d219b0841f50'}/>
          </main>

          <footer>
            <p>&copy; 2024 Your Website. All rights reserved.</p>
          </footer>
        </>
    )
}

export default AppLayout;

