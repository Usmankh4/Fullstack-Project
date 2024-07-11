"use client";
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';

export default function PhoneRepairServices() {
    const router = useRouter();
    const { phone } = useParams();
    const [repairServices, setRepairServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (phone) {
            const fetchRepairServices = async () => {
                setLoading(true);
                try {
                    const res = await axios.get('http://localhost:8000/myapp/api/phone-models/');
                    setRepairServices(res.data.results);
                } catch (error) {
                    console.error('Error fetching repair services:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRepairServices();
        }
    }, [phone]);

    const phoneModel = repairServices.find(model => decodeURIComponent(phone) === model.name);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className="repairContainer">
                    <div className="repairContent">
                        <div className="repairHeaderContent">
                            <h2 className="phoneTitle">{decodeURIComponent(phone)}</h2>
                            {phoneModel && phoneModel.image && (
                                <img src={phoneModel.image} alt={phoneModel.name} className="repairImage" />
                            )}
                        </div>
                        <div className="repairWrapper">
                            {phoneModel && phoneModel.repair_services.length > 0 ? (
                                <ul className="repairServicesList">
                                    {phoneModel.repair_services.map((service) => (
                                        <li key={service.id} className="repairServiceItem">
                                            <span className="serviceName">{service.service_type}</span>
                                            <span className="servicePrice">
                                                {service.price === 'Free' || service.price === 'Call' ? service.price : `$${service.price}`}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="noServices">No repair services available for this model.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="repairInfo">
                    <p>Free Diagnostic</p>
                    <p>High-Quality OEM Parts</p>
                    <p>Certified Repair Specialists</p>
                    <p>Quick & Convenient Repair Process</p>
                    <p>Lifetime Warranty</p>
                    <div className="contactInfo">
                        <h3>Give us a call now</h3>
                        <p>289.232.7771</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
