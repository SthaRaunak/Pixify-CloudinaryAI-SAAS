"use client";

// ---- Imports ----

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "../../../constants";

// UI

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/shared/CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//type
import { type IImage } from "@/lib/database/models/image.model";

// ---- Imports ----

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

type FormType = z.infer<typeof formSchema>;

interface TransformationFormProps {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
}

type AspectRatioKey = keyof typeof aspectRatioOptions;

function TransformationForm({
  data = null,
  action,
  type,
}: TransformationFormProps) {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const intialValues: FormType =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          publicId: data?.publicId,
          color: data?.color,
          prompt: data?.prompt,
        }
      : defaultValues;

  //Form Defination
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: intialValues,
  });

  // Submit Handler
  const onSubmit = (values: FormType) => {
    console.log(values);
  };

  // Handling select
  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {};

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        <Button type="submit">Submit</Button>
        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            className="w-full"
            formLabel="Aspect Ratio"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  onSelectFieldHandler(value, field.onChange);
                }}
              >
                <SelectTrigger className="select-fiedl">
                  <SelectValue placeholder="Select size" />{" "}
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem value={key} key={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) => {
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    );
                  }}
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) => {
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      );
                    }}
                  />
                )}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <Button type="button" className="submit-button capitalize">
            Transform
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransformationForm;
