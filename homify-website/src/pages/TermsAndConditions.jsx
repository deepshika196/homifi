import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/TermsAndConditions.css';

function TermsAndConditions () {
  return (
    <>
    <Navbar />
    <div className="terms">
      <h1>Terms and Conditions</h1>
      <p>
        <strong>Introduction:</strong> Welcome to Homifi! By using our website and services, you agree to comply with the following terms and conditions. Please read them carefully before accessing or using our platform.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using the Homifi platform, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using Homifi services, you shall be subject to any posted guidelines or rules applicable to such services.
      </p>

      <h2>2. Services Provided</h2>
      <p>
        Homifi provides a platform that connects users with home service providers for various services such as plumbing, electrical work, cleaning, and more. Homifi acts as an intermediary and is not directly responsible for the services provided by third-party contractors.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>
        Users must provide accurate and up-to-date information when creating accounts and booking services. Users are responsible for maintaining the confidentiality of their login credentials and for all activities that occur under their account.
      </p>

      <h2>4. Payment Terms</h2>
      <p>
        All payments for services booked through Homifi must be made via the platform. Homifi is not responsible for any payments made outside the platform. Prices for services may vary based on the service provider, location, and scope of work.
      </p>

      <h2>5. Service Provider Responsibilities</h2>
      <p>
        Service providers are independent contractors and are not employees of Homifi. Service providers must comply with local regulations and are responsible for the quality and timely completion of services.
      </p>

      <h2>6. Cancellation and Refund Policy</h2>
      <p>
        Users may cancel a booking up to 24 hours before the scheduled service time for a full refund. Cancellations made within 24 hours may not be eligible for a refund. In case of disputes, Homifi will facilitate communication between users and service providers.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        Homifi is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of the platform or the services provided by third-party contractors. Users acknowledge that Homifi's role is limited to connecting users with service providers.
      </p>

      <h2>8. Modifications to Terms</h2>
      <p>
        Homifi reserves the right to modify these terms at any time. Any changes will be posted on this page, and it is the user’s responsibility to review the terms periodically. Continued use of the platform after any modifications constitutes acceptance of the revised terms.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of [Country/State], and users agree to submit to the jurisdiction of the courts in that location.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at [Email Address].
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;
