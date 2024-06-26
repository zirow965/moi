import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'
import {getAuth} from "firebase-admin/auth";
import {adminApp} from "@/utils/firebaseAdminConfig";

export async function GET() {
	try {
		const authHeader = headers().get('authorization')
		if (authHeader !== '364c9f6a-2e40-429f-bd1c-fba2e39b17a6') {
			return NextResponse.json({error: 'Not authorized'}, {status: 500})
		}

		const res = await getAuth(adminApp).listUsers(1000)
		return NextResponse.json(res.users)

	} catch (error) {

		return NextResponse.json({error}, {status: 500})

	}
}
export async function POST(req) {
	try {
		const authHeader = headers().get('authorization')
		if (authHeader !== '364c9f6a-2e40-429f-bd1c-fba2e39b17a6') {
			return NextResponse.json({error: 'Not authorized'}, {status: 500})
		}
		const { email, displayName, isAdmin, password } = await req.json();

		const auth = getAuth(adminApp);
		const userRecord = await auth.createUser({
			email,
			emailVerified: true,
			displayName,
			password,
			disabled: false,
		});

		if (isAdmin) {
			await auth.setCustomUserClaims(userRecord.uid, { admin: true });
		} else {
			await auth.setCustomUserClaims(userRecord.uid, { admin: false });
		}

		return NextResponse.json(userRecord);

	} catch (error) {
		return NextResponse.json({error}, {status: 500})
	}
}

export async function PUT(req) {
	try {
		const authHeader = headers().get('authorization')
		if (authHeader !== '364c9f6a-2e40-429f-bd1c-fba2e39b17a6') {
			return NextResponse.json({error: 'Not authorized'}, {status: 500})
		}

		const auth = getAuth(adminApp);
		const { uid, email, displayName, disabled, isAdmin } = await req.json();

		if (isAdmin) {
			await auth.setCustomUserClaims(uid, { admin: true });
		} else {
			await auth.setCustomUserClaims(uid, { admin: false });
		}

		const userRecord = await auth.updateUser(uid, {
			displayName,
			disabled,
		});

		return NextResponse.json(userRecord);

	} catch (error) {
		console.log(error)
		return NextResponse.json({error}, {status: 500})
	}
}
