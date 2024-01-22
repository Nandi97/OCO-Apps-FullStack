import * as React from 'react';
import { Tailwind, Font, Head } from '@react-email/components';
// import { format, add } from 'date-fns';

interface POApprovalProps {
	userName: string;
	poNumber?: string;
	approvalUrl: string;
}

export const POEmailTemplate: React.FC<Readonly<POApprovalProps>> = ({
	userName,
	poNumber,
	approvalUrl,
}) => {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							primary: {
								50: '#fbf7ef',
								100: '#f4e8d1',
								200: '#e8ce9f',
								300: '#dcb26d',
								400: '#d3994c',
								500: '#ca7d36',
								600: '#a65a2a',
								700: '#944729',
								800: '#7a3a26',
								900: '#653022',
								950: '#39180f',
							},
							secondary: {
								50: '#f5f7fa',
								100: '#e9eef5',
								200: '#cfdbe8',
								300: '#a5bdd4',
								400: '#7499bc',
								500: '#527ca5',
								600: '#3f638a',
								700: '#385678',
								800: '#2e455e',
								900: '#2b3c4f',
								950: '#1c2735',
							},
						},
					},
				},
			}}
		>
			<html>
				<Head>
					<title>Purchase Order Email</title>
					<Font
						fontFamily="Roboto"
						fallbackFontFamily="Verdana"
						webFont={{
							url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
							format: 'woff2',
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
				</Head>
				<section>
					<div className="flex justify-center items-center w-full">
						<table className="table-auto max-w-md">
							<thead>
								<tr>
									<th className="w-full text-center">
										<img
											className="w-[356px] h-[205px]"
											src="cid:logo"
											alt="oco abda logo"
											onContextMenu={(e) => e.preventDefault()}
										/>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="grid p-4 bg-[#A65A2A] items-center gap-4">
											<p className="mb-4 mt-7 text-lg font-bold text-white col-span-6 text-center">
												Please approve {userName}&apos;s Purchase Order PO
												Number:
												{poNumber}
											</p>
											<div className="w-full text-center">
												<a
													href={approvalUrl}
													className="p-0.5 rounded-md font-semibold text-[#A65A2A] bg-white col-span-6"
												>
													Approve Purchase Order
												</a>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<p className="text-[#3f638a]">Kind Regards</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="text-[#A65A2A] font-semibold">
											OCO Apps Admin
										</p>
									</td>
								</tr>
								<tr>
									<td>
										<p className="text-justify text-[#3f638a70] text-xs">
											This e-mail and any attachments may contain information
											that is confidential, legally privileged and protected
											by law and is intended for the sole use of the named
											recipient(s). Any liability (in negligence or otherwise)
											arising from any third party acting, or refraining from
											acting on any information contained in this email is
											hereby excluded. If you are not the intended recipient,
											please delete the contents and notify the sender
											immediately; do not disclose the contents to any other
											person, use it for any purpose or store or copy the
											information in any medium.
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</html>
		</Tailwind>
	);
};
