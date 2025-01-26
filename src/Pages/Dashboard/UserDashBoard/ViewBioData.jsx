import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import {
  Briefcase,
  Calendar,
  Crown,
  Heart,
  MapPin,
  Ruler,
  Target,
  User,
  Weight,
} from "lucide-react";
import { Link } from "react-router-dom";
import ViewBioDataDetails from "./ViewBioDataDetails";

const ViewBioData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: viewBioData = [] } = useQuery({
    queryKey: [user?.email, "viewBioData"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/view-bioData?ContactEmail=${user?.email}`
      );
 
      return res.data;
    },
  });

  const statusChange = async()=>{

  }

  return (
    <div>
      {viewBioData.map((item) => (
        <ViewBioDataDetails  key={item._id} item={item}></ViewBioDataDetails>
      ))}
    </div>
  );
};

export default ViewBioData;
