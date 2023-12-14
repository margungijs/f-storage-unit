import React, { useState, useEffect } from 'react';

const TabComponent = () => {
  const [formData, setFormData] = useState({
    product: '',
    orderCompany: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    product: '',
    orderCompany: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [companyOptions, setCompanyOptions] = useState([]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value.trim() });
    setValidationErrors({ ...validationErrors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      const escapedErrors = {};
      Object.keys(errors).forEach((field) => {
        escapedErrors[field] = errors[field].replace(/</g, '&lt;').replace(/>/g, '&gt;');
      });
      setValidationErrors(escapedErrors);
      setSubmissionStatus('');
    } else {
      console.log('Form Data:', formData);
      try {
        const response = await fetch('http://localhost/storage/orderproduct.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: formData.product,
            orderCompany: formData.orderCompany,
          }),
        });

        if (response.ok) {
          // Reset form data and show success message
          setFormData({
            product: '',
            orderCompany: '',
          });

          setSubmissionStatus('Form submitted successfully!');

          // Reset success message after 3000 milliseconds
          setTimeout(() => {
            setSubmissionStatus('');
          }, 2500);
        } else {
          // Handle error response
          const data = await response.json();
          console.error('Error submitting form:', data);
          setSubmissionStatus('Error submitting form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionStatus('Error submitting form');
      }
    }
  };

  // Fetch company names from the API on component mount
  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await fetch('http://localhost/storage/selectcompany.php');
        const data = await response.json();
        setCompanyOptions(data);
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    };

    fetchCompanyNames();
  }, []);

  return (
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
        <form
            className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg w-full p-6 max-w-[70%] md:max-w-[60%] lg:max-w-[50%] mx-auto text-center"
            onSubmit={handleSubmit}
        >
          <div className="w-full mb-6">
            <label className="block font-bold text-gray-700">Order Product</label>
            <input
                className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
                type="text"
                onChange={(e) => handleChange('product', e.target.value)}
                value={formData.product}
            />
            {validationErrors.product && (
                <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.product }} />
            )}
          </div>

          {/* Order Company */}
          <div className="w-full mb-6">
            <label className="block font-bold text-gray-700">Order Company</label>
            <select
                className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
                onChange={(e) => handleChange('orderCompany', e.target.value)}
                value={formData.orderCompany}
            >
              <option value="">Select Order Company</option>
              {companyOptions.map((companyName, index) => (
                  <option key={index} value={companyName}>
                    {companyName}
                  </option>
              ))}
            </select>
            {validationErrors.orderCompany && (
                <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.orderCompany }} />
            )}
          </div>

          {submissionStatus && <p className="text-green-500">{submissionStatus}</p>}
          <button
              className="bg-green-500 text-white px-6 py-4 rounded-md transition-transform transform hover:bg-green-600 hover:scale-110 hover:transition-transform"
              type="submit"
          >
            Submit
          </button>
        </form>
      </div>
  );
};

export default TabComponent;
