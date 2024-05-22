import { Card, CardContent } from "@/components/ui/card";

type CardContent = {
  title: string;
  detials: string;
  value: string;
  color: string;
};

const CardC = (content: CardContent) => {
  return (
    <Card className={`rounded-[16px] ${content.color} w-full  sm:max-w-[360px] min-h-[162px] flex-shrink-0 relative text-wrap`}>
      <CardContent className="z-50 p-5 flex flex-col gap-2">
        <div className="text-[22px] font-semibold text-white">{content.title}</div>
        <div className="text-[34px] font-bold text-white " > {content.value}  {content.detials} </div>
       
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
        <div className="h-[167px] w-[167px] bg-white rounded-full absolute bottom-0 left-0 transform translate-y-[30%] translate-x-[-25%] opacity-20"></div>
        <div className="h-[157px] w-[157px] bg-white rounded-full absolute bottom-0 left-0 transform translate-y-[50%] translate-x-[-25%] opacity-30"></div>
      </div>
    </Card>
  );
};

export default CardC;
