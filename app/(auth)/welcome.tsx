import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Button from "../../components/Button";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginButton}>
            <Typo fontWeight={"500"}>Sign-In</Typo>
          </TouchableOpacity>

          <Animated.Image
            entering={FadeIn.duration(2000)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={30} fontWeight={"800"}>
              Always take control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              of your Finances
            </Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().delay(200).damping(12)} style={{ alignItems: "center", gap: 2 }}>
            <Typo size={17} color={colors.textLight}>
              Finances must be arrangesd for a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </Animated.View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => router.push("/(auth)/register")}>
              <Typo fontWeight={"600"} color={colors.neutral900}>
                Get Started
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingX._30,
  },

  welcomeImage: {
    width: "100%",
    height: verticalScale(400),
    alignSelf: "center",

    marginTop: verticalScale(-40),
  },
  loginButton: {
    alignSelf: "flex-end",
    zIndex: 10,
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(35),
    gap: spacingY._17,
    shadowColor: "white",
    elevation: 20,
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
