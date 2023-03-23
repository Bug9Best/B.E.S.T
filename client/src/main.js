import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import PrimeVue, PrimeIcons and PrimeFlex
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-blue/theme.css';
// import 'primevue/resources/themes/vela-blue/theme.css';
// import 'primevue/resources/themes/mira/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './public/main.css'

// Import PrimeVue components
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import InputTextarea from 'primevue/textarea';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';

import Chip from 'primevue/chip';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';

import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';

import TabMenu from 'primevue/tabmenu';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ScrollPanel from 'primevue/scrollpanel';

import Steps from 'primevue/steps';

import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {ripple: true});
app.use(ToastService);
app.use(ConfirmationService);
app.mount('#app')

// Register PrimeVue components
app.component('Calendar', Calendar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('InputTextarea', InputTextarea);
app.component('Password', Password);
app.component('Dropdown', Dropdown);
app.component('RadioButton', RadioButton);
app.component('Chip', Chip);
app.component('Card', Card);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Toast', Toast);
app.component('ProgressBar', ProgressBar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Sidebar', Sidebar);
app.component('Menu', Menu);
app.component('TabMenu', TabMenu);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('ScrollPanel', ScrollPanel);
app.component('Steps', Steps);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);