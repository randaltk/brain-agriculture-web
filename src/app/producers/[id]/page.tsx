"use client";

import styles from "../../../app/page.module.css";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Producer } from "@/interfaces";
import { getProducerById, updateProducer } from "@/services/api";
import CreateProducerForm from "@/components/producer-form/ProducerForm";
import Spinner from "@/components/spinner/Spinner";

const ProducerDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null;

  const [formData, setFormData] = useState<Partial<Producer>>({
    cultures: [],
  });

  useEffect(() => {
    const fetchProducer = async () => {
      if (id) {
        const fetchedProducer = await getProducerById(id);
        setFormData(fetchedProducer);
      }
    };

    fetchProducer();
  }, [id]);

  const handleUpdate = async () => {
    if (id) {
      await updateProducer(id, formData);
      router.push("/producers");
    }
  };

  if (!formData.name) {
    return <Spinner/>
  }
  return (
    <div className={styles.main}>
      <div>
        <h2>Editar produtor {formData.id}</h2>
      </div>

      <CreateProducerForm
        onCreate={(formData) => {
          // Handle update logic here
        }}
        initialData={formData}
      />

      <button onClick={handleUpdate}>Update Producer</button>
    </div>
  );
};

export default ProducerDetail;
