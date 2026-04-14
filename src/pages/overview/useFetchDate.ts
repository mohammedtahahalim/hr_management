import { useSearchParams } from "react-router-dom";

export default function useFetchWeek() {
  const [searchParams, _] = useSearchParams();
  const date = searchParams.get("date") || new Date().toISOString();
  return date;
}
