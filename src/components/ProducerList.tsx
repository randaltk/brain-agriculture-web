"use client";

import "./formStyles.css";
import styles from "../app/page.module.css";
import React, { useEffect, useState } from "react";
import { Producer } from "@/interfaces";
import { useProducer } from "@/context/ProducerContext";
import { createProducer, deleteProducer, updateProducer } from "@/services/api";
import Link from "next/link";
import Spinner from "./spinner/Spinner";

const ProducerList = () => {
  const { producers, isLoading, getAllProducers } = useProducer();
  const [formData, setFormData] = useState<Partial<Producer>>({});

  useEffect(() => {
    getAllProducers();
  }, []);

  const handleCreate = async () => {
    await createProducer(formData);
    getAllProducers();
  };

  const handleDelete = async (id: number) => {
    await deleteProducer(id);
    getAllProducers();
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
                    <td>
                      <Link href={`/producers/update?id=${producer.id}`}>
                        <button>Update</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
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
        </div>
      )}
    </main>
  );
};

export default ProducerList;
