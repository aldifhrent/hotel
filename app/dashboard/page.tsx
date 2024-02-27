"use client";

import { toast } from "sonner";
import { useFetch } from "../actions/use-fetch";
import { useRouter } from "next/navigation";
import TableDashboard from "./components/table-dashboard";
import { useDelete, useTotalUser } from "../actions";
import Header from "@/components/header";
import CardDashboard from "./components/card-dashboard";

const DashboardPage = () => {
  const route = useRouter();
  const { data: user } = useFetch(); // Get Data User
  const { data: userTotal } = useTotalUser(); // Get Total User
  const { mutate: deleteBeasiswa } = useDelete(); // Delete User
  // Function for delete data
  const handleDelete = async (id: string) => {
    try {
      deleteBeasiswa(id);
      toast.success("Successfully deleted");
      route.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <>
      <div className="max-w-screen mx-auto items-center justify-center">
        <Header />
        <h1 className="mt-6 text-center text-2xl font-bold">
          Dashboard Customer
        </h1>
        
        <div className="ml-4 mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardDashboard data={userTotal} title={"Data User"} />
        </div>
        <TableDashboard user={user} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default DashboardPage;
