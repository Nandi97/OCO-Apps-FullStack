import React from 'react';
import Image from 'next/image';
import OCO_Logo from '../../public/assets/images/oco_ab_and_david.png';

export default function POEmailTemplate({ userName, poNumber, approvalUrl }: any) {
	return (
		<html>
			<head>
				<title>Purchase Order Email</title>
			</head>
			<body>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<table style={{ tableLayout: 'auto', maxWidth: '48rem' }}>
						<thead>
							<tr>
								<th
									style={{
										width: '100%',
										textAlign: 'center',
									}}
								>
									<img
										style={{ width: '356px', height: '205px' }}
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
									<div
										style={{
											display: 'grid',
											padding: '1rem',
											background: '#A65A2A',
											justifyItems: 'center',
											gap: '1rem',
										}}
									>
										<p
											style={{
												marginBottom: '1rem',
												marginTop: '1.75rem',
												fontSize: '1.25rem',
												lineHeight: '1.75rem',
												fontWeight: 700,
												color: '#ffffff',
												gridColumn: 'span 6 / span 6',
												textAlign: 'center',
											}}
										>
											Please approve {userName}&apos;s Purchase Order PO
											Number:
											{poNumber}
										</p>
										<div style={{ width: '100%', textAlign: 'center' }}>
											<a
												href={approvalUrl}
												style={{
													padding: '0.5rem',
													borderRadius: '0.25rem',
													fontWeight: 600,
													backgroundColor: '#ffffff',
													gridColumn: 'span 6 / span 6',
													textDecoration: 'none',
													color: '#A65A2A',
												}}
											>
												Approve Purchase Order
											</a>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<p style={{ color: '#3f638a' }}>Kind Regards</p>
								</td>
							</tr>
							<tr>
								<td>
									<p style={{ fontWeight: 600, color: '#A65A2A' }}>
										OCO Apps Admin
									</p>
								</td>
							</tr>
							<tr>
								<td>
									<p
										style={{
											fontSize: '0.75rem',
											lineHeight: '1rem',
											textAlign: 'justify',
											color: '#3f638a70',
										}}
									>
										This e-mail and any attachments may contain information that
										is confidential, legally privileged and protected by law and
										is intended for the sole use of the named recipient(s). Any
										liability (in negligence or otherwise) arising from any
										third party acting, or refraining from acting on any
										information contained in this email is hereby excluded. If
										you are not the intended recipient, please delete the
										contents and notify the sender immediately; do not disclose
										the contents to any other person, use it for any purpose or
										store or copy the information in any medium.
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</body>
		</html>
	);
}
