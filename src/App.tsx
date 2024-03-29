import "./App.css";
import Airplane from "./components/Airplane";
import AirplaneList from "./components/AirplaneList";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import PieChart from "./components/PieChart";

interface Props {
  dummyAirplanes: Airplane[];
}

function App({ dummyAirplanes }: Props) {
  const [airplanes, setAirplanes] = useState<Airplane[]>(dummyAirplanes);
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [type, setType] = useState("");
  const inputs = document.querySelectorAll("input");
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    3 < airplanes.length ? 3 : airplanes.length - 1
  );
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [maxLength, setMaxLength] = useState(dummyAirplanes.length);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const handleChangeModel = (event: ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  const handleChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    const floatNumber = parseFloat(event.target.value);
    setCapacity(floatNumber);
  };

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleNegativeValue = (event: any) => {
    if (event.key === "-") event.preventDefault();
  };

  const handleAddPlane = () => {
    const airplane: Airplane = {
      id: maxLength,
      model: model,
      capacity: capacity,
      type: type,
    };
    setAirplanes([...airplanes, airplane]);
    const updateMax = maxLength + 1;
    setMaxLength(updateMax);

    inputs.forEach((input) => (input.value = ""));
  };

  const handleDeletePlane = (id: number) => {
    setAirplanes([...airplanes].filter((airplane) => airplane.id !== id));
  };

  const handleEditPlane = (
    updateId: number,
    updateModel: string,
    updateCapacity: number,
    updateType: string
  ) => {
    const updateAirplane: Airplane = {
      id: updateId,
      model: updateModel,
      capacity: updateCapacity,
      type: updateType,
    };

    setAirplanes(
      airplanes.map((airplane) =>
        airplane.id !== updateId ? airplane : updateAirplane
      )
    );
  };

  const handleSortPlane = () => {
    const newAirplanes = [...airplanes].sort((a, b) => b.capacity - a.capacity);
    setAirplanes(newAirplanes);
  };

  const handlePrevPage = () => {
    setStartIndex(startIndex - pageSize >= 0 ? startIndex - pageSize : 0);
    setEndIndex(endIndex - pageSize);
    if (startIndex === 0) {
      setIsPrevDisabled(true);
    }
    if (endIndex < airplanes.length) {
      setIsNextDisabled(false);
    }
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    const updateStartIndex = startIndex + pageSize;
    setStartIndex(updateStartIndex);
    const updatePrevIndex =
      endIndex < airplanes.length ? endIndex + pageSize : airplanes.length - 1;
    console.log(updatePrevIndex);
    setEndIndex(updatePrevIndex);
    setPageNumber(pageNumber + 1);
  };

  const updateButtonsStatus = () => {
    if (startIndex > 0) {
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
    }
    if (endIndex >= airplanes.length - 1) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  };

  const handlePageSize = (event: any) => {
    const updatePageSize = event.target.value;
    setPageNumber(1);
    setPageSize(updatePageSize);
    setStartIndex(0);
    const updateEndIndex =
      updatePageSize < airplanes.length
        ? updatePageSize - 1
        : airplanes.length - 1;
    setEndIndex(updateEndIndex);
  };

  useEffect(() => {
    updateButtonsStatus();
  });
  return (
    <>
      <div className="input-div">
        <div>
          <label>Airplane Model:</label>
          <input
            type="text"
            className="input-style"
            placeholder="Airplane Model..."
            onChange={handleChangeModel}
          />
        </div>

        <div>
          <label>Airplane Capacity:</label>
          <input
            type="number"
            className="input-style"
            placeholder="Airplane Capacity..."
            onKeyDown={handleNegativeValue}
            onChange={handleChangeCapacity}
          />
        </div>

        <div>
          <label>Airplane Type:</label>
          <input
            type="text"
            className="input-style"
            placeholder="Airplane Type..."
            onChange={handleChangeType}
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddPlane}
        >
          Insert the Airplane
        </button>

        <button
          type="button"
          className="btn btn-warning"
          onClick={handleSortPlane}
        >
          Sort by Capacity
        </button>
      </div>

      <div className="Airplane-list">
        <AirplaneList
          airplanes={airplanes}
          onDeleteHandler={handleDeletePlane}
          onUpdateHandler={handleEditPlane}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>

      <div className="pagination-div">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          Next
        </button>
        <p className="font-weight-light">Page: {pageNumber}</p>
        <select role="select" onChange={(event) => handlePageSize(event)}>
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </div>

      <div id="pie-chart" style={{ width: 700 }}>
        <PieChart airplanes={airplanes} />
      </div>
    </>
  );
}

export default App;
