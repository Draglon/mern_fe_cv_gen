"use client";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalInfo from "@/store/personalInfo/operations/fetchPersonalInfo";
import { personalInfoIdSelector } from "@/store/auth/selectors";
import { personalInfoSelector } from "@/store/personalInfo/selectors";

import Sidebar from "@/views/Resume/Sidebar";
import Content from "@/views/Resume/Content";

const Resume = () => {
  const dispatch = useAppDispatch();
  const personalInfoId = useAppSelector(personalInfoIdSelector);
  const personalInfoData = useAppSelector(personalInfoSelector);

  useEffect(() => {
    if (personalInfoId) {
      dispatch(fetchPersonalInfo({ id: personalInfoId }));
    }
  }, [dispatch, personalInfoId]);

  return (
    <div className="template">
      <Sidebar personalInfo={personalInfoData} />
      <Content personalInfo={personalInfoData} />
    </div>
  );
};

export default Resume;
