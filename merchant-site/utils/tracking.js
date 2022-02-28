import { sendEventApi } from "../api/event.js";
import { TRACK_CONTEXT_TYPES, TRACK_EVENT_TYPES } from "./constants.js";

export const trackEvent = (context, type, extra = {}) => {
  sendEventApi({
    context: TRACK_CONTEXT_TYPES[context],
    type: TRACK_EVENT_TYPES[type],
    ...extra,
  });
};
