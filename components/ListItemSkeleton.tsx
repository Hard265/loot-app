import Skeleton from "react-native-reanimated-skeleton";

export default function ListItemSkeleton({
    isLoading,
}: {
    isLoading: boolean;
}) {
    return (
        <Skeleton
            isLoading={isLoading}
            containerStyle={{
                flexDirection: "row",
                padding: 16,
                gap: 16,
            }}
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
