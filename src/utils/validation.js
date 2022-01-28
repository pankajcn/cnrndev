export const maxLengthPassword = 15
export const minLengthPassword = 8
export const minLengthName = 1
export const maxLengthName = 45
export const minLengthMobile = 7
export const maxLengthMobile = 15
export const maxLengthEmail = 55
export const minLengthCarNumber = 16

export function ValidateForm(form) {
    let isValidForm = true;

    var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
    var urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    var strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var noSpecialChar = /^[a-zA-Z0-9- ]*$/;

    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //email
    var numberRegex = /^\d+$/; // number
    for (let val in form.validators) {
        form.validators[val].error = '';
        for (let i in form.validators[val]) {
            let message = '';

            if (form.validators[val].error != '') break;
            let value = form.validators[val].keyName ? form.validators[val].keyName : (val.charAt(0).toUpperCase() + val.slice(1))
                .split('_')
                .join(' ');

            let valData = form.validators[val][i];
            if (i == 'required' && (!form[val] || !form[val].toString().trim())) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                message = `Please enter ${value}`
            } else if (
                i == 'noSpecial' &&
                noSpecialChar.test(form[val]) == false
            ) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                message = 'Special character is not allowed in ' + value;
            } else if (
                (i == 'minLength' || i == 'minLengthDigit') &&
                form[val].length < valData
            ) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                var cStr =
                    i == 'minLengthDigit' ? ' ' + 'digits' : ' ' + 'characters';
                message = value + ' ' + 'must be at least' + ' ' + valData + cStr;
            } else if (
                (i == 'maxLength' || i == 'maxLengthDigit') &&
                form[val].length > valData
            ) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                var cStr =
                    i == 'maxLengthDigit' ? ' ' + 'digits' : ' ' + 'characters';
                message =
                    value + ' ' + 'should be smaller than' + ' ' + valData + cStr;
            } else if (i == 'matchWith' && form[val] != form[valData]) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                let value2 = (valData.charAt(0).toUpperCase() + valData.slice(1))
                    .split('_')
                    .join(' ');
                message = 'Passwords does not match';
            } else if (i == 'email' && reg.test(form[val]) == false) {
                message = 'Please enter valid email address';
            } else if (i == 'numeric' && numberRegex.test(form[val]) == false) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                message = value + ' ' + 'should be a number only';
            } else if (i == 'emoji' && emojiRegexp.test(form[val]) == true) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1))
                //     .split('_')
                //     .join(' ');
                message = 'emoji is not allowed in ' + value;
            } else if (i == 'weblink' && urlRegex.test(form[val]) == false) {
                message = 'Please enter valid url';
            } else if (i == 'password' && strongPassword.test(form[val]) == false) {
                // let value = (val.charAt(0).toUpperCase() + val.slice(1)).split('_')
                // .join(' ');
                message = value + ' ' + 'must have uppercase,lowercase,special character and number';
            }
            if (message) {
                isValidForm = false;
                form.validators[val].error = message;
            } else {
                form.validators[val].error = '';
            }
        }
    }
    return {
        value: form,
        status: isValidForm
    };
}
