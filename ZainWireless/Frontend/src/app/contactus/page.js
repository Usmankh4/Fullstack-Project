import '../globals.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { ContactForm } from './contact-form';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Zain Wireless for phone repairs and accessories',
};

export default function Contact() {
  return (
    <div>
      <Header />
      <div className="pageAfterHeader">
        <div className="ContactContainer">
          <div className="MainContent">
            <h2>Contact Us</h2>
            <p>Please fill out the form below and we will get back to you!</p>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
