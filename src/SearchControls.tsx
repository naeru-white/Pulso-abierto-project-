import React, { useState } from 'react';
import { z } from 'zod';

const searchSchema = z.object({
  searchTerm: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val.length >= 2 || val.length === 0, {
      message: 'Ingresa al menos 2 caracteres para filtrar',
    }),
  category: z.enum(['all', 'top', 'alts'], {
    errorMap: () => ({ message: 'Selecciona una opción válida' }),
  }),
});

interface Props {
  onSearch: (filters: { searchTerm: string; category: string }) => void;
}

export const SearchControls: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [errors, setErrors] = useState<{ searchTerm?: string; category?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = searchSchema.safeParse({ searchTerm, category });

    if (!result.success) {
      const formattedErrors: { searchTerm?: string; category?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'searchTerm') formattedErrors.searchTerm = issue.message;
        if (issue.path[0] === 'category') formattedErrors.category = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    onSearch(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Buscador y Filtros</h2>
      <div className="form-group">
        <label htmlFor="search">Buscar moneda:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej. Bitcoin, btc..."
        />
        {errors.searchTerm && <span className="error-text">⚠️ {errors.searchTerm}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Todas</option>
          <option value="top">Top Principal</option>
          <option value="alts">Altcoins</option>
        </select>
        {errors.category && <span className="error-text">⚠️ {errors.category}</span>}
      </div>

      <button type="submit" className="btn-primary">Filtrar</button>
    </form>
  );
};