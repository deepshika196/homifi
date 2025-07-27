
import '../styles/HeroSection.css';
import heroImage from '../assets/Electrician.png';
import serviceImage from '../assets/Ac_Mechanic.jpg'; 
import bgImage from '../assets/background.png';
import community from '../assets/community.png';
import complaint from '../assets/complaints.png';
import user from '../assets/users.png';
import pay from '../assets/pay.png';
function HeroSection() {
    return (
        <>
            <header className="hero-section " style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="hero-left">
                    <h1>Flatify</h1>
                    <h2>Your Flat, Our Priority</h2>
                    <div className="hero-buttons">
                        <a href="register" className="primary-btn">Register Flat</a>
                        <a href="about" className="secondary-btn">Learn More</a>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={heroImage} alt="Hero" />
                </div>
            </header>
            <section className="usermanage-section">
                <div className="usermanage-left">
                    <img src={user} alt="Service" />
                </div>
                <div className="usermanage-right">
                    <h2>User Access & Management</h2>
                    <p>
                       Flatify supports multiple user logins, tailored to the needs of each role within the community. Whether you're a resident, worker, or administrator, each user gets a personalized dashboard to perform their respective tasks securely and efficiently.
                    </p>
                </div>
            </section>
            <section className='payment-section'>
                <div className="payment-left">
                    <h2>Simplified Rent Collection</h2>
                    <p>
                       For administrators, Flatify offers a streamlined rent monitoring system. Rent collection is made easier and more transparent for residents through a secure online payment portal, ensuring timely payments and hassle-free tracking.
                    </p>
                </div>
                <div className="payment-right">
                    <img src={pay} alt="Community" />
                </div>
            </section>

            <section className="maintenance-section">
                <div className="maintenance-left">
                    <img src={serviceImage} alt="Service" />
                </div>
                <div className="maintenance-right">
                    <h2>Maintenance Regulation</h2>
                    <p>
                        The Flatify Maintenance Regulation is designed to ensure that the maintenance of your flat is handled efficiently and effectively. Our team of experts is dedicated to providing top-notch services, ensuring that your living space remains in optimal condition.
                    </p>
                </div>
            </section>

            <section className='community-section'>
                <div className="community-left">
                    <h2>Community Announcements</h2>
                    <p>
                        The latest updates and announcements from your community. Stay informed about upcoming events, maintenance schedules, and important notices that affect your living environment.
                    </p>
                </div>
                <div className="community-right">
                    <img src={community} alt="Community" />
                </div>
            </section>

            <section className="complaint-section">
                <div className="complaint-left">
                    <img src={complaint} alt="Complaint" />
                </div>
                <div className="complaint-right">
                    <h2>Complaint Registration</h2>
                    <p>
                        If you have any issues or complaints regarding your flat, our complaint registration system allows you to report them easily. Our team will address your concerns promptly to ensure a comfortable living experience.
                    </p>
                </div>
            </section>
        </>
    );
}

export default HeroSection;