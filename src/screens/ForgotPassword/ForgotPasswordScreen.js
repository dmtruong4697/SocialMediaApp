import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@rneui/themed";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [password, setPassWord] = useState("");
  // const [ConfirmPW, setConfirmPW] = useState("");
  const [errInf, setErrInf] = useState("");
  // const [uuid, setUuid] = useState("iphone");
  // const [hiddenPw, setHiddenPw] = useState(true);
  const navigation = useNavigation();

  //   const getCodeVerify = async () => {
  //     const response = await axios.post('https://it4788.catan.io.vn/get_verify_code', {
  //       email: email,
  //     });

  //     if (response.status === 200) {
  //         console.log('Verify Success', response.data);
  //     } else {
  //         console.log('Verify failed:', response.data);
  //         console.log('Response Status:', response.status);
  //     }
  // }

  // const handleSignUp = async () => {
  //   try {
  //     const response = await axios.post("https://it4788.catan.io.vn/signup", {
  //       email: email,
  //       password: password,
  //       uuid: uuid,
  //     });

  //     if (response.status === 201) {
  //       // Xử lý phản hồi thành công
  //       console.log("Sign up successful:", response.data);
  //       Alert.alert("Sign Up Successful", "Account created successfully!");
  //       // getCodeVerify();
  //       navigation.navigate("VerifyCode", { emailQuery: email });
  //     } else {
  //       // Xử lý phản hồi không thành công (mã lỗi 400)
  //       console.log("Sign up failed:", response.data);
  //       console.log("Response Status:", response.status);
  //     }
  //   } catch (error) {
  //     // Xử lý lỗi kết nối hoặc lỗi khác
  //     console.error("Sign up failed:", error);
  //     // Alert.alert('Sign Up Failed123', 'Unable to create account. Please try again.');
  //     //chi tiết lỗi
  //     if (error.response) {
  //       // Server trả về response với mã lỗi
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //     } else if (error.request) {
  //       // Yêu cầu đã được gửi nhưng không nhận được response
  //       console.error("Request data:", error.request);
  //     } else {
  //       // Các lỗi khác
  //       console.error("Lỗi không xác định:", error.message);
  //     }
  //   }
  // };

  // const checkEmail = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://it4788.catan.io.vn/check_email",
  //       {
  //         email: email,
  //       }
  //     );

  //     if (response.status === 200) {
  //       // Xử lý phản hồi thành công
  //       console.log("Check oke successful:", response.data);
  //       if (response.data.data.existed == 1) {
  //         setErrInf("Email đã tồn tại!");
  //       } else ComparePassword(password, ConfirmPW);
  //     } else {
  //       // Xử lý phản hồi không thành công (mã lỗi 400)
  //       console.log("Sign up failed:", response.data);
  //       console.log("Response Status:", response.status);
  //     }
  //   } catch (error) {
  //     // Xử lý lỗi kết nối hoặc lỗi khác
  //     console.error("Sign up failed:", error);
  //     // Alert.alert('Sign Up Failed123', 'Unable to create account. Please try again.');
  //     //chi tiết lỗi
  //     if (error.response) {
  //       // Server trả về response với mã lỗi
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //       if (
  //         error.response.data.code == 9996 ||
  //         error.response.data.code == 1003
  //       )
  //         setErrInf("Email đã tồn tại hoặc không đúng!");
  //     } else if (error.request) {
  //       // Yêu cầu đã được gửi nhưng không nhận được response
  //       console.error("Request data:", error.request);
  //     } else {
  //       // Các lỗi khác
  //       console.error("Lỗi không xác định:", error.message);
  //     }
  //   }
  // };

  // const ComparePassword = (pw, repw) => {
  //   if (pw === repw) {
  //     handleSignUp();
  //     setErrInf("");
  //   } else {
  //     setErrInf("Mật khẩu không trùng khớp!");
  //   }
  // };
  const checkEmail = async () => {
    try {
      // console.log(1);
      // setErrInf("looi");
      const response = await axios.post(
        "https://it4788.catan.io.vn/check_email",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        // Xử lý phản hồi thành công
        console.log("Check oke successful:", response.data);
        if (response.data.data.existed == 0) {
          setErrInf("Email chưa tồn tại");
        } else {
          await getCode();
        }
      } else {
        // Xử lý phản hồi không thành công (mã lỗi 400)
        console.log("Check Mail Failed:", response.data);
        console.log("Response Status:", response.status);
      }
    } catch (error) {
      // Xử lý lỗi kết nối hoặc lỗi khác
      console.error("Check email failed:", error);
      setErrInf("Lỗi vui lòng thử lại");
      // Alert.alert('Sign Up Failed123', 'Unable to create account. Please try again.');
      //chi tiết lỗi
      if (error.response) {
        // Server trả về response với mã lỗi
        console.error("Response data:", error.response.data.message);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        setErrInf(error.response.data.message);
      }
    }
  };
  const getCode = async () => {
    try {
      const response = await axios.post(
        "https://it4788.catan.io.vn/get_verify_code",
        {
          email: email,
        }
      );
      if (response.status == 200) {
        navigation.navigate("ForgotPasswordVerifyCode", { emailQuery: email });
      }
    } catch (err) {
      setErrInf("Lỗi xin vui lòng thử lại");
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Quên mật khẩu</Text>
        <View style={styles.infoSignUp}>
          <Text style={{ fontSize: 15 }}>
            Nhập email tài khoản cần lấy lại mật khẩu
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View>
          <Button
            buttonStyle={{ borderRadius: 30 }}
            title="Lấy lại mật khẩu"
            // onPress={() =>
            //     navigation.navigate({name: 'VerifyCode'})
            // }
            onPress={() => checkEmail()}
          />
        </View>
        <View>
          <Text style={styles.errinf}>{errInf}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: "100%",
  },
  input: {
    height: "30%",
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
    height: 60,
    fontSize: 24,
  },
});
