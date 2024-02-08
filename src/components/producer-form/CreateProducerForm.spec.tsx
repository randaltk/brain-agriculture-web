import { render, screen } from "@testing-library/react";

import CreateProducerForm from "./ProducerForm";
import { createProducer } from "@/services/api";


describe("CreateProducerForm", () => {
  it("renders CreateProducerForm component", () => {
    render(<CreateProducerForm onCreate={createProducer} />);

    const nameInputs = screen.getAllByLabelText(/Nome/i);
    const farmNameInputs = screen.getAllByLabelText(/Nome da Fazenda/i);
    expect(nameInputs.length).toBeGreaterThan(0);

    expect(farmNameInputs.length).toBeGreaterThan(0);
  });
});
