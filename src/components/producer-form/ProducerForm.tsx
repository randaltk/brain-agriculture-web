"use client";

import "./formStyles.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CreateProducerFormProps, Culture, Producer } from "@/interfaces";
import { validateCPFAndCNPJ } from "@/validations";
import { fetchCities, fetchStates, updateProducer } from "@/services/api";

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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...initialData,
      cultures: initialData?.cultures || [initialCulture],
      id: initialData?.id || 0,
    }));
  }, [initialData]);
  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const statesData = await fetchStates();
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStatesData();
  }, []);
  const handleStateChange = async (selectedState: any) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "",
    }));

    try {
      const citiesData = await fetchCities(selectedState);
      setCities(citiesData);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const isCPFOrCNPJValid = validateCPFAndCNPJ(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isCPFOrCNPJValid ? "" : "CPF ou CNPJ inválido",
    }));
  };

  const handleCultureChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedCultures = [...formData.cultures];
    updatedCultures[index] = { name: e.target.value };
    setFormData((prevData) => ({
      ...prevData,
      cultures: updatedCultures,
    }));
  };
  const handleAddCulture = () => {
    setFormData((prevData) => {
      const newCultures = [...prevData.cultures, { ...initialCulture }];
      return {
        ...prevData,
        cultures: newCultures,
      };
    });
  };

  const handleRemoveCulture = (cultureToRemove: Culture) => {
    setFormData((prevData) => {
      const updatedCultures = prevData.cultures.filter(
        (culture) => culture !== cultureToRemove
      );

      return {
        ...prevData,
        cultures: updatedCultures,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (formData.cpfCnpj.length === 11 || formData.cpfCnpj.length === 14) &&
      !validateCPFAndCNPJ(formData.cpfCnpj)
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: prevErrors.name,
        cpfCnpj:
          formData.cpfCnpj.length === 11 ? "CPF inválido" : "CNPJ inválido",
      }));
      return;
    }

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

    try {
      await onCreate(formDataToSend);

      setApiErrors([]);
      setSuccessMessage("Produtor criado com sucesso!");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setApiErrors((prevErrors) => [
          ...prevErrors,
          error.response.data.message,
        ]);
      } else {
        console.error("API request failed:", error);
      }
    }
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (formData.cpfCnpj.length === 11 || formData.cpfCnpj.length === 14) &&
      !validateCPFAndCNPJ(formData.cpfCnpj)
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        name: prevErrors.name,
        cpfCnpj:
          formData.cpfCnpj.length === 11 ? "CPF inválido" : "CNPJ inválido",
      }));
      return;
    }

    const formDataToUpdate = new FormData();
    formDataToUpdate.append("cpfCnpj", formData.cpfCnpj);
    formDataToUpdate.append("name", formData.name);
    formDataToUpdate.append("farmName", formData.farmName);
    formDataToUpdate.append("city", formData.city);
    formDataToUpdate.append("state", formData.state);
    formDataToUpdate.append("totalArea", formData.totalArea.toString());
    formDataToUpdate.append(
      "cultivableArea",
      formData.cultivableArea.toString()
    );
    formDataToUpdate.append(
      "vegetationArea",
      formData.vegetationArea.toString()
    );

    formData.cultures.forEach((culture, index) => {
      formDataToUpdate.append(`cultures[${index}].name`, culture.name);
    });

    if (formData.cultures.length === 0) {
      formDataToUpdate.append("cultures[0].name", "");
    }

    try {
      if (initialData?.id) {
        const updatedData = await updateProducer(
          initialData.id,
          formDataToUpdate
        );

        setFormData((prevData) => ({
          ...prevData,
          ...updatedData,
          cultures: updatedData?.cultures || [initialCulture],
        }));

        setApiErrors([]);
        setSuccessMessage("Produtor atualizado com sucesso!");
      } else {
        console.error("No ID found for update.");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setApiErrors((prevErrors) => [
          ...prevErrors,
          error.response.data.message,
        ]);
      } else {
        console.error("API request failed:", error);
      }
    }
  };

  const renderButtons = () => {
    if (initialData && initialData.id !== undefined) {
      return (
        <>
          <button  onClick={handleSubmitUpdate}>Atualizar Produtor</button>
        </>
      );
    } else {
      return <button type="submit">Criar Produtor</button>;
    }
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
          maxLength={50}
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
        {validationErrors.cpfCnpj && (
          <div className="error-message">{validationErrors.cpfCnpj}</div>
        )}
      </label>

      <label>
        Nome da Fazenda
        <input
          type="text"
          name="farmName"
          value={formData.farmName}
          onChange={handleInputChange}
          maxLength={50}
        />
      </label>
      <label>
        Estado
        <select
          name="state"
          value={formData.state}
          onChange={(e) => handleStateChange(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label>
        Cidade
        <select
          name="city"
          value={formData.city}
          onChange={(e) =>
            setFormData((prevData) => ({ ...prevData, city: e.target.value }))
          }
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
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

          <button id='remove' type="button" onClick={() => handleRemoveCulture(culture)}>
            Remover Cultura
          </button>
        </div>
      ))}

      <div>
        <button id='add' type="button" onClick={handleAddCulture}>Adicionar Cultura</button>
      </div>
      <div>{renderButtons()}</div>
      {apiErrors.map((error, index) => (
        <div key={index} className="error-message">
          {error}
        </div>
      ))}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
};

export default CreateProducerForm;
