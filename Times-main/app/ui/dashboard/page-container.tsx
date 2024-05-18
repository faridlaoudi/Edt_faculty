import React from "react";

interface MyProps {
  children?: React.ReactNode;
}

const PageContainer = ({ children }: MyProps) => {
  return (
    <div className=" flex justify-center flex-col text-[#001D74] px-5 md:px-10 lg:px-20">
      {children}
    </div>
  );
};

export default PageContainer;
