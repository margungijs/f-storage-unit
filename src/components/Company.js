import React, { useState } from 'react';

const Company = () => {
  const [formData, setFormData] = useState({
    regNumber: '',
    companyName: '',
    sia: '',
    rekviziti: '',
    juridiskaAdrese: '',
    faktiskaAdrese: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    regNumber: '',
    companyName: '',
    sia: '',
    rekviziti: '',
    juridiskaAdrese: '',
    faktiskaAdrese: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setValidationErrors({ ...validationErrors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      } else if (field === 'regNumber' && (!/^\d+$/.test(formData[field]) || formData[field].length !== 11)) {
        errors[field] = 'Reg Number must be 11 digits';
      } else if (field === 'sia' && !/(SIA|AS)/.test(formData[field].toUpperCase())) {
        errors[field] = 'SIA must contain "SIA" or "AS"';
      } else if (!/^[a-zA-Z0-9\s]+$/.test(formData[field])) {
        errors[field] = 'Special characters are not allowed';
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
      try {
        const response = await fetch('http://localhost/storage/company.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          setFormData({
            regNumber: '',
            companyName: '',
            sia: '',
            rekviziti: '',
            juridiskaAdrese: '',
            faktiskaAdrese: '',
          });
          setSubmissionStatus('Form submitted successfully!');

          setTimeout(() => {
            setSubmissionStatus('');
          }, 2500);
        } else {
          // Handle error from the API
          console.error('API error:', response.statusText);
        }
      } catch (error) {
        console.error('Error connecting to the API:', error.message);
      }
    }
  };


  return (
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
        <form
            className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg w-full p-6 max-w-[70%] md:max-w-[60%] lg:max-w-[50%] mx-auto"
            onSubmit={handleSubmit}
        >
        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">Reg Number</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('regNumber', e.target.value)}
            value={formData.regNumber}
          />
          {validationErrors.regNumber && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.regNumber }} />
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">Company Name</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('companyName', e.target.value)}
            value={formData.companyName}
          />
          {validationErrors.companyName && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.companyName }} />
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">SIA</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('sia', e.target.value)}
            value={formData.sia}
          />
          {validationErrors.sia && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.sia }} />
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">Rekviziti</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('rekviziti', e.target.value)}
            value={formData.rekviziti}
          />
          {validationErrors.rekviziti && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.rekviziti }} />
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">Juridiska Adrese</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('juridiskaAdrese', e.target.value)}
            value={formData.juridiskaAdrese}
          />
          {validationErrors.juridiskaAdrese && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.juridiskaAdrese }} />
          )}
        </div>

        <div className="w-full mb-6">
          <label className="block font-bold text-gray-700">Faktiska Adrese</label>
          <input
            className="form-control w-full px-6 py-4 border border-green-500 rounded-md focus:outline-none focus:border-green-600"
            type="text"
            onChange={(e) => handleChange('faktiskaAdrese', e.target.value)}
            value={formData.faktiskaAdrese}
          />
          {validationErrors.faktiskaAdrese && (
            <p className="text-red-500" dangerouslySetInnerHTML={{ __html: validationErrors.faktiskaAdrese }} />
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

export default Company;
