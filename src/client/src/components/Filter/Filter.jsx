import React, { useMemo } from "react";

import { Dropdown, Label } from "monday-ui-react-core";

import { STATUS } from "../../hooks/useFilterByQuery";

import { useDispatch } from "react-redux";
import { updateQueryStatus } from "../../redux/actions/itemsEntitiesActions";

function Filter() {
  const dispatch = useDispatch();

  const labelRenderer = ({ label, color }) => {
    return <Label text={label} color={color} isAnimationDisabled />;
  };
  const options = useMemo(
    () => [
      {
        value: STATUS.COMPLETED,
        label: "Completed",
        color: Label.colors.POSITIVE,
      },
      {
        value: STATUS.IN_PROGRESS,
        label: "In progress",
      },
      {
        value: STATUS.ALL,
        label: "All",
      },
    ],
    []
  );

  return (
    <div className="filter-div">
      <Dropdown
        id={"filter-id"}
        placeholder="Tasks Filter"
        options={options}
        className="dropdown-stories-style-spacing "
        optionRenderer={labelRenderer}
        valueRenderer={labelRenderer}
        onChange={(option) => {
          option?.value && dispatch(updateQueryStatus(option.value));
        }}
        searchable={false}
        size={Dropdown.size.SMALL}
        defaultValue={[options[options.length - 1]]}
        clearable={false}
      />
    </div>
  );
}
export default Filter;
