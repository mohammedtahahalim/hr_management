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
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import Line from "../../shared/ui/Line";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import { addToast } from "../../features/toast/toastSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import z from "zod";
import { flushSync } from "react-dom";
import { checkAuth } from "../../features/auth/authSlice";

type TSubmitState = "idle" | "submitting" | "error" | "success";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const responseSchema = z.object({
  isAuthenticated: z.boolean(),
  isBanned: z.boolean(),
  whoIs: z
    .object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      role: z.enum(["admin", "manager", "hr", "employee", "candidat"]),
      email: z.string(),
    })
    .or(z.null()),
});

type ResponseData = z.infer<typeof responseSchema>;

const LoginWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `linear-gradient(${theme.palette.secondary.main}, ${alpha(theme.palette.secondary.main, 0.8)})`,
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

const ThemeWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "10px",
});

const LanguageWrapper = styled(Box)({
  position: "absolute",
  top: "10px",
  right: "10px",
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
  fontFamily: "system-ui",
  color: "inherit",
  fontSize: "0.9rem",
});

const ErrorMessage = styled(Typography)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
});

const PasswordOption = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isArabic" && prop !== "hasError",
})<{ isArabic: boolean; hasError: boolean }>(({ isArabic, hasError }) => ({
  position: "absolute",
  bottom: "0px",
  ...(isArabic ? { left: "0px" } : { right: "0px" }),
  zIndex: 999,
  transform: hasError ? "translateY(-80%)" : "translateY(-5%)",
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

const SignIn = styled(Button)({
  width: "90%",
  borderRadius: "50px",
  alignSelf: "center",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  color: "whitesmoke",
});

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

const SocialButton = styled(Button)({
  flex: 1,
  borderRadius: "50px",
  alignSelf: "center",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  color: "whitesmoke",
});

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
  const [submitState, handleSubmitState] = useState<TSubmitState>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation("login");
  const controller = useRef<AbortController | null>(null);

  if (submitState === "success") return <Navigate to={"/dashboard"} replace />;

  const submitLogin: SubmitHandler<ILoginForm> = async (data) => {
    try {
      if (!controller.current) controller.current = new AbortController();
      flushSync(() => handleSubmitState("submitting"));

      const fullURL: string = `${import.meta.env.VITE_API_URL}/api/login`;
      const fullOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify(data),
        signal: controller.current?.signal,
      };
      const response = await fetch(fullURL, fullOptions);
      if (!response.ok) throw new Error(response.status.toString());
      const responseData = (await response.json()) as ResponseData;
      if (!responseSchema.safeParse(responseData).success) {
        throw new Error("400");
      }
      const { isAuthenticated, isBanned, whoIs } = responseData;
      if (!isAuthenticated) throw new Error("401");
      if (isBanned) throw new Error("403");
      if (!whoIs) throw new Error("400");
      dispatch(checkAuth());
      handleSubmitState("success");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "403" || err.message === "400") {
          dispatch(addToast({ type: "warning", message: err.message }));
          return;
        }
        if (err.message === "522" || err.message === "500") {
          dispatch(addToast({ type: "info", message: err.message }));
          return;
        }
        dispatch(addToast({ type: "error", message: err.message }));
      }
      handleSubmitState("error");
    }
    return () => {
      controller.current?.abort();
    };
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
        <LoginForm
          onSubmit={handleSubmit(submitLogin)}
          id="loginForm"
          autoComplete="on"
        >
          <Title variant="h4">{t("signIn")}</Title>
          <Subtitle variant="subtitle2">{t("subSignIn")}</Subtitle>
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
              defaultValue={"test@test.com"}
            />
            {errors.email && (
              <ErrorMessage color="error" role="alert" aria-live="assertive">
                {t("emailError")}
              </ErrorMessage>
            )}
          </FieldInput>
          <FieldInput>
            <Label htmlFor="password">{t("password")}</Label>
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
            {errors.password && (
              <ErrorMessage color="error" role="alert" aria-live="assertive">
                {t("passwordError")}
              </ErrorMessage>
            )}
            {/* TODO: Fix the eye position */}
            <PasswordOption
              isArabic={i18n.language === "ar"}
              hasError={Boolean(errors.email || errors.password)}
              onClick={() => setHidePassword((hidePassword) => !hidePassword)}
              aria-label={hidePassword ? t("hidePassword") : t("showPassword")}
            >
              {hidePassword ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </PasswordOption>
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
            disabled={submitState === "submitting"}
            color="secondary"
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
            <SocialButton variant="contained" color="primary" size="large">
              {t("google")}
            </SocialButton>
            <SocialButton variant="contained" color="primary" size="large">
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
