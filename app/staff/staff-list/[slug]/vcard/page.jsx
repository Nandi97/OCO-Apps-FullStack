import VCardTemplate from './components/vCardTemplate';

export default async function VCard() {
	const initials = () =>
		staff?.name
			.split(' ')
			.slice(0, 2)
			.map((n) => n[0])
			.join('')
			.toUpperCase();

	const downloadTxtFile = (vcfText) => {
		const element = document.createElement('a');
		const file = new Blob([vcfText], { type: 'text/plain;charset=utf-8' });
		element.href = URL.createObjectURL(file);
		element.download = `${initials.value}.vcf`;
		document.body.appendChild(element);
		element.click();
	};

	const CreateVCard = () => {
		var vCardsJS = require('vcards-js');

		//create a new vCard
		var vCard = vCardsJS();

		// set properties
		vCard.isOrganization = true;
		const names = staff?.name.split(' ');
		// console.log("Names:", names);
		if (names.length > 2) {
			vCard.firstName = staff?.name.split(' ').slice(0, 1);
			vCard.middleName = staff?.name.split(' ').slice(1, 2);
			vCard.lastName = staff?.name.split(' ').slice(2, 3);
		} else {
			vCard.firstName = staff?.name.split(' ').slice(0, 1);
			vCard.lastName = staff?.name.split(' ').slice(1, 2);
		}
		vCard.organization = 'Oraro & Company Advocates';
		vCard.workAddress.label = 'Work Address';
		vCard.title = staff?.designation?.name;
		vCard.photo.attachFromUrl(staff?.avatar_url);
		vCard.workPhone = `+254 709 250 ${staff?.ext}`;
		vCard.cellPhone = staff?.mobile;
		vCard.workEmail = staff?.email;
		vCard.workUrl = 'https://www.oraro.co.ke';
		vCard.workAddress.street = 'ACK Garden Annex, 6th Floor, 1st Ngong Avenue';
		vCard.workAddress.postalCode = 'P.O. Box 51236 - 00200';
		vCard.workAddress.city = 'Nairobi';
		vCard.workAddress.countryRegion = 'Kenya';

		return vCard.getFormattedString();
	};

	return <VCardTemplate />;
}
