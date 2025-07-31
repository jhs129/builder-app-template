export const textAlignments = ["left", "center", "right"] as const;
export type TextAlignments = (typeof textAlignments)[number];

export interface Alignable {
    alignment?: TextAlignments;
}

export const alignableInputs = [
    {
      name: "alignment",
      type: "string",
      defaultValue: "center",
      enum: textAlignments,
      helperText: "Content alignment within the component",
    },
  ] as const;