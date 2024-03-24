import { useState } from "react";
import Airplane from "./Airplane";
import "./AirplaneList.css";
import EditAirplane from "./EditAirplane";
import { start } from "repl";

interface Props {
  airplanes: Airplane[];
  onDeleteHandler: (id: number) => void;
  onUpdateHandler: (
    id: number,
    model: string,
    capacity: number,
    type: string
  ) => void;
  startIndex: number;
  endIndex: number;
}

function AirplaneList({
  airplanes,
  onDeleteHandler,
  onUpdateHandler,
  startIndex,
  endIndex,
}: Props) {
  const [updateId, setUpdateId] = useState(-1);
  const slicedAirplanes = airplanes.slice(startIndex, endIndex + 1);
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Model</th>
          <th>Capacity</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {slicedAirplanes.map((airplane) =>
          airplane.id === updateId ? (
            <EditAirplane
              updateId={updateId}
              currModel={airplane.model}
              currCapacity={airplane.capacity}
              currType={airplane.type}
              setUpdateId={setUpdateId}
              onUpdateHandler={onUpdateHandler}
            />
          ) : (
            <tr key={airplane.id}>
              <td>{airplane.model}</td>
              <td>{airplane.capacity}</td>
              <td>{airplane.type}</td>
              <td className="td-map">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setUpdateId(airplane.id);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeleteHandler(airplane.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default AirplaneList;
