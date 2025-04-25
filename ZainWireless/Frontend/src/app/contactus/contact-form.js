"use client";

import { useState } from 'react';
import { submitContactForm } from '../actions';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', isError: false });

    try {
      // Create FormData object to pass to the server action
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('message', formData.message);

      const result = await submitContactForm(formDataObj);

      if (result.success) {
        setStatus({ message: 'Message sent successfully!', isError: false });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({ message: result.error || 'Failed to send the message.', isError: true });
      }
    } catch (error) {
      setStatus({ message: 'An error occurred. Please try again.', isError: true });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {status.message && (
        <div className={`status-message ${status.isError ? 'error' : 'success'}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting}
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </>
  );
}
