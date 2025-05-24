import { useTheme } from "@react-navigation/native";
import Skeleton from "react-native-reanimated-skeleton";
import colors from "tailwindcss/colors";

export default function ListItemSkeleton({
    isLoading,
}: {
    isLoading: boolean;
}) {
    const theme = useTheme();
    return (
        <Skeleton
            isLoading={isLoading}
            containerStyle={{
                flexDirection: "row",
                padding: 16,
                gap: 16,
            }}
            highlightColor={
                theme.dark ? colors.neutral[700] : colors.neutral[300]
            }
            boneColor={theme.dark ? colors.neutral[900] : colors.neutral[200]}
            layout={[
                {
                    width: 32,
                    height: 32,
                    borderRadius: 24,
                },
                {
                    flex: 1,
                    flexDirection: "column",
                    borderRadius: 24,
                    gap: 6,
                    children: [
                        {
                            width: "65%",
                            height: 24,
                        },
                        {
                            width: "20%",
                            height: 16,
                        },
                    ],
                },
            ]}
        />
    );
}
