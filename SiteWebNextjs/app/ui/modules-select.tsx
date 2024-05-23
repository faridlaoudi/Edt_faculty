import React from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-selector";

type OPTIONS = {
  value: string;
  label: string;
};

interface Module {
  moduleName: string;
  priority: number;
}

interface MultipleSelectorModulesProps {
  options: OPTIONS[];
  className?: string;
  initialValues?: Module[];
  onValuesChange: (values: Module[]) => void;
}

const MultipleSelectorModules = ({
  options,
  onValuesChange,
  initialValues = [],
  className,
}: MultipleSelectorModulesProps) => {
  const [value, setValue] = React.useState<Module[]>(initialValues);

  const handleValuesChange = (newValues: string[]) => {
    const updatedModules = newValues.map((val, index) => ({
      moduleName: val,
      priority: index + 1, 
    }));

    setValue(updatedModules);
    onValuesChange(updatedModules);
  };

  return (
    <MultiSelector
      className={`bg-white rounded-md shadow-sm ${className}`}
      values={value.map((v) => v.moduleName)}
      onValuesChange={handleValuesChange}
      loop={false}
    >
      <MultiSelectorTrigger className="w-full h-[52px] p-0 m-0">
        <MultiSelectorInput className="h-full w-full border-none bg-transparent pl-3 placeholder-gray-400" />
      </MultiSelectorTrigger>
      <MultiSelectorContent className="bg-white border border-t-0 rounded-b-md max-h-60 overflow-y-auto">
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
