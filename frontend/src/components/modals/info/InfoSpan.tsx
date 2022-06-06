import React from "react";

interface InfoSpawnProps {
  label: string;
  value: string;
}

const InfoSpanLink = ({ label, value }: InfoSpawnProps) => {
  return (
    <span className="flex flex-col space-y-2">
      <span className="flex justify-center w-20 px-1 py-px text-gray-300 bg-green-700 text-md rounded-md">
        {label}
      </span>
      <a
        className="text-blue-600 underline"
        href={value}
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
    </span>
  );
};

const InfoSpan = ({ label, value }: InfoSpawnProps) => {
  return (
    <span className="flex flex-col space-y-2">
      <span className="flex justify-center w-20 px-1 py-px text-gray-300 bg-green-700 text-md rounded-md">
        {label}
      </span>
      <span>{value}</span>
    </span>
  );
};

export { InfoSpanLink, InfoSpan };
