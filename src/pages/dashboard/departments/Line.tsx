import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { DeptColor } from "../../../shared/lib/types";
import { departmentColor } from "../../../shared/lib/constants";
import type { DepartmentData, DeptName } from "./departmentSlice";

const LineWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "deptColor",
})<{ deptColor: DeptColor }>(({ theme, deptColor }) => ({
  width: "100%",
  height: "55px",
  borderRadius: "10px",
  margin: "5px 0px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "5px",
  backgroundColor: theme.palette[deptColor].main,
  padding: "0px 10px",
  color: theme.palette[deptColor].contrastText,
}));

const Title = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "system-ui",
  color: "inherit",
});

const Applications = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "5px",
  alignItems: "center",
  overflow: "hidden",
});

const ProfileSnippet = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
  overflow: "hidden",
});

const Profile = styled(Box)({
  height: "35px",
  aspectRatio: "1",
  borderRadius: "50%",
  zIndex: 4,
  backgroundColor: "#d8d8d8",
  "&:first-of-type": {
    translate: "150% 0%",
    zIndex: 1,
  },
  "&:nth-of-type(2)": {
    translate: "100% 0%",
    zIndex: 2,
  },
  "&:nth-of-type(3)": {
    translate: "50% 0%",
    zIndex: 3,
  },
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const New = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  padding: "1px 3px",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  minWidth: "50px",
  backgroundColor: theme.palette.fourth.main,
  color: "whitesmoke",
}));

export default function Line(props: DepartmentData) {
  const { t } = useTranslation("dashboard");
  const { data, departmentName, newApps } = props;

  return (
    <LineWrapper deptColor={departmentColor(departmentName as DeptName)}>
      <Title variant="body1">
        {t(`departments.departmentsName.${departmentName}`)}
      </Title>
      <Applications>
        <ProfileSnippet>
          {data.map((p, idx) => {
            return (
              <Profile key={`${p}.${idx}`}>
                <Image src={p} />
              </Profile>
            );
          })}
        </ProfileSnippet>
        {!!newApps && (
          <New>
            {newApps}+ {t("departments.new")}
          </New>
        )}
      </Applications>
    </LineWrapper>
  );
}
