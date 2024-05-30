'use client'
import {useEffect, useState} from "react";
import {AuthContext,} from "./context";
import {auth} from "@/utils/firebaseConfig";
import {useRouter} from "next/navigation";

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
				setUser(user);
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
