"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface QueryProviderProps {
  children: React.ReactNode;
}
const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(`Something went wrong": ${error.message}`);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
