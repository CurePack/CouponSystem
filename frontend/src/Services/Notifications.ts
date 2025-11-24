import { Notyf } from 'notyf'

export enum SccMsg {
    ADDED_COMPANY = 'Added company successfully',
    ADDED_CUSTOMER = 'Added customer successfully',
    ADDED_COUPON = 'Added coupon successfully',

    UPDATED_COMPANY = 'Updated company successfully',
    UPDATED_CUSTOMER = 'Updated customer successfully',
    UPDATED_COUPON = 'Updated coupon successfully',
    
    DELETED_COMPANY = 'Deleted company successfully',
    DELETED_CUSTOMER = 'Deleted customer successfully',
    DELETED_COUPON = 'Deleted coupon successfully',

    GOT_COMPANIES = 'Got companies successfully',
    GOT_CUSTOMERS = 'Got customers successfully',
    GOT_COUPONS = 'Got coupons successfully',

    GOT_SINGLE_COMPANY = 'Got a company successfully',
    GOT_SINGLE_CUSTOMER = 'Got a customer successfully',
    GOT_SINGLE_COUPON = 'Got a coupon successfully',

    REGISTER_SUCCESS = 'Registered successfully',
    LOGIN_SUCCESS = 'Logged in successfully',
    LOGOUT_SUCCESS = 'Logged out successfully',
    PURCHASE_SUCCESS = 'Purchased a coupon successfully'

}
export enum ErrMsg {
    PLS_LOGIN = 'Please login first.'
}
class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });
    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any): string {

        if (typeof err?.response?.data?.description === 'string') { // Coupons App exact error with desc
            return err?.response?.data?.description;
        }

        if (typeof err?.response?.data === 'string') { //Backend exact error
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact error list
            return err?.response?.data[0];
        }

        // Must be last
        if (typeof err?.message === 'string') {
            return err.message;
        }


        return "Miaouuuu, an error occurred, please try again.";


    }
}
const notify = new Notify();
export default notify;