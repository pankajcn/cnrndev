import LocalizedStrings from 'react-native-localization';

import { commonValue } from '../api';

export default Localized = new LocalizedStrings({
    [commonValue.EnglishCode]: {
        User:{ 
            name: "Name",
            surname: "Surname",
            submit: "SUBMIT",
        },
        Placeholders: {
            selectStartDate: "Select date for reminder listing",
            selectDate: "Select Date"
        },
        Alert: {
            Yes: "Yes",
            No: "No",
            YesSure: "Yes I'm sure",
            Active: "Active",
            InActive: "InActive",
            kAppName: "cnrndev",
            kAPIError: "Sorry, something wrong.",
            kDocumentDownload: "Started downloading the document. Please wait a few minutes.",
            kDocumentSaveMsg: "Document save Successfully.",
            NoRecord: "No Record Found"
        },
    },
    [commonValue.HindiCode]: {
    }
});