import React, { ChangeEvent } from "react";

type CheckListProps = {
  title:string;
  checklist:string[];
  selectedList:string[];
  setSelectedList:(val:string[])=>void;
};

const CheckList = (props:CheckListProps) => {
  const { title, checklist, selectedList, setSelectedList } = props;
  const handleCheck = (event:ChangeEvent<HTMLInputElement>) => {
    var updatedList = [...selectedList];
    if (event.target.checked) {
      updatedList = [...selectedList, event.target.value];
    } else {
      updatedList.splice(selectedList.indexOf(event.target.value), 1);
    }
    setSelectedList(updatedList);
  };
  return (
    <div className="checkList">
      <h4 className="List-title">{title}</h4>
      <div className="List-container">
        {checklist.map((item, index) => (
          <div key={index} className="List-item">
            <input value={item} type="checkbox" onChange={handleCheck} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckList;
