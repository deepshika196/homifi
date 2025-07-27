
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactPage.css';

function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="contact-main">
                <section className="contact-card">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        Reach out to our community team for any queries or support.
                    </p>
                    <div className="contact-list">
                        <div className="contact-person">
                            <h2>Ananya Rao</h2>
                            <p><b>Phone:</b> +91 98765 43210</p>
                            <p><b>Email:</b> ananya.rao@flatify.com</p>
                        </div>
                        <div className="contact-person">
                            <h2>Rahul Mehta</h2>
                            <p><b>Phone:</b> +91 91234 56789</p>
                            <p><b>Email:</b> rahul.mehta@flatify.com</p>
                        </div>
                        <div className="contact-person">
                            <h2>Priya Singh</h2>
                            <p><b>Phone:</b> +91 99887 66554</p>
                            <p><b>Email:</b> priya.singh@flatify.com</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ContactPage;
