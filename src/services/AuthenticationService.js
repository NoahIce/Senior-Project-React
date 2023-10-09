const AuthenticationService = {
    isLoggedIn: function() {
        try {
            // eslint-disable-next-line no-undef
            if (gapi.client.getToken() === null) {
                return false
            }
            else return true
        }
        catch (e) {
            return false
        }
    },

    secondValidationMethod: function(value) {
        //inspect the value
    }
};

export default AuthenticationService;