import { ChangeEvent, useState } from "react";
import "./EditAirplane.css";

interface Props {
  updateId: number;
  currModel: string;
  currCapacity: number;
  currType: string;
  setUpdateId: any;
  onUpdateHandler: (
    id: number,
    model: string,
    capacity: number,
    type: string
  ) => void;
}

function EditAirplane({
  updateId,
  currModel,
  currCapacity,
  currType,
  setUpdateId,
  onUpdateHandler,
}: Props) {
  const [updateModel, setUpdateModel] = useState(currModel);
  const [updateCapacity, setUpdateCapacity] = useState(currCapacity);
  const [updateType, setUpdateType] = useState(currType);

  const handleChangeModel = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateModel(event.target.value);
  };

  const handleChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    const floatNumber = parseFloat(event.target.value);
    setUpdateCapacity(floatNumber);
  };

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateType(event.target.value);
  };

  const SaveAndClose = (setUpdateId: any) => {
    const finalModel = updateModel !== "" ? updateModel : currModel;
    const finalCapacity =
      !Number.isNaN(updateCapacity) && updateCapacity !== 0
        ? updateCapacity
        : currCapacity;
    const finalType = updateType !== "" ? updateType : currType;
    onUpdateHandler(updateId, finalModel, finalCapacity, finalType);
    setUpdateId(-1);
  };

  const Close = (setUpdateId: any) => {
    setUpdateId(-1);
  };

  const handleNegativeValue = (event: any) => {
    if (event.key === "-") event.preventDefault();
  };

  return (
    <tr key={updateId}>
      <td>
        <input
          type="text"
          defaultValue={currModel}
          placeholder={currModel}
          onChange={handleChangeModel}
        ></input>
      </td>
      <td>
        <input
          type="number"
          defaultValue={currCapacity}
          placeholder={currCapacity.toString()}
          onKeyDown={handleNegativeValue}
          onChange={handleChangeCapacity}
        ></input>
      </td>
      <td>
        <input
          type="text"
          defaultValue={currType}
          placeholder={currType}
          onChange={handleChangeType}
        ></input>
      </td>
      <td className="edit-style">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => SaveAndClose(setUpdateId)}
        >
          Save & Close
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => Close(setUpdateId)}
        >
          Close
        </button>
      </td>
    </tr>
  );
}

export default EditAirplane;
