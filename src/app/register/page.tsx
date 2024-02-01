"use client";

import CreateProducerForm from "@/components/CreateProducerForm";

const Register = () => {
  return (
    <CreateProducerForm
      onCreate={function (formData: FormData): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default Register;
