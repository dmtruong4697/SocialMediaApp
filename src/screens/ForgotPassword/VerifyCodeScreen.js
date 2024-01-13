import React from "react";
import { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@rneui/themed";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
const ForgotPasswordVerifyCode = ({ route }) => {
  const { emailQuery } = route.params || {};
  const [errInf, setErrInf] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassWord] = useState("");
  const [ConfirmPW, setConfirmPW] = useState("");
  const [hiddenPw, setHiddenPw] = useState(true);
  const navigation = useNavigation();

  const HandleCode = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/check_verify_code",
        {
          email: emailQuery,
          code_verify: code,
        }
      );

      if (response.status === 200) {
        console.log("Verify Success", response.data);
        Alert.alert("Verify Success", "U can reset password!");
        console.log(emailQuery, code);
        navigation.navigate({ name: "ForgotPasswordScreen2" });
      } else {
        console.log("Verify failed:", response.data);
        console.log("Response Status:", response.status);
        Alert.alert(
          "Verify Failed",
          "Invalid input. Please check your data and try again."
        );
      }
    } catch (error) {
      // Xử lý lỗi kết nối hoặc lỗi khác
      console.error("Verify failed:", error);
      Alert.alert("Verify Failed", "Please try again.");
      //chi tiết lỗi
      if (error.response) {
        // Server trả về response với mã lỗi
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Yêu cầu đã được gửi nhưng không nhận được response
        console.error("Request data:", error.request);
      } else {
        // Các lỗi khác
        console.error("Lỗi không xác định:", error.message);
      }
    }
  };
  const ComparePassword = () => {
    if (password == ConfirmPW) {
      //   console.log("1");
      setErrInf("");
      axios
        .post("https://it4788.catan.io.vn/reset_password", {
          email: emailQuery,
          code: code,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            Alert.alert("Đặt lại mật khẩu thành công");
            navigation.navigate("Login");
          } else {
            setErrInf(res.data.response.message);
          }
        })
        .catch((error) => {
          setErrInf("Lỗi. Xin vui lòng thử lại");
          if (error.response) {
            console.log(error.response.data);
            setErrInf(error.response.data.message);
          }
        });
    } else {
      setErrInf("Mật khẩu xác nhận không đúng");
    }
  };
  return (
    <ScrollView>
      {/* <Text>VerifyCode</Text> */}
      <Text style={{ fontSize: 15 }}>Nhập mật khẩu của bạn?</Text>
      <View style={styles.componentPass}>
        <TextInput
          style={{ height: "100%", flex: 1 }}
          onChangeText={setPassWord}
          value={password}
          placeholder="PassWord"
          secureTextEntry={hiddenPw}
        />
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => {
            setHiddenPw(!hiddenPw);
          }}
        >
          <FontAwesomeIcon icon={hiddenPw ? faEye : faEyeSlash} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 15 }}>Xác nhận mật khẩu?</Text>
      <View style={styles.componentPass}>
        <TextInput
          style={{ height: "100%", flex: 1 }}
          onChangeText={setConfirmPW}
          value={ConfirmPW}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={hiddenPw}
        />
        <TouchableOpacity
          style={{ padding: 8 }}
          onPress={() => {
            setHiddenPw(!hiddenPw);
          }}
        >
          <FontAwesomeIcon icon={hiddenPw ? faEye : faEyeSlash} />
        </TouchableOpacity>
      </View>
      <Text> VerifyCode</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter code"
      />
      <View>
        <Button
          buttonStyle={{ borderRadius: 30 }}
          title="Lấy lại mật khẩu"
          onPress={ComparePassword}
        />
      </View>
      <Text style={styles.errinf}>{errInf}</Text>
    </ScrollView>
  );
};

export default ForgotPasswordVerifyCode;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 12,
    padding: 10,
  },
  componentPass: {
    height: "15%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 12,
  },
  errinf: {
    alignSelf: "center",
    color: "red",
    // paddingTop: 50,
    // marginTop: 20,
    // height: 60,
    fontSize: 18,
  },
});
