"use client";

import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store,persistor } from "@/app/lib/store/store";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};