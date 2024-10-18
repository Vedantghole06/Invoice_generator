import React from 'react';
import Invoice from './Invoice';

function InvoiceList({ invoices }) {
  return (
    <div>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <Invoice key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
}

export default InvoiceList;