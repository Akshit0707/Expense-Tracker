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

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    console.log("Registration Response:", res);
    if (!res.success) {
      Alert.alert("Error ,Registration failed");
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
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Sign-Up now to track all your expenses !
          </Typo>
          <Input
            placeholder="Enter your Full Name"
            onChangeText={(text) => (nameRef.current = text)}
            icon={
              <Icons.User size={verticalScale(26)} color={colors.neutral300} />
            }
          />
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

          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Button onPress={handleSubmit}>
              <Typo fontWeight={"800"} color={colors.neutral900}>
                Signup
              </Typo>
            </Button>
          )}
        </View>
        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Log In
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
