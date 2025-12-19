import { http } from "./http";

export const doctorAvailabilityApi = {
  generate: (payload) => http.post("/api/doctor/availability/generate", payload),
};
