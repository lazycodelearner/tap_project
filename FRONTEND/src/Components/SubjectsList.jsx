import React from "react";
import SubjectsCard from "./SubjectsCard";
import VariantsExample from "./VariantsExample";

const SubjectsList = ({ subjectsData, getData }) => {
  return (
    <div className="SubjectsListDiv">
      {subjectsData.length >= 1 ? (
        subjectsData.map((subject, index) => {
          return (
            <SubjectsCard
              id={subject.subjectId}
              subjectNameParameter={subject.subjectName}
              mark={subject.mark}
              studentId={subject.studentId}
              getData={getData}
            />
          );
        })
      ) : (
        <>
          <VariantsExample></VariantsExample>
          <h1>No data found</h1>
        </>
      )}
    </div>
  );
};

export default SubjectsList;
