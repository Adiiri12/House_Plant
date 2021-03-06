import FormDateInput from '../components/Form/Forms/Components/FormDateInput';
import FormImageInput from '../components/Form/Forms/Components/FormImageInput';
import FormSelect from '../components/Form/Forms/Components/FormSelect';
import FormTextInput from '../components/Form/Forms/Components/FormTextInput';

const AddPlantFormKeys = [
	{ component: FormTextInput, name: 'householdID', label: "Household", hidden: true },
	{ component: FormTextInput, name: 'name', label: 'Name' },
	{ component: FormTextInput, name: 'description', label: 'Description' },
	{ component: FormImageInput, name: 'imageURL', label: 'Capture Image' },
];

export default AddPlantFormKeys;
