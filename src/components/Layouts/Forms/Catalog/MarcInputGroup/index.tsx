import React from "react";

interface MarcField {
  tag: string;
  subfield: string;
  description: string;
  value: string;
  required?: boolean;
  fieldId?: string;
}

interface MarcInputGroupProps {
  fields: MarcField[];
  onChange: (key: string, value: string) => void;
}

const MarcInputGroup: React.FC<MarcInputGroupProps> = () => {
  return (
    <>
      {}
    </>
  );
};

export default MarcInputGroup;
