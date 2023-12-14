import React from 'react';

const PdfGeneration = () => {
    const downloadPDF = async () => {
        try {
            const response = await fetch('http://localhost/api/PDFAtskaite', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Create a Blob from the PDF data
            const blob = await response.blob();

            // Create a temporary link element
            const link = document.createElement('a');

            // Set the href attribute with the Blob data
            link.href = window.URL.createObjectURL(blob);

            // Set the download attribute with the desired file name
            link.download = 'example.pdf';

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


    return (
        <div>
            <button
                onClick = {downloadPDF}
            >
                asd
            </button>
        </div>
    );
};

export default PdfGeneration;