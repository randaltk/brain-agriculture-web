"use client";

import CreateProducerForm from "@/components/producer-form/ProducerForm";
import { createProducer } from "@/services/api";

const Register = () => {
  return (
    <>
      <div>
        <h2>Cadastrar</h2>
      </div>

      <CreateProducerForm onCreate={createProducer} />
    </>
  );
};

export default Register;
