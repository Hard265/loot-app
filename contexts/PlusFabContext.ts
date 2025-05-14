import { createContext } from "react";

const PlusFabContext = createContext({
    show() {},
    shown: false,
});

export default PlusFabContext;
