import React from "react";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner component", () => {
  it("renders without errors", () => {
    render(<Spinner />);
  });

  it("displays the loading spinner image", () => {
    const { getByAltText } = render(<Spinner />);
    const spinnerImage = getByAltText("Loading Spinner");
    expect(spinnerImage).toBeTruthy();
  });
});
