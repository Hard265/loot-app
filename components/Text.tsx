import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { Text as RNText } from "react-native";

const variants = {
    largeTitle: "text-4xl leading-[48px] font-[RoobertBold]",
    title1: "text-2xl",
    title2: "text-[22px] leading-7",
    title3: "text-xl",
    heading: "text-[17px] text-text leading-6 font-semibold",
    body: "text-[16px] font-[MontrealRegular] leading-6",
    label: "text-lg font-[MontrealMedium]",
    callout: "text-base",
    subhead: "text-[15px] leading-6",
    footnote: "text-[13px] leading-5 font-[MontrealRegular]",
    caption1: "text-xs",
    caption2: "text-[11px] leading-4",
} as const;

const colors = {
    primary: "text-primary",
    secondary: "text-text",
    tertiary: "text-foreground-primary",
    error: "text-error",
} as const;

const defaults: Required<TextProps> = {
    variant: "body",
    color: "secondary",
};

interface TextProps {
    variant?: keyof typeof variants;
    color?: keyof typeof colors;
}

const Text: FC<PropsWithChildren<TextProps>> = ({
    children,
    variant = defaults.variant,
    color = defaults.color,
}) => {
    return (
        <RNText className={clsx(variants[variant], colors[color])}>
            {children}
        </RNText>
    );
};

Text.displayName = "LootText";

export default Text;
