import React from "react";
import Header from "@/components/shared/Header";
import { transformationTypes } from "../../../../../../constants";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function AddTransformationTypePage({
  params,
}: {
  params: {
    type: "fill" | "restore" | "remove" | "removeBackground" | "recolor";
  };
}) {
  const { type } = params;

  const transformation = transformationTypes[type];

  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user?.creditBalance}
          data={null}
        />
      </section>
    </>
  );
}

export default AddTransformationTypePage;
