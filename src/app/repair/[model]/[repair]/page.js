import React from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
const RepairLastPage = ({params}) => {
   
    return (
        <div>
            <Header />

            {/* Main content */}
            <div>
                {/* Your page content goes here */}
                <h1>{params.model}</h1>
            </div>

           

            <Footer />
        </div>
    );
};

export default RepairLastPage;
