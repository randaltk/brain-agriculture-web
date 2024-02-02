"use client";

import "../producer-form/formStyles.css";
import styles from "../../app/page.module.css";
import React, { useEffect, useState } from "react";
import { Producer } from "@/interfaces";
import { useProducer } from "@/context/ProducerContext";
import { deleteProducer } from "@/services/api";
import Link from "next/link";
import Spinner from "../spinner/Spinner";

const ProducerList = () => {
  const { producers, isLoading, getAllProducers } = useProducer();
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    getAllProducers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProducer(id);

      setApiErrors([]);
      setSuccessMessage("Produtor excluído com sucesso!");

      await getAllProducers();
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setApiErrors([error.response.data.message]);
      } else {
        console.error("API request failed:", error);
      }
    }
  };
  return (
    <main className={styles.main}>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div>
          <div>
            <h2>Produtores</h2>
          </div>
          <ul>
            {producers.map((producer: Producer, key: number) => (
              <table key={key} cellSpacing={60}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Fazenda</th>
                    <th>CPF/CNPJ</th>
                    <th>Estado</th>
                    <th>Cidade</th>
                    <th>Area Total</th>
                    <th>Area de Cultivo</th>
                    <th>Area de Vegetação</th>
                    <th>Culturas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={producer.id}>
                    <td>{producer.id}</td>
                    <td>{producer.name}</td>
                    <td>{producer.farmName}</td>
                    <td>{producer.cpfCnpj}</td>
                    <td>{producer.state}</td>
                    <td>{producer.city}</td>
                    <td>{producer.totalArea}</td>
                    <td>{producer.cultivableArea}</td>
                    <td>{producer.vegetationArea}</td>
                    <td>
                      {producer.cultures.map((culture, key: number) => (
                        <div key={key}>{culture.name}</div>
                      ))}
                    </td>
                    <td>
                      <Link href={`/producers/update?id=${producer.id}`}>
                        <button>Update</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        id="remove"
                        onClick={() => handleDelete(producer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </ul>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {apiErrors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProducerList;
