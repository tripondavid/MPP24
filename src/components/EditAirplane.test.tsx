import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from "@testing-library/react";
import EditAirplane from "./EditAirplane";
import App from "../App";

test("test update", () => {
  const dummyAirplanes = [
    { id: 0, model: "Airbus", capacity: 230, type: "A320" },
  ];
  render(<App dummyAirplanes={dummyAirplanes} />);

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);
  const inputModel = screen.getByPlaceholderText("Airbus");
  const inputCapacity = screen.getByPlaceholderText("230");
  const inputType = screen.getByPlaceholderText("A320");
  fireEvent.change(inputModel, { target: { value: "Cessna" } });
  fireEvent.change(inputCapacity, { target: { value: 2 } });
  fireEvent.change(inputType, { target: { value: "Type A" } });
  fireEvent.click(screen.getByText("Save & Close"));

  expect(screen.getByText("Cessna")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("Type A")).toBeInTheDocument();
});
