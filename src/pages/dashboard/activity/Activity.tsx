import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { activityData, activityStatus, fetchActivities } from "./activitySlice";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";

const ActivityWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Title = styled(Box)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "5px",
});

const ActivitySlider = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "hidden",
  border: "1px solid black",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "360px",
  },
}));

export default function Activity() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(activityStatus);
  const data = useSelector(activityData);
  const enoughSlides = !!data.length;

  useEffect(() => {
    const activityRequest = dispatch(fetchActivities());
    return () => {
      activityRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      <ActivityWrapper>
        <Title>Activity :</Title>
        <ActivitySlider>
          {enoughSlides && (
            <Swiper
              slidesPerView={1}
              autoplay={true}
              loop={true}
              style={{ width: "99.99%", height: "99.99%" }}
              spaceBetween={0}
              speed={400}
              role="region"
              aria-label="Hero Slider"
              modules={[Pagination]}
              pagination={{ clickable: true, type: "bullets" }}
            >
              {data.map((d) => {
                return (
                  <SwiperSlide key={d.id}>
                    <Slide time={d.time} content={d.content} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </ActivitySlider>
      </ActivityWrapper>
    </WithSkeleton>
  );
}
