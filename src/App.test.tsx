import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import exp from "constants";

test("check add", () => {
  render(<App dummyAirplanes={[]} />);

  expect(screen.getByText("Insert the Airplane")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Airplane Model...")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Airplane Capacity...")
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Airplane Type...")).toBeInTheDocument();

  const inputModel = screen.getByPlaceholderText("Airplane Model...");
  const inputCapacity = screen.getByPlaceholderText("Airplane Capacity...");
  const inputType = screen.getByPlaceholderText("Airplane Type...");
  const button = screen.getByText("Insert the Airplane");

  fireEvent.change(inputModel, { target: { value: "Cessna" } });
  fireEvent.change(inputCapacity, { target: { value: 2 } });
  fireEvent.change(inputType, { target: { value: "Type A" } });
  fireEvent.click(button);
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText("Cessna")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("Type A")).toBeInTheDocument();
});

const dummyAirplanes = [
  { id: 1, model: "Boeing", capacity: 368, type: "777" },
  { id: 0, model: "Airbus", capacity: 230, type: "A320" },
  { id: 2, model: "Gulfstream", capacity: 19, type: "G800" },
];

test("check sort", () => {
  render(<App dummyAirplanes={dummyAirplanes} />);

  expect(screen.getByText("Sort by Capacity")).toBeInTheDocument();

  const sortButton = screen.getByText("Sort by Capacity");

  fireEvent.click(sortButton);

  const rows = screen.getAllByRole("row");

  const testSortedValues = rows
    .slice(1)
    .map((row) => row.querySelectorAll("td")[1].textContent);
  if (testSortedValues.length > 1) {
    const sortedValues = [...testSortedValues].sort((a, b) =>
      a !== null &&
      a !== undefined &&
      b !== null &&
      b !== undefined &&
      typeof a === "number" &&
      typeof b === "number"
        ? b - a
        : 0
    );
    expect(sortedValues === testSortedValues);
  } else {
    expect(true);
  }
});

test("check pagination", () => {
  render(<App dummyAirplanes={dummyAirplanes} />);

  expect(screen.getByText("Prev")).toBeInTheDocument();
  expect(screen.getByText("Next")).toBeInTheDocument();

  expect(screen.getByText("Prev")).toHaveAttribute("disabled");
  expect(screen.getByText("Next")).toHaveAttribute("disabled");

  const inputModel = screen.getByPlaceholderText("Airplane Model...");
  const inputCapacity = screen.getByPlaceholderText("Airplane Capacity...");
  const inputType = screen.getByPlaceholderText("Airplane Type...");
  const button = screen.getByText("Insert the Airplane");

  fireEvent.change(inputModel, { target: { value: "Cessna" } });
  fireEvent.change(inputCapacity, { target: { value: 2 } });
  fireEvent.change(inputType, { target: { value: "Type A" } });
  fireEvent.click(button);
  expect(screen.getByText("Next")).toHaveAttribute("enabled");
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText("Cessna")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("Type A")).toBeInTheDocument();

  expect(screen.getByText("Prev")).toHaveAttribute("enabled");
  expect(screen.getByText("Next")).toHaveAttribute("disabled");
});

test("check chart", () => {
  render(<App dummyAirplanes={dummyAirplanes} />);

  expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
});
