import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';

function App() {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, { ...invoice, id: Date.now() }]);
  };

  return (
    <div className="App">
      <h1>Automated Invoice System</h1>
      <InvoiceForm onAddInvoice={addInvoice} />
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default App;
