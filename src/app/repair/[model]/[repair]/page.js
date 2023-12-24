import React from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import repairServices from "../../../repairBrand.json";
const RepairLastPage = ({params}) => {

    const repairBrand = repairServices.filter(p => p.name === params.model);
    console.log(params);

    return (
        <div>
            <Header />

            <div>
                <h1>{params.model}</h1>
            </div>



            <Footer />
        </div>
    );
};

export default RepairLastPage;