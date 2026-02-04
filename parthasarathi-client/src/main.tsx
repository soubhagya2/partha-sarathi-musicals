import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.tsx";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const ClerkProviderWithRouter = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRouter>
        <App />
      </ClerkProviderWithRouter>
    </BrowserRouter>
  </StrictMode>,
);
