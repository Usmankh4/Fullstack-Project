import Header from '../../components/header';
import Footer from '../../components/footer';

const WarrantyPage = () => {
  return (
    <div>
      <Header />
      <div className="pageAfterHeader">
        <div className="warranty-container">
          <h1>Warranty Information</h1>
          <p>
           At Zainwireless, we include a free 1-year warranty with every device purchased on or after June 8th, 2023. Devices purchased before this date come with a 90-day warranty.
          </p>
          <h2>Warranty Coverage:</h2>
          <p>Our warranty covers manufacturing defects and malfunctions. However, it does not cover:</p>
          <ul>
            <li>Accidental damage</li>
            <li>Physical damage</li>
            <li>Fall damage</li>
            <li>Water damage</li>
            <li>Battery issues</li>
            <li>Any user error</li>
          </ul>
          <h2>How to Make a Warranty Claim:</h2>
          <p>
            For any warranty claims, please contact us at <a href="zainwireless91@gmail.com">zainwireless91@gmail.com</a>. Ensure the subject line of your email reads "Warranty Claim" and include the following information:
          </p>
          <ul>
            <li>Full Name</li>
            <li>Contact Information</li>
            <li>Purchase Date</li>
            <li>Device Model</li>
            <li>Detailed Description of the Issue</li>
          </ul>
          <p>We are committed to addressing your concerns promptly and efficiently.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WarrantyPage;
