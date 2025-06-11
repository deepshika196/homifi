import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PrivacyPolicy.css'

function PrivacyPolicy () {
  return (
    <>
    <Navbar/>
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Introduction:</strong> At Homifi, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>Personal Information:</strong> When you create an account or use our services, we may collect personal information such as your name, address, email, phone number, and payment details.
      </p>
      <p>
        <strong>Service Information:</strong> We collect data related to your service requests, such as the type of service, service provider assigned, and completion status.
      </p>
      <p>
        <strong>Device Information:</strong> We collect information about the device you use to access our platform, such as the IP address, browser type, and operating system.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        <strong>Service Delivery:</strong> We use your personal information to connect you with service providers, process payments, and manage your service requests.
      </p>
      <p>
        <strong>Improvement of Services:</strong> We may analyze your usage data to improve the performance and functionality of our platform.
      </p>
      <p>
        <strong>Marketing:</strong> With your consent, we may send you promotional emails about new services or offers. You can opt out at any time.
      </p>

      <h2>3. Data Sharing</h2>
      <p>We will not share your personal data with third parties except in the following cases:</p>
      <p>
        <strong>Service Providers:</strong> Your contact information will be shared with service providers to facilitate service delivery.
      </p>
      <p>
        <strong>Legal Obligations:</strong> We may disclose your information if required by law or in response to legal requests.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee the security of your data.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. You may also withdraw your consent for data processing at any time.
      </p>

      <h2>6. Changes to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at [Email Address].
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
