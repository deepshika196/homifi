
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';

const AboutUs = () => (
  <div className="about-bg">
    <Navbar />
    <main className="about-main">
      <section className="about-card">
        <h1 className="about-title">Welcome to Flatify !!</h1>
        <p className="about-subtitle">
          Your all-in-one digital community platform for modern apartment living.
        </p>

        <div className="about-features">
          <div className="about-feature">
            <h2>1. Effortless Payments</h2>
            <ul>
              <li>
                <b>Online Gateway:</b> Residents can pay maintenance and other dues securely via integrated online payment options.
              </li>
              <li>
                <b>Cash at Office:</b> For those who prefer cash, payments can be made at the administration office. Administrators can mark payments as completed directly in the system.
              </li>
            </ul>
          </div>

          <div className="about-feature">
            <h2>2. Instant Notifications</h2>
            <ul>
              <li>
                Receive real-time updates on electricity issues, flat events, and emergencies directly on your phone and web app.
              </li>
            </ul>
          </div>

          <div className="about-feature">
            <h2>3. Smart Service Requests</h2>
            <ul>
              <li>
                <b>Private Requests:</b> Residents can easily raise tickets for personal issues (e.g., electrician, plumber, cleaner) in their own flats.
              </li>
              <li>
                <b>Public Requests:</b> Report problems in common areas, such as a broken corridor light or elevator issue, so the community can stay informed and maintenance can be scheduled efficiently.
              </li>
            </ul>
          </div>
        </div>

        <div className="about-note">
          <b>Flatify</b> is designed for both web and mobile, ensuring you stay connected to your community wherever you are. Our mission is to make flat management seamless and transparent for everyone—residents, administrators, and service staff alike.
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutUs;
