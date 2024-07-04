"use client";
import '../globals.css';
import Header from '../../components/header';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/myapp/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } else {
            alert('Failed to send the message.');
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="pageAfterHeader">
                <div className="ContactContainer">
                    <div className="MainContent">
                        <h2>Contact Us</h2>
                        <p>Please fill out the form below and we will get back to you!</p>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
