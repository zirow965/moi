import {ActivitiesContext, AuthContext} from "./context";
import {useContext} from "react";

export const useAuth = () => {
	return useContext(AuthContext);
};


export const useActivities = () => {
	return useContext(ActivitiesContext);
}
