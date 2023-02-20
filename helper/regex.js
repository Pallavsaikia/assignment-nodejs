

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone) => {
    return phone.match(
        /^[7-9][0-9]{9}$/
    );
};

const validateGender = (gender) => {
    return gender.toLowerCase() ==='male' || gender.toLowerCase() ==='female' || gender.toLowerCase() ==='others'
};

module.exports = { validateEmail, validatePhone, validateGender }