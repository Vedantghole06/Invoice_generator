import { useState } from 'react';

function InvoiceForm({ onAddInvoice }) {
  const [invoice, setInvoice] = useState({
    billTo: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    taxRate: 18 // Updated GST rate
  });

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    setInvoice(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddInvoice(invoice);
    // Reset form or navigate to invoice list
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <div className="form-section fade-in">
        <h3>Bill To</h3>
        <div className="input-group">
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
              value={invoice.billTo.name}
              onChange={(e) => handleInputChange(e, 'billTo', 'name')}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              placeholder="Address"
              value={invoice.billTo.address}
              onChange={(e) => handleInputChange(e, 'billTo', 'address')}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              placeholder="City"
              value={invoice.billTo.city}
              onChange={(e) => handleInputChange(e, 'billTo', 'city')}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              placeholder="State"
              value={invoice.billTo.state}
              onChange={(e) => handleInputChange(e, 'billTo', 'state')}
              required
            />
          </label>
          <label>
            Zip Code:
            <input
              type="text"
              placeholder="Zip Code"
              value={invoice.billTo.zipCode}
              onChange={(e) => handleInputChange(e, 'billTo', 'zipCode')}
              required
            />
          </label>
        </div>
      </div>
      <div className="form-section fade-in">
        <h3>Invoice Details</h3>
        <div className="input-group">
          <label>
            Invoice Number:
            <input
              type="text"
              placeholder="Invoice Number"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              required
            />
          </label>
          <label>
            Invoice Date:
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => setInvoice({ ...invoice, invoiceDate: e.target.value })}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              required
            />
          </label>
        </div>
      </div>
      <div className="form-section fade-in">
        <h3>Items</h3>
        {invoice.items.map((item, index) => (
          <div key={index} className="item-inputs">
            <label>
              Description:
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
            </label>
            <label>
              Unit Price:
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addItem} className="add-item-btn">Add Item</button>
      </div>
      <button type="submit" className="submit-btn">Create Invoice</button>
    </form>
  );
}

export default InvoiceForm;