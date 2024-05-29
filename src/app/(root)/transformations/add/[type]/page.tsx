import React from "react";
import Header from "@/components/shared/Header";
import { transformationTypes } from "../../../../../../constants";

function AddTransformationTypePage({
  params,
}: {
  params: {
    type: "fill" | "restore" | "remove" | "removeBackground" | "recolor";
  };
}) {
  const { type } = params;

  const transformation = transformationTypes[type];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
    </>
  );
}

export default AddTransformationTypePage;
