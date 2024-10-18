import { useRef } from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas
import PropTypes from 'prop-types'; // Import PropTypes

function Invoice({ invoice }) {
  const invoiceRef = useRef(null); // Create a ref for the invoice element

  const calculateSubtotal = () => {
    return invoice.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.18; // 18% GST
  };

  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  // New function to handle invoice download as an image
  const handleDownload = () => {
    const invoiceElement = invoiceRef.current; // Use the ref to get the invoice element
    const button = document.querySelector('.download-invoice-button'); // Select the button

    // Hide the button before capturing
    button.style.display = 'none';

    html2canvas(invoiceElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
      link.download = `Invoice_${invoice.invoiceNumber}.png`; // Set the download filename
      link.click(); // Trigger the download

      // Show the button again after capturing
      button.style.display = 'block';
    });
  };

  return (
    <div className="invoice" ref={invoiceRef}> {/* Attach the ref to the invoice div */}
      <div className="invoice-header">
        <h1>XYZ
          <br />
          INDUSTRIES</h1>
        <p>xyz
          <br />
          Maharashtra, India
          <br />
          GSTIN: 1234567890
          <br />
          PAN: ABCDE1234F
          <br />
          EMAIL: xyz@gmail.com
        </p>
      </div>
      <h1>INVOICE</h1>
      <div className="invoice-details">
        <div className="bill-to">
          <h3>Bill To</h3>
          <p>{invoice.billTo.name}</p>
          <p>{invoice.billTo.address}</p>
          <p>{invoice.billTo.city}, {invoice.billTo.state} {invoice.billTo.zipCode}</p>
        </div>
        <div className="invoice-info">
          <p><strong>Invoice No.:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {formatDate(invoice.invoiceDate)}</p>
          <p><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
        </div>
      </div>
      <table className="invoice-items">
        <thead>
          <tr>
            <th>QTY</th>
            <th>DESCRIPTION</th>
            <th>UNIT PRICE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>₹{item.unitPrice.toFixed(2)}</td>
              <td>₹{(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-summary">
        <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
        <p><strong>GST 18%:</strong> ₹{tax.toFixed(2)}</p>
        <p><strong>TOTAL:</strong> ₹{total.toFixed(2)}</p>
      </div>
      <button onClick={handleDownload} className="download-invoice-button">Download Invoice</button>
    </div>
  );
}

Invoice.propTypes = {
  invoice: PropTypes.shape({
    invoiceNumber: PropTypes.string.isRequired, // Validate invoiceNumber
    invoiceDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    billTo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Invoice;
