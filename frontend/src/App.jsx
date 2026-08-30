import ApplicationForm from "./ApplicationForm";
import "./App.css";

function App() {
  return (
    <div className="app">

      <header className="navbar">
        <div className="logo">
          ❤️ Love Thy Neighbor Housing
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#apply">Apply</a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      <main>

        <section id="home" className="hero">
          <div className="hero-content">

            <h1>
              Helping Families To The Glory of God
            </h1>

            <p>
              Love Thy Neighbor Housing helps lower-income
              families access rental assistance when they need
              it most.
            </p>

            <a href="#apply" className="button">
              Apply for Rental Assistance
            </a>

          </div>
        </section>
      
       <section id="about" className="about">

          <h2>How We Help</h2>

          <div className="cards">

            <div className="card">
              <h3>Apply</h3>
              <p>
                Complete our rental assistance application
                with your household information.
              </p>
            </div>

            <div className="card">
              <h3>Review</h3>
              <p>
                Our team reviews your application and
                determines your eligibility.
              </p>
            </div>

            <div className="card">
              <h3>Receive Help</h3>
              <p>
                Approved applicants receive rental assistance
                according to available program funds.
              </p>
            </div>

          </div>

        </section>

        <ApplicationForm />

      </main>

    </div>
  );
}

export default App;