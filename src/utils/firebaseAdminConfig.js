import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
	credential: cert(
		{
			type: "service_account",
			project_id: "moi1-1c323",
			private_key_id: "b71bcc8ee6a55b126c91615684b1b70c4a64ce19",
			private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUrbMNaHKT3qgO\ncdZYjMTEZG6k/iGo88uxhwZcu+bPYbxF+5RX6MKf1jxiVWz4faolAGCUCU8bafJa\ngPCIbUDsA//b4tit/qB2asd4VG+HjJWexiDXUr9sr2rcWsDcIGPPq8H25X976CC+\nTYpfGy5vs+L2d2jX5A+x5qV3CQbOL0bM4P7jPfcYyh2ZO0PIpJGuV46VfwFDWrVS\na9z4Bl4U4xOBjis7s9WgSl8uCXdMB3rGjA1KQnrsb3pi+LjEynjAJ7soA5mtYHbU\nT7oD0Gy58TCWxoXfnrPJBvCE1kroAWJhJCLr6fEJgoZtpuGMS/SpIjdU0BhkNwKg\nNLA1iDeBAgMBAAECggEAB6bwSE03wiZCubJS2gDGm6JZcMpL/7411/9ZtUB1f4Su\nt33jyn3vcrzMk2UrdI1g78/hqbHkDMJ1G9iDzwTPTy6dqBWzYh9FOr2Ay82N7byb\nLYlHaTfq90ggeikxwznPHYu6gN2lBppFg1Na5S0fMJmyUtfdB9eG0QnRbkT+37A2\n9TB6fT7FybacctdLwBBndXyHt7fjU2lcSEAaNKuSo7PY/wv/RwYr+bZIsltEKGaP\nqVtjqA7xgCLoNFaeU7P+0sYe0e1ry3odSU7IbMayN4aC2uGFM4RVUDOt4Cj1spY5\nvzWrZ/D7NRTvBjX9YBB9s8fRPcxJPtVWqEUp8tdduQKBgQD2QjORi4e0qCnX8EtN\nTmGrMXkiFtXxq6lBKjMOd5LD3lNM/y6Ee31e14InUReymcM2g6ITa/CODR0Eyo+z\n34xuCybUAL+WFktNtBXGhNE+Kvf2pLXfGUt8yJiKdYJu1lBZ2xUMLAml1A4mr5lT\nZ5WAcjJq5qeODZTrA2ta+Zc4awKBgQDdF3DhwYkzZ64mq1qC0KnfjSevIK8+kcGO\nCcgQpLyiU2Mv8FowFdKw/RVBkIR+mTfiIEaU9iO5S2kBE6cMBqVXDez4hNLq9OTf\nzDA1jWxKwwGnOsOPbckHLJ5gbo7vcXSiULUg/zyq9Sr4sm9PYtPK0j00QwAKU1AS\nOgKh4bA6wwKBgQD0SiYICyebQnsH+RtqXAgtoI1vEMI51LW5rFgr0NiqL4HpTvfh\nevOawyUdRafBiCGMkbaVl61x7XZNC3jU0j3n6G4jP37PL9yR/8TeQ2GjT1LevPSi\nleA5sHEKYZn7w+S/zsKpaYJEnAFRxT7P62D2o9J6E8hB9h01qhW0kQa/cwKBgG6P\nm1Z51ueK8I7L385NFLYDO5YbLSeH8hfakl6oUuCF/LLrad5j+2GgnfGUmH1Kl6SP\n6Vvynri5mj/8mOutox8eiqNYoLT4VEAKNw2AtGfKjtgWzda62u2ohWbJwtbAkMfe\nvkVK/gar5ZpKeNllHW5upkatPqbrNL54nfpgByXLAoGBAPAIImN/0l4HuWaIKfqu\nFa9zERHVPNcI0OmOmjPZLtDDaqdlImh/hCzfwJIYDVfDchjcHhLLvkOq8iGoWN6M\nJiwGyGUJUIR3KQpvXsflkg2+wxRooihBDJGZ1HvNjbsmO2OSuvhhylcHt9Bgwjv4\nwxSEWAWGpTHPSkWxbGLJiiDA\n-----END PRIVATE KEY-----\n",
			client_email: "firebase-adminsdk-5gtik@moi1-1c323.iam.gserviceaccount.com",
			client_id: "106048199687197508572",
			auth_uri: "https://accounts.google.com/o/oauth2/auth",
			token_uri: "https://oauth2.googleapis.com/token",
			auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
			client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5gtik%40moi1-1c323.iam.gserviceaccount.com",
			universe_domain: "googleapis.com"
		}
	)
}


	export const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
