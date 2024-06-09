'use client'
import {useEffect, useState} from "react";
import {AuthContext, ActivitiesContext} from "./context";
import {auth, db} from "@/utils/firebaseConfig";
import {useRouter} from "next/navigation";
import {doc, onSnapshot} from "firebase/firestore";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const router = useRouter();

	// listen for token changes
	// call setUser and write new token as a cookie
	useEffect(() => {
		return auth.onIdTokenChanged(async (user) => {
			if (!user) {
				await router.push('/');
				setUser('Logged out');
				// nookies.set(undefined, 'token', '', { path: '/' });
			} else {
				const token = await user.getIdToken();
				const idTokenResult = await user.getIdTokenResult()

				setUser({admin: !!idTokenResult.claims?.admin, ...user});
				// nookies.set(undefined, 'token', token, { path: '/' });
			}
		});
	}, []);

	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			const user = auth.currentUser;
			if (user) await user.getIdToken(true);
		}, 10 * 60 * 1000);

		// clean up setInterval
		return () => clearInterval(handle);
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{user && children || <div/>}</AuthContext.Provider>
	);
}

export const ActivitiesProvider = ({ children }) => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, 'options', 'activities'), (doc) => {
			if (doc.exists()) {
				setActivities(doc.data().activities);
			}
		});


		// Cleanup function to unsubscribe from the listener when the component unmounts
		return () => unsubscribe();
	}, []);

	return (
		<ActivitiesContext.Provider value={{ activities }}>
			{children}
		</ActivitiesContext.Provider>
	);
};
