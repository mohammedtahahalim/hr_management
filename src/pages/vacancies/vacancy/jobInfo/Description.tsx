import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancy,
  selectVacancyDetails,
  selectVacancyError,
  selectVacancyStatus,
} from "../vacancySlice";
import { useForm, type UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import Reload from "../../../../shared/ui/Reload";
import type { AppDispatch } from "../../../../config/store";
import { useParams } from "react-router-dom";

interface DescriptionProps {
  onEditMode: boolean;
  register: UseFormRegister<{ id: string }>;
}

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
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
  const { t, i18n } = useTranslation("vacancy");
  const { id = "1" } = useParams();
  const status = useSelector(selectVacancyStatus);
  const error = useSelector(selectVacancyError);
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useForm();
  const details = useSelector(selectVacancyDetails);
  const lang = i18n.language as TLanguage;

  return (
    <WithSkeleton loading={status === "loading"}>
      {status === "success" && (
        <DescriptionWrapper>
          <Line>
            <Label htmlFor="jobTitle">{t("editMode.title")}</Label>
            <Input
              disabled={!onEditMode}
              defaultValue={details?.title[lang]}
              size="small"
              {...register("jobTitle")}
              id="jobTitle"
              variant="standard"
            />
          </Line>
          <Line>
            <Label htmlFor="jobStatus">{t("editMode.status")}</Label>
            <Status
              disabled={!onEditMode}
              size="small"
              defaultValue={"open"}
              {...register("jobStatus")}
              sx={{ flex: 2.5 }}
              variant="standard"
              id="jobStatus"
            >
              <MenuItem value="open">{t("editMode.open")}</MenuItem>
              <MenuItem value="inprogress">{t("editMode.inprogress")}</MenuItem>
              <MenuItem value="completed">{t("editMode.completed")}</MenuItem>
            </Status>
          </Line>
          <Line>
            <Label htmlFor="datesWindow">{t("editMode.window")}</Label>
            <Dates id="datesWindow">
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
            <Label htmlFor="salary">{t("editMode.salary")}</Label>
            <Input
              disabled={!onEditMode}
              defaultValue={details?.salary ?? 4_800_000}
              size="small"
              variant="standard"
              {...register("salary")}
              id="salary"
            />
          </Line>
          <Line>
            <Label htmlFor="skills">{t("editMode.skills")}</Label>
            <Input
              disabled={!onEditMode}
              defaultValue={details?.skills[lang].join(", ")}
              size="small"
              variant="standard"
              {...register("skills")}
              id="skills"
            />
          </Line>
          <Line>
            <Label htmlFor="description">{t("editMode.description")}</Label>
            <Input
              disabled={!onEditMode}
              defaultValue={details?.description[lang].join(", ")}
              size="small"
              variant="standard"
              id="description"
            />
          </Line>
          <Line>
            <Label htmlFor="notes">{t("editMode.notes")}</Label>
            <Input
              disabled={!onEditMode}
              defaultValue={details?.notes[lang].join(", ")}
              size="small"
              variant="standard"
              id="notes"
            />
          </Line>
        </DescriptionWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchVacancy({ id }))}
        />
      )}
    </WithSkeleton>
  );
}
