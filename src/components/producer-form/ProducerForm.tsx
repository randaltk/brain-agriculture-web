"use client";

import "./formStyles.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CreateProducerFormProps, Culture, Producer } from "@/interfaces";

const CreateProducerForm: React.FC<CreateProducerFormProps> = ({
  onCreate,
  initialData,
}) => {
  const initialCulture: Culture = { name: "" };
  const initialProducer: Producer = {
    id: 0,
    cpfCnpj: "",
    name: "",
    farmName: "",
    city: "",
    state: "",
    totalArea: 0,
    cultivableArea: 0,
    vegetationArea: 0,
    cultures: [initialCulture],
  };

  const [formData, setFormData] = useState<Producer>(initialProducer);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...initialData,
      id: initialData?.id || 0,
    }));
  }, [initialData]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCultureChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedCultures = [...formData.cultures];
    // updatedCultures[index][e.target.name] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      cultures: updatedCultures,
    }));
  };

  const handleAddCulture = () => {
    setFormData((prevData) => ({
      ...prevData,
      cultures: [...prevData.cultures, { ...initialCulture }],
    }));
  };

  const handleRemoveCulture = (index: number) => {
    const updatedCultures = [...formData.cultures];
    updatedCultures.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      cultures: updatedCultures,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("cpfCnpj", formData.cpfCnpj);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("farmName", formData.farmName);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("totalArea", formData.totalArea.toString());
    formDataToSend.append("cultivableArea", formData.cultivableArea.toString());
    formDataToSend.append("vegetationArea", formData.vegetationArea.toString());

    formData.cultures.forEach((culture, index) => {
      formDataToSend.append(`cultures[${index}].name`, culture.name);
    });

    onCreate(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Nome
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        CPF/CNPJ:
        <input
          type="text"
          name="cpfCnpj"
          value={formData.cpfCnpj}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Nome da Fazenda
        <input
          type="text"
          name="farmName"
          value={formData.farmName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Estado
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Cidade
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Area Total
        <input
          type="number"
          name="totalArea"
          value={formData.totalArea}
          onChange={handleInputChange}
        />
      </label>
 
      <label>
        Area Cultivavel
        <input
          type="number"
          name="cultivableArea"
          value={formData.cultivableArea}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Area de Vegetação
        <input
          type="number"
          name="vegetationArea"
          value={formData.vegetationArea}
          onChange={handleInputChange}
        />
      </label>

      <h3>Culturas</h3>
      {formData.cultures.map((culture, index) => (
        <div key={index}>
          <label>
            Nome da Cultura:
            <input
              type="text"
              name={`cultures[${index}].name`}
              value={culture.name}
              onChange={(e) => handleCultureChange(index, e)}
            />
          </label>
       
          <button type="button" onClick={() => handleRemoveCulture(index)}>
            Remover Cultura
          </button>
        </div>
      ))}

      <div>
        <button onClick={handleAddCulture}>Adicionar Cultura</button>
      </div>
      <div>
        <button type="submit">Criar Produtor</button>
      </div>
    </form>
  );
};

export default CreateProducerForm;
