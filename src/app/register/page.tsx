"use client";

import CreateProducerForm from "@/components/producer-form/ProducerForm";

const Register = () => {
  return (
    <>
      <div>
        <h2>Cadastrar</h2>
      </div>
      <CreateProducerForm
        onCreate={function (formData: FormData): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default Register;
