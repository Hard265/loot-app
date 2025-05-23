echo "Running post-install script for react-native-reanimated-skeleton to support expo"

find ./node_modules/react-native-reanimated-skeleton -type f -exec sed -i '' -e 's/import LinearGradient/import { LinearGradient}/g' -e 's/react-native-linear-gradient/expo-linear-gradient/g' {} +