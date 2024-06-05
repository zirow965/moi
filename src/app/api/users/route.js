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
		return NextResponse.json( res )

	} catch (error) {

		return NextResponse.json({error}, {status: 500})

	}
}
