import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ReactNode } from "react";

interface CardProps {
  data: string;
  title: string;
  icon: React.ReactElement;
}
const CardDashboard = ({ data, title, icon }: CardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-x-4 justify-center text-center">
        <CardTitle className="text-xl font-bold ">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-center">
          {data ? data.length : 0}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
