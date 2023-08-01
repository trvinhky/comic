import { useContext } from "react";
import { AppContext } from "./AppContext";

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext phải được sử dụng trong AppContextProvider");
    }
    return context;
};

export default useAppContext