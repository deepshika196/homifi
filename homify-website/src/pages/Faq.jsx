import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Faq.css';

function FAQ(){
  return (
    <>
    <Navbar/>
    <div className="faq">
      <h1>Frequently Asked Questions (FAQ)</h1>

      <h2>1. What is Homifi?</h2>
      <p>
        Homifi is a platform that connects you with home service providers for various tasks such as plumbing, electrical work, cleaning, and more. We provide a seamless experience for users to find reliable professionals to complete their household services.
      </p>

      <h2>2. How do I book a service?</h2>
      <p>
        Booking a service on Homifi is simple. Create an account, browse through available services, and choose the one you need. After selecting a service provider and scheduling a time, you&apos;ll receive confirmation, and the professional will be at your doorstep as per the agreed schedule.
      </p>

      <h2>3. What types of services are available?</h2>
      <p>
        We offer a wide range of services, including plumbing, electrical repairs, carpentry, cleaning, and beauty services, among others. Our platform allows you to browse through different categories and choose the service that best suits your needs.
      </p>

      <h2>4. How do I pay for the service?</h2>
      <p>
        All payments must be made through our secure online payment system, which accepts major credit/debit cards and other payment methods. You will only be charged once the service is completed.
      </p>

      <h2>5. Can I cancel a booking?</h2>
      <p>
        Yes, you can cancel a booking up to 24 hours before the scheduled service time for a full refund. Cancellations made within 24 hours may not be eligible for a refund, depending on the service provider&apos;s policy.
      </p>

      <h2>6. What if I&apos;m not satisfied with the service?</h2>
      <p>
        If you&apos;re not satisfied with the service, you can report the issue through our platform. We will work to mediate the situation between you and the service provider to reach a resolution. Refunds or service re-dos may be available, depending on the case.
      </p>

      <h2>7. Are the service providers vetted?</h2>
      <p>
        Yes, all our service providers go through a rigorous vetting process, including background checks, certification verification, and customer feedback reviews. We ensure that only qualified and trusted professionals are available on Homifi.
      </p>

      <h2>8. How can I contact customer support?</h2>
      <p>
        If you need assistance, you can contact our customer support team via the &apos;Contact Us&apos; section on the platform. You can also email us at [Customer Support Email], and we will respond to your query as soon as possible.
      </p>

      <h2>9. Do you offer any discounts?</h2>
      <p>
        Yes, we occasionally offer discounts and promotions for various services. You can subscribe to our newsletter or check our promotions page for the latest deals.
      </p>

      <h2>10. Can I reschedule my booking?</h2>
      <p>
        Yes, you can reschedule your booking by logging into your account and choosing a new date and time. However, rescheduling within 24 hours of the service may incur additional charges depending on the service provider&apos;s policy.
      </p>

      <h2>11. How does Homifi ensure safety during service?</h2>
      <p>
        Homifi takes your safety seriously. We ensure that all service providers are thoroughly vetted, and we have a feedback system to ensure quality. Additionally, service providers are required to follow strict safety and hygiene protocols during service.
      </p>

      <h2>12. How can I become a service provider?</h2>
      <p>
        If you&apos;re a skilled professional looking to offer services through Homifi, you can apply to become a service provider by filling out the registration form in the &apos;Become a Service Provider&apos; section. Once your application is reviewed and approved, you&apos;ll be able to accept jobs through our platform.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default FAQ;
