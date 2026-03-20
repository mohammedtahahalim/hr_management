import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectVacancyStatus } from "../vacancySlice";
import { useForm, type UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface DescriptionProps {
  onEditMode: boolean;
  register: UseFormRegister<{ id: string }>;
}

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "scroll",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "18px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
  },
}));

const Line = styled(Box)(({ theme }) => ({
  width: "90%",
  flex: 1,
  minHeight: "55px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Label = styled(InputLabel)({
  flex: 1,
  fontFamily: "system-ui",
  fontWeight: "bold",
  textTransform: "capitalize",
});

const Input = styled(TextField)(({ theme }) => ({
  flex: 2.5,
  fontFamily: "system-ui",
  [theme.breakpoints.down("sm")]: {
    flex: 2,
  },
}));

const Status = styled(Select)(({ theme }) => ({
  flex: 2.5,
  fontFamily: "system-ui",
  [theme.breakpoints.down("sm")]: {
    flex: 2,
  },
}));

const Dates = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  flex: 2.5,
  fontFamily: "system-ui",
  [theme.breakpoints.down("sm")]: {
    flex: 2,
  },
}));

export default function Description({ onEditMode }: DescriptionProps) {
  const { t } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);
  const { register } = useForm();

  return (
    <WithSkeleton loading={status === "loading"}>
      <DescriptionWrapper>
        <Line>
          <Label htmlFor="jobTitle">{t("editMode.title")}</Label>
          <Input
            disabled={!onEditMode}
            defaultValue={"Senior Software Developer"}
            size="small"
            {...register("jobTitle")}
            id="jobTitle"
            variant="standard"
          />
        </Line>
        <Line>
          <Label>{t("editMode.status")}</Label>
          <Status
            disabled={!onEditMode}
            size="small"
            defaultValue={"open"}
            {...register("jobStatus")}
            sx={{ flex: 2.5 }}
            variant="standard"
          >
            <MenuItem value="open">{t("editMode.open")}</MenuItem>
            <MenuItem value="inprogress">{t("editMode.inprogress")}</MenuItem>
            <MenuItem value="completed">{t("editMode.completed")}</MenuItem>
          </Status>
        </Line>
        <Line>
          <Label>{t("editMode.window")}</Label>
          <Dates>
            <TextField
              type="date"
              sx={{ flex: 1 }}
              size="small"
              {...register("openDate")}
              disabled={!onEditMode}
              variant="standard"
            />
            <TextField
              type="date"
              sx={{ flex: 1 }}
              size="small"
              {...register("closeDate")}
              disabled={!onEditMode}
              variant="standard"
            />
          </Dates>
        </Line>
        <Line>
          <Label>{t("editMode.salary")}</Label>
          <Input
            disabled={!onEditMode}
            defaultValue={"Ensure to check the salary provided"}
            size="small"
            variant="standard"
            {...register("salary")}
          />
        </Line>
        <Line>
          <Label>{t("editMode.skills")}</Label>
          <Input
            disabled={!onEditMode}
            defaultValue={"React, Redux, Node.js"}
            size="small"
            variant="standard"
            {...register("skills")}
          />
        </Line>
        <Line>
          <Label>{t("editMode.description")}</Label>
          <Input
            disabled={!onEditMode}
            defaultValue={"lorem Ipsum dolores ..."}
            size="small"
            variant="standard"
          />
        </Line>
        <Line>
          <Label>{t("editMode.notes")}</Label>
          <Input
            disabled={!onEditMode}
            defaultValue={"Ensure to check the salary provided"}
            size="small"
            variant="standard"
          />
        </Line>
      </DescriptionWrapper>
    </WithSkeleton>
  );
}
