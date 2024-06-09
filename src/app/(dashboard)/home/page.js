'use client'
import { useState, useContext, useEffect } from 'react';
import { addCompany, modifyCompany } from "@/utils/FirebaseHelper";
import Swal from 'sweetalert2';
import { db } from '@/utils/firebaseConfig';
import { AuthContext } from "@/utils/context";
import { collection, query, startAfter, limit, getDocs, getCountFromServer } from "firebase/firestore";
import dynamic from 'next/dynamic';

const AddCarModal = dynamic(() => import('@/components/AddCarModal'), { ssr: false });
const RenewLicenseModal = dynamic(() => import('@/components/RenewLicenseModal'), { ssr: false });
const AuthorizedSignatureModal = dynamic(() => import('@/components/AuthorizedSignatureModal'), { ssr: false });
const ChangeActivityModal = dynamic(() => import('@/components/ChangeActivityModal'), { ssr: false });
const ChangeOwnerModal = dynamic(() => import('@/components/ChangeOwnerModal'), { ssr: false });
const ChangeCarModal = dynamic(() => import('@/components/ChangeCarModal'), { ssr: false });
const CompleteInformationModal = dynamic(() => import('@/components/CompleteInformationModal'), { ssr: false });


const Page = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedCar, setSelectedCar] = useState(null);
	const [companies, setCompanies] = useState([]);
	const [lastVisible, setLastVisible] = useState(null);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [totalDocs, setTotalDocs] = useState(0);
	const [action, setAction] = useState('')

	const { user } = useContext(AuthContext);
	const [isRenewLicenseModalOpen, setRenewLicenseModalOpen] = useState(false);
	const [isAuthorizedSignatureModalOpen, setAuthorizedSignatureModalOpen] = useState(false);
	const [isChangeActivityModalOpen, setChangeActivityModalOpen] = useState(false);
	const [isChangeOwnerModalOpen, setChangeOwnerModalOpen] = useState(false);
	const [isChangeCarModalOpen, setChangeCarModalOpen] = useState(false);
	const [isCompleteInformationModalOpen, setCompleteInformationModalOpen] = useState(false);
	const [openDropdownId, setOpenDropdownId] = useState(null);

	useEffect(() => {
		const fetchTotalDocs = async () => {
			const coll = collection(db, "companies");
			const snapshot = await getCountFromServer(coll);
			setTotalDocs(snapshot.data().count);
		};

		fetchTotalDocs();
		fetchCompanies(1);
	}, []);

	const fetchCompanies = async (page) => {
		setLoading(true);
		try {
			let companyQuery;
			if (page === 1) {
				companyQuery = query(collection(db, "companies"), limit(25));
			} else {
				companyQuery = query(collection(db, "companies"), startAfter(lastVisible), limit(25));
			}

			const documentSnapshots = await getDocs(companyQuery);
			const lastVisibleDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
			setLastVisible(lastVisibleDoc);

			const companyList = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setCompanies( companyList );
			setHasMore(documentSnapshots.docs.length === 25);
		} catch (error) {
			console.error("Error fetching companies: ", error);
		}
		setLoading(false);
	};

	const handlePageChange = async (page) => {
		setCurrentPage(page);
		await fetchCompanies(page);
	};

	const totalPages = Math.ceil(totalDocs / 25);
	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);
	const pages = [];

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	const handleModifyCompany = async (newData) => {
		modifyCompany(selectedCar.id, newData).then(async () => {
			await Swal.fire({
				title: 'Successfully changed',
				icon: 'success',
				confirmButtonText: 'OK'
			});
		}).catch(async e => {
			await Swal.fire({
				title: 'Failed',
				icon: 'error',
				confirmButtonText: 'OK'
			});
			console.log(e);
		});
	};

	const handleAddCompany = (newCompany) => {

		addCompany(newCompany).then(async () => {
			await Swal.fire({
				title: 'Successfully added',
				icon: 'success',
				confirmButtonText: 'OK'
			});
		}).catch(async e => {
			await Swal.fire({
				title: 'Failed',
				icon: 'error',
				confirmButtonText: 'OK'
			});
			console.log(e);
		});
		setModalOpen(false);
	};

	const handleEditAction = (car, action) => {
		setSelectedCar(car);
		const missingFields = ['companyOwner', 'plate', 'activity', 'VIN', 'carMake', 'carModel', 'carYear'].filter(field => !car[field]);
		if (missingFields.length > 0) {
			setAction(action);
			setCompleteInformationModalOpen(true);
		} else {
			switch (action) {
				case 'renewLicense':
					setRenewLicenseModalOpen(true);
					break;
				case 'authorizedSignature':
					setAuthorizedSignatureModalOpen(true);
					break;
				case 'changeActivity':
					setChangeActivityModalOpen(true);
					break;
				case 'changeOwner':
					setChangeOwnerModalOpen(true);
					break;
				case 'changeCar':
					setChangeCarModalOpen(true);
					break;
				default:
					break;
			}
		}
		setOpenDropdownId(null); // Close the dropdown after an action is selected
	};

	const toggleDropdown = (id) => {
		setOpenDropdownId(openDropdownId === id ? null : id);
	};

	const handleCompleteInformationSubmit = async (updatedData) => {
		await handleModifyCompany(updatedData);
		setCompleteInformationModalOpen(false);
		const modifiedCompanies = companies.map(company => {
			return {
				_id: company?._id,
				renewal: company?.renewal || '',
				signature: company?.signature || '',
					...updatedData
			}
		})
		setCompanies(modifiedCompanies)
		handleEditAction({id: selectedCar.id, ...updatedData}, action)
	};


	return (
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col grow ">
					<div className="flex justify-between pb-4 bg-white dark:bg-gray-900">
						<div>
							<label htmlFor="table-search" className="sr-only">Search</label>
							<div className="relative mt-1">
								<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
									<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
									</svg>
								</div>
								<input
									type="text"
									id="table-search"
									className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Search for items"
								/>
							</div>
						</div>
						{user.admin && <button
							onClick={() => setModalOpen(true)}
							className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Add
						</button>}
					</div>
					<div className={'grow'}>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 grow">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">الرقم المركزي للترخيص</th>
							<th scope="col" className="px-6 py-3">صاحب الرخصة</th>
							<th scope="col" className="px-6 py-3">رقم اللوحة</th>
							<th scope="col" className="px-6 py-3">النشاط</th>
							<th scope="col" className="px-6 py-3">رقم القاعدة</th>
							<th scope="col" className="px-6 py-3">صنع المركبة</th>
							<th scope="col" className="px-6 py-3">موديل المركبة</th>
							<th scope="col" className="px-6 py-3">سنة الصنع</th>
							<th scope="col" className="px-6 py-3">Action</th>
						</tr>
						</thead>
						<tbody>
						{!loading && companies.map((company) => (
							<tr key={company.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<td className="px-6 py-4">{company._id}</td>
								<td className="px-6 py-4">{company.companyOwner}</td>
								<td className="px-6 py-4">{company.plate}</td>
								<td className="px-6 py-4">{company.activity}</td>
								<td className="px-6 py-4">{company.VIN}</td>
								<td className="px-6 py-4">{company.carMake}</td>
								<td className="px-6 py-4">{company.carModel}</td>
								<td className="px-6 py-4">{company.carYear}</td>
								<td className="px-6 py-4 relative">
									<div className="relative inline-block text-left">
										<button
											className="inline-flex justify-center w-full dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
											onClick={() => toggleDropdown(company.id)}
										>
											Edit
										</button>
										{openDropdownId === company.id && (
											<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
												<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
													<button
														className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
														role="menuitem"
														onClick={() => handleEditAction(company, 'renewLicense')}
													>
														تجديد الترخيص التجاري
													</button>
													<button
														className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
														role="menuitem"
														onClick={() => handleEditAction(company, 'authorizedSignature')}
													>
														تجديد اعتماد التوقيع
													</button>
													<button
														className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
														role="menuitem"
														onClick={() => handleEditAction(company, 'changeActivity')}
													>
														تغيير نشاط
													</button>
													<button
														className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
														role="menuitem"
														onClick={() => handleEditAction(company, 'changeOwner')}
													>
														تغيير صاحب الرخصة
													</button>
													<button
														className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
														role="menuitem"
														onClick={() => handleEditAction(company, 'changeCar')}
													>
														استبدال مركبة
													</button>
												</div>
											</div>
										)}
									</div>
								</td>
							</tr>
						))}
						</tbody>
					</table>
					</div>
					<ul className="inline-flex -space-x-px text-sm mt-12">
						<li>
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Previous
							</button>
						</li>
						{pages.map((page) => (
							<li key={page}>
								<button
									onClick={() => handlePageChange(page)}
									className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === page ? 'text-blue-600 border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
								>
									{page}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={!hasMore}
								className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Next
							</button>
						</li>
					</ul>
					{isModalOpen && <AddCarModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddCompany} />}
					{isRenewLicenseModalOpen && <RenewLicenseModal isOpen={isRenewLicenseModalOpen} onClose={() => setRenewLicenseModalOpen(false)} onSubmit={async (renewalNumber) => {
				const key = new Date().getTime();
				const renewal = selectedCar?.renewal || {};
				renewal[key] = renewalNumber;
				await handleModifyCompany({ renewal });
				setRenewLicenseModalOpen(false);
			}} companyId={selectedCar?._id} />}
					{isAuthorizedSignatureModalOpen && <AuthorizedSignatureModal isOpen={isAuthorizedSignatureModalOpen} onClose={() => setAuthorizedSignatureModalOpen(false)} onSubmit={async (authorized) => {
				if (authorized === "yes") {
					await handleModifyCompany({ authorized: user.displayName });
				}
				setAuthorizedSignatureModalOpen(false);
			}} companyId={selectedCar?._id} />}
					{isChangeActivityModalOpen && <ChangeActivityModal isOpen={isChangeActivityModalOpen} onClose={() => setChangeActivityModalOpen(false)} onSubmit={async (newActivity) => {
				await handleModifyCompany({ activity: newActivity });
				setChangeActivityModalOpen(false);
			}} companyId={selectedCar?._id} />}
					{isChangeOwnerModalOpen && <ChangeOwnerModal isOpen={isChangeOwnerModalOpen} onClose={() => setChangeOwnerModalOpen(false)} onSubmit={async (newOwner) => {
				await handleModifyCompany({ companyOwner: newOwner });
				setChangeOwnerModalOpen(false);
			}} companyId={selectedCar?._id} />}
					{isChangeCarModalOpen &&  <ChangeCarModal isOpen={isChangeCarModalOpen} onClose={() => setChangeCarModalOpen(false)} onSubmit={async (newCarDetails) => {
				await handleModifyCompany(newCarDetails);
				setChangeCarModalOpen(false);
			}} company={selectedCar} />}
					{isCompleteInformationModalOpen && <CompleteInformationModal isOpen={isCompleteInformationModalOpen} onClose={() => setCompleteInformationModalOpen(false)} onSubmit={handleCompleteInformationSubmit} company={selectedCar} />}
		</div>
	);
};

export default Page;
