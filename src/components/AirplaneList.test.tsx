import AirplaneList from "./AirplaneList";
import { render, fireEvent, screen } from "@testing-library/react";

const dummyAirplanes = [
  { id: 0, model: "Airbus", capacity: 230, type: "A320" },
  { id: 1, model: "Boeing", capacity: 368, type: "777" },
  { id: 2, model: "Gulfstream", capacity: 19, type: "G800" },
];

const dummyAirplanes2 = [
  { id: 0, model: "Airbus", capacity: 230, type: "A320" },
];

const mockOnDeleteHandler = jest.fn();
const mockOnUpdateHandler = jest.fn();

test("check read", () => {
  render(
    <AirplaneList
      airplanes={dummyAirplanes}
      onDeleteHandler={mockOnDeleteHandler}
      onUpdateHandler={mockOnUpdateHandler}
    />
  );

  expect(screen.getByText("Airbus")).toBeInTheDocument();
  expect(screen.getByText("230")).toBeInTheDocument();
  expect(screen.getByText("A320")).toBeInTheDocument();

  expect(screen.getByText("Boeing")).toBeInTheDocument();
  expect(screen.getByText("368")).toBeInTheDocument();
  expect(screen.getByText("777")).toBeInTheDocument();

  expect(screen.getByText("Gulfstream")).toBeInTheDocument();
  expect(screen.getByText("19")).toBeInTheDocument();
  expect(screen.getByText("G800")).toBeInTheDocument();
});

test("check delete", () => {
  render(
    <AirplaneList
      airplanes={dummyAirplanes2}
      onDeleteHandler={mockOnDeleteHandler}
      onUpdateHandler={mockOnUpdateHandler}
    />
  );

  expect(screen.getByText("Delete")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Delete"));
  expect(mockOnDeleteHandler).toHaveBeenCalledTimes(1);
});
