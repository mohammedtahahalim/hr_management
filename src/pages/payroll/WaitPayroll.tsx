import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayrolls,
  selectPayrollError,
  selectPayrollStatus,
} from "./payrollSlice";
import type { AppDispatch } from "../../config/store";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import Reload from "../../shared/ui/Reload";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

interface WaitPayrollProp {
  children: React.ReactNode | React.ReactNode[];
}

export default function WaitPayroll({ children }: WaitPayrollProp) {
  const status = useSelector(selectPayrollStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectPayrollError);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, _] = useSearchParams();

  const dispatchThunk = () => {
    const page = Number(searchParams.get("page") ?? DEFAULT_PAGE);
    const pageSize = Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE);
    dispatch(fetchPayrolls({ page, pageSize }));
  };

  return (
    <WithSkeleton loading={isLoading}>
      {status === "success" && children}
      {status === "failure" && (
        <Reload error={error} dispatchThunk={dispatchThunk} />
      )}
    </WithSkeleton>
  );
}
