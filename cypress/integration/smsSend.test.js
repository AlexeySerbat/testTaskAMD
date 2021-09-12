import {setTokenAccess, setSmsRequest} from "../support/methods/mainMethods";
import {AccessMethods} from "../support/methods/accessMethods";
import {SMSMethods} from "../support/methods/smsMethods";
import {FixtureData} from "../support/helpers/helper";

const fixtureData = new FixtureData();
const sendSMSMethods = new SMSMethods();
const accessMethods = new AccessMethods();

describe("SMS Send", () => {

    beforeEach(() => {
        accessMethods.getToken();
    })

    it("Valid SMS", () => {
        setSmsRequest(sendSMSMethods.getSmsRequest());
        sendSMSMethods.verifySMSValid();
    });

    it("Invalid token", () => {
        setTokenAccess(fixtureData.data.emptyString);
        setSmsRequest(sendSMSMethods.getSmsRequest());
        sendSMSMethods.verifySMSWithInvalidToken();
    })

    it("Insufficient Balance", () => {
        setSmsRequest(sendSMSMethods.getSmsRequest());
        sendSMSMethods.verifySMSWithInvalidBalance();
    })

    it("Invalid messages", () => {
        setSmsRequest(sendSMSMethods.getSmsRequest(fixtureData.data.emptyString));
        sendSMSMethods.verifySMSWithInvalidField();
    })

    it("Invalid phone", () => {
        setSmsRequest(sendSMSMethods.getSmsRequest(fixtureData.data.message,fixtureData.data.emptyString));
        sendSMSMethods.verifySMSWithInvalidField();
    })

    it("Invalid sender", () => {
        setSmsRequest(sendSMSMethods.getSmsRequest(fixtureData.data.message, fixtureData.data.phone, fixtureData.data.incorrectPhone));
        sendSMSMethods.verifySMSSendInvalidSender();
    })
})