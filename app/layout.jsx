import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import  AuthProvider  from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export const metadata = {
  title: 'PropertyPulse',
  description: 'Find The Perfect Dream Rental Property',
  keywords: 'rental, property, real estate , Dream Property, PropertyPulse, rent, house, apartment, search, listings, neighborhood, amenities, budget',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
