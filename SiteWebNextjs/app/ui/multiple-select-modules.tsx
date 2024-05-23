import React, { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-selector-modules";

type OPTION = {
  value: string;
  label: string;
};

interface MultipleSelectorModulesProps {
  options: OPTION[];
  className?: string;
  initialValues?: { nom_module: string; priority: number }[];
  onValuesChange: (values: { nom_module: string; priority: number }[]) => void;
}

type module = {
  nom_module: string;
  priority: number;
};

const MultipleSelectorModules = ({
  options,
  onValuesChange,
  initialValues = [],
  className,
}: MultipleSelectorModulesProps) => {
  const initial: module[] = initialValues.map((value, index) => ({
    nom_module: value.nom_module,
    priority: value.priority,
  }));

  console.log(initial);

  const [value, setValue] =
    useState<{ nom_module: string; priority: number }[]>(initial);

  const handleChange = (newValues: string[]) => {
    const newModules = newValues.map((val, index) => ({
      nom_module: val,
      priority: index + 1,
    }));
    setValue(newModules);
    onValuesChange(newModules);
  };

  return (
    <MultiSelector
      className={`bg-white rounded-md shadow-sm `}
      values={value.map((v) => v.nom_module)}
      onValuesChange={handleChange}
      loop={false}
    >
      <MultiSelectorTrigger className={`w-full h-[52px] p-0 m-0 ${className}`}>
        <MultiSelectorInput className="h-full w-full border-none bg-transparent pl-3 placeholder-gray-400" />
      </MultiSelectorTrigger>
      <MultiSelectorContent className="bg-white border border-t-0 rounded-b-md">
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem
              key={i}
              value={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default MultipleSelectorModules;
