// components/ClientForm.js
import { useState } from 'react';
import { addClient } from '../lib/api';

export default function ClientForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    codiceFiscale: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addClient(formData);
    // Redirect or clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" />
      <input name="cognome" value={formData.cognome} onChange={handleChange} placeholder="Cognome" />
      <input name="codiceFiscale" value={formData.codiceFiscale} onChange={handleChange} placeholder="Codice Fiscale" />
      <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Numero Telefono" />
      <button type="submit">Add Client</button>
    </form>
  );
}
