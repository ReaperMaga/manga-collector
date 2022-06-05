import React from "react";

type BasicInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const BasicInput = ({ ...HTMLAttributes }: BasicInputProps) => {
  const classes = [
    HTMLAttributes.className,
    "w-full px-2 py-2 text-gray-400 border-transparent rounded-md bg-zinc-700 focus:ring-0 outline-0",
  ];

  return <input {...HTMLAttributes} className={classes.join(" ")} />;
};

export default BasicInput;
