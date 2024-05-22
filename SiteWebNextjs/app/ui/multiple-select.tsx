import React from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-selector-modules";

type OPTIONS = {
  value: string;
  label: string;
};

interface MultipleSelectorDataProps {
  options: OPTIONS[];
  className?: string;
  initialValues?: string[];
  onValuesChange: (values: string[]) => void;
}

const MultipleSelectorModules = ({
  options,
  onValuesChange,
  initialValues = [],
  className,
}: MultipleSelectorDataProps) => {
  const [value, setValue] = React.useState<string[]>(initialValues);


  return (
    <MultiSelector
      className={`bg-white rounded-md shadow-sm ${className}`}
      values={value}
      onValuesChange={(newValues) => {
        setValue(newValues);
        onValuesChange(newValues);
      }}
      loop={false}
    >
      <MultiSelectorTrigger className="w-full h-[52px] p-0 m-0">
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
