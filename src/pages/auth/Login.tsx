import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Theme from "../../features/themes/Theme";
import Language from "../../features/languages/Language";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import Line from "../../shared/ui/Line";
import { useEffect, useState, type FormEvent } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import { addToast } from "../../features/toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import {
  selectLoginError,
  selectLoginStatus,
  sendLoginRequest,
} from "../../features/auth/loginSlice";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `linear-gradient(${theme.palette.second.main}, ${alpha(theme.palette.second.main, 0.95)})`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "10px",
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "525px",
  minHeight: "550px",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "25px",
  padding: "10px",
}));

const LoginForm = styled("form")({
  width: "100%",
  height: "100%",
  maxWidth: "450px",
  padding: "20px 10px",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "system-ui",
  alignSelf: "center",
});

const Subtitle = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  alignSelf: "center",
});

const Suggestions = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  alignSelf: "center",
});

const ThemeWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "10px",
  width: "75px",
});

const LanguageWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "75px",
});

const Label = styled(FormLabel)({
  fontSize: "1rem",
  fontFamily: "system-ui",
  color: "inherit",
});

const FieldInput = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  position: "relative",
});

const Input = styled(TextField)({
  width: "100%",
  fontFamily: "system-ui",
  color: "inherit",
  fontSize: "0.9rem",
});

const ErrorMessage = styled(Typography)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
});

const PasswordOption = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  position: "absolute",
  ...(isArabic ? { left: "0px" } : { right: "0px" }),
  zIndex: 999,
  cursor: "pointer",
}));

const Options = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Forgot = styled(Link)({
  textDecoration: "none",
  fontFamily: "system-ui",
  color: "inherit",
});

const SignIn = styled(Button)(({ theme }) => ({
  width: "90%",
  borderRadius: "50px",
  alignSelf: "center",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  backgroundColor: theme.palette.second.main,
  color: theme.palette.second.contrastText,
}));

const Divider = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SocialLogin = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "25px",
});

const SocialButton = styled(Button)(({ theme }) => ({
  flex: 1,
  borderRadius: "50px",
  alignSelf: "center",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  backgroundColor: theme.palette.first.main,
  color: theme.palette.first.contrastText,
}));

const SignUp = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: "7px",
});

const SignUpLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontFamily: "system-ui",
  color: theme.palette.primary.main,
  fontStyle: "italic",
}));

export default function Login() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>();
  const { t, i18n } = useTranslation("login");

  useEffect(() => {
    if (!error) return;
    dispatch(addToast({ type: "error", message: error }));
  }, [error, dispatch]);

  if (status === "success") return <Navigate to={"/"} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(sendLoginRequest(getValues()));
  };

  return (
    <LoginWrapper>
      <ThemeWrapper>
        <Theme />
      </ThemeWrapper>
      <LanguageWrapper>
        <Language isFree={true} />
      </LanguageWrapper>
      <FormWrapper>
        <LoginForm onSubmit={handleSubmit} id="loginForm" autoComplete="on">
          <Title variant="h4">{t("signIn")}</Title>
          <Subtitle variant="subtitle2">{t("subSignIn")}</Subtitle>
          <Suggestions>{t("change")}</Suggestions>
          <FieldInput>
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              placeholder={t("emailPlaceholder")}
              size="small"
              id="email"
              error={!!errors.email}
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(?!.*[_.-][_.-])(?![_.-].*)[a-zA-Z0-9_.-]+(?<![_.-])@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
                  message: "emailError",
                },
              })}
              autoComplete="email"
              defaultValue={"test@hr.com"}
            />
            {errors.email && (
              <ErrorMessage color="error" role="alert" aria-live="assertive">
                {t("emailError")}
              </ErrorMessage>
            )}
          </FieldInput>
          <FieldInput>
            <Label htmlFor="password">{t("password")}</Label>
            <Box sx={{ width: "100%", position: "relative" }}>
              <Input
                placeholder={t("passwordPlaceholder")}
                size="small"
                id="password"
                error={!!errors.password}
                type={hidePassword ? "password" : "text"}
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_=+[\]{}\\|;:'",.<>?-])[a-zA-Z0-9!@#$%^&*()_=+[\]{}\\|;:'.",<>?-]{4,30}$/,
                    message: "passwordError",
                  },
                })}
                autoComplete="current-password"
                defaultValue={"Test@Test.001"}
              />
              <PasswordOption
                isArabic={i18n.language === "ar"}
                onClick={() => setHidePassword((hidePassword) => !hidePassword)}
                aria-label={
                  hidePassword ? t("hidePassword") : t("showPassword")
                }
              >
                {hidePassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </PasswordOption>
            </Box>
            {errors.password && (
              <ErrorMessage color="error" role="alert" aria-live="assertive">
                {t("passwordError")}
              </ErrorMessage>
            )}
          </FieldInput>
          <Options>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  {...register("rememberMe")}
                  id="rememberMe"
                />
              }
              label={<Label htmlFor="rememberMe">{t("rememberMe")}</Label>}
            />
            <Forgot to={"/forgotPassword"}>{t("forgotPassword")}</Forgot>
          </Options>
          <SignIn
            variant="contained"
            size="large"
            type="submit"
            disabled={status === "loading"}
          >
            {t("signIn")}
          </SignIn>
          <Divider>
            <Line dir="h" w={"45%"} h={""} />
            <Typography variant="body2" fontFamily={"system-ui"}>
              {t("or")}
            </Typography>
            <Line dir="h" w={"45%"} h={""} />
          </Divider>
          <SocialLogin>
            <SocialButton variant="contained" size="large">
              {t("google")}
            </SocialButton>
            <SocialButton variant="contained" size="large">
              {t("facebook")}
            </SocialButton>
          </SocialLogin>
          <SignUp>
            <Subtitle variant="subtitle1">{t("haveAccount")}</Subtitle>
            <SignUpLink to={"/signup"}>{t("signUp")}</SignUpLink>
          </SignUp>
        </LoginForm>
      </FormWrapper>
    </LoginWrapper>
  );
}
