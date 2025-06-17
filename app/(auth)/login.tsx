import { useAuth } from "@/contexts/authContext";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();
  const { login: loginUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if (!res?.success) {
      Alert.alert("Error", res.msg);
      return;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            LogIn now to track all your expenses !
          </Typo>
          <Input
            placeholder="Enter your Email"
            onChangeText={(text) => (emailRef.current = text)}
            icon={
              <Icons.At size={verticalScale(26)} color={colors.neutral300} />
            }
            autoCapitalize="none"
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => (passwordRef.current = text)}
            icon={
              <Icons.Lock size={verticalScale(26)} color={colors.neutral300} />
            }
            autoCapitalize="none"
          />
          <Typo
            size={14}
            color={colors.textLight}
            style={styles.forgotPassword}
          >
            Forgot Password?
          </Typo>

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Button onPress={handleSubmit}>
              <Typo fontWeight={"800"} color={colors.neutral900}>
                Login
              </Typo>
            </Button>
          )}
        </View>
        <View style={styles.footer}>
          <Typo size={15}>Don't have an account?</Typo>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Sign Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcometext: {
    fontSize: verticalScale(30),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    color: colors.textLight,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
