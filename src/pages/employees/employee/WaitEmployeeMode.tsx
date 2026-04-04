import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  selectEmployeeError,
  selectEmployeeStatus,
} from "./employeeSlice";
import type { AppDispatch } from "../../../config/store";
import { useParams } from "react-router-dom";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Reload from "../../../shared/ui/Reload";

interface WaitEmployeeMode {
  children: React.ReactNode;
}

export default function WaitEmployeeMode({ children }: WaitEmployeeMode) {
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const dispatchThunk = () => {
    dispatch(fetchEmployee({ id: id ?? "1" }));
  };

  return (
    <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
      {status === "success" && children}
      {status === "failure" && (
        <Reload error={error} dispatchThunk={dispatchThunk} />
      )}
    </WithSkeleton>
  );
}
