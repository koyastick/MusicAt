import { getDistance } from 'geolib';
import moment from "moment";

const NEAR_DIST = 100;

export const isNear = (tarLat, tarLng, curLat, curLng) => {
  const dist = getDistance(
    { latitude: tarLat, longitude: tarLng },
    { latitude: curLat, longitude: curLng }
  );
  console.log("dist: " + dist);
  if (dist <= NEAR_DIST) return true;
  else return false;
}

export const isDateTime = (date, time) => {
  const now = new Date();
  const curDate = moment(now).format("YYYY-MM-DD");
  const curTime = moment(now).format("h:mm A");

  let isDate = false;
  let isTime = false;

  if (date == null || date == curDate) isDate = true;
  if (time == null || time == curTime) isTime = true;

  if (isDate == true && isTime == true) return true;
  else return false;
}
