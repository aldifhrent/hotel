import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ViewSheet from "../components/view-sheet";

interface DashboardIdProps {
  params: {
    dashboardId: string;
  };
}

const DashboardId = ({ params }: DashboardIdProps) => {
  return (
    <>
      <Header />
      <div className="relative flex flex-col justify-center items-center min-h-screen">
        <div className="w-full mb-12 mt-12 m-auto lg:max-w-lg border">
          <Card className="w-full">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-center">
                Data Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ViewSheet id={params.dashboardId}  />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardId;
