import React, { PropsWithChildren } from "react";
import PlusFabLayout from "./PlusFabLayout";
import ScaffoldLayout from "./ScaffoldLayout";

export function SignedInLayout({ children }: PropsWithChildren) {
    return (
        <ScaffoldLayout>
            <PlusFabLayout>{children}</PlusFabLayout>
        </ScaffoldLayout>
    );
}
