"use client";

import { toast } from "sonner";
import { useFetch } from "../actions/use-fetch";
import { useRouter } from "next/navigation";
import TableDashboard from "./components/table-dashboard";
import { useDelete } from "../actions";
import Header from "@/components/header";

const DashboardPage = () => {
  const route = useRouter();
  const { data: user } = useFetch();
  const { mutate: deleteBeasiswa } = useDelete();
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
        <Header/>
        <h1 className="mt-4 text-center text-2xl font-bold">
          Dashboard Customer
        </h1>
        <TableDashboard user={user} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default DashboardPage;
