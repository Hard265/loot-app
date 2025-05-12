import React, { createContext, PropsWithChildren } from "react";

const FieldsetContext = createContext({
	disabled: false,
});

interface FieldsetProps {
	disabled?: boolean;
}

function Fieldset(props: PropsWithChildren<FieldsetProps>) {
	return (
		<FieldsetContext.Provider value={{ disabled: !!props.disabled }}>
			{props.children}
		</FieldsetContext.Provider>
	);
}

export { Fieldset, FieldsetContext };
