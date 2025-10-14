import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../services/tours";

export const useTourDetails = (id) =>
  useQuery({
    queryKey: ["tours", id],
    queryFn: () => getTourById(id),
  });
