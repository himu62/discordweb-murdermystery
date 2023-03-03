import { StoreContextProvider } from "@/src/store";
import Container from "@/src/components/Container";
import { FC, ReactNode } from "react";

const App: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
  return (
    <StoreContextProvider>
      <Container>{children}</Container>
    </StoreContextProvider>
  );
};
export default App;
