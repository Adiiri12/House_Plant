import FormDateInput from '../components/Form/Forms/Components/FormDateInput';
import FormImageInput from '../components/Form/Forms/Components/FormImageInput';
import FormSelect from '../components/Form/Forms/Components/FormSelect';
import FormTextInput from '../components/Form/Forms/Components/FormTextInput';

const AddPlantFormKeys = [
    // {
    //     component: FormSelect,
    //     name: 'household',
    //     label: 'Household',
    //     titleRenderer: (item) => item.name,
    //     context: 'households',
    // },
    { component: FormTextInput, name: 'name', label: 'Name' },
    { component: FormTextInput, name: 'description', label: 'Description' },
    { component: FormDateInput, name: 'lastWatered', label: 'Last Watered' },
    { component: FormImageInput, name: 'image', label: 'Capture Image' },
];

export default AddPlantFormKeys;
