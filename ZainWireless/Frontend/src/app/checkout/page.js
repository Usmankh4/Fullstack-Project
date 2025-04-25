import Header from "../../components/header";
import Footer from "../../components/footer";
import { CheckoutClient } from './checkout-client';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your purchase at Zain Wireless',
};

export default function CheckoutPage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <div className="pageAfterHeader">
          <CheckoutClient />
        </div>
      </div>
      <Footer />
    </div>
  );
}
