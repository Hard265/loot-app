import InfoFile from "@/partials/InfoFile";
import InfoFolder from "@/partials/InfoFolder";
import { RootStackT } from "@/Router";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function Info() {
    const route = useRoute<RouteProp<RootStackT, "Info">>();
    return route.params.type === "file" ? (
        <InfoFile id={route.params.id} />
    ) : (
        <InfoFolder id={route.params.id} />
    );
}
