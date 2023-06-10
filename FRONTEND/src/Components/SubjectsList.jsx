import React from "react";
import SubjectsCard from "./SubjectsCard";

function SubjectsList(SubjectsData) {
  return (
    <div className="subjects_list">
      {/* {SubjectsData.map((subject) => {
        return (
          <SubjectsCard
            key={subject.id}
            image={subject.image}
            name={subject.name}
            mark={subject.current_price}
          />
        );
      })} */}
    </div>
  );
}

export default SubjectsList;
