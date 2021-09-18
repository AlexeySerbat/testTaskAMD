import {accessToken, smsRequest} from "./mainMethods";
import {FixtureData} from "../helpers/helper";

const fixtureData = new FixtureData()

export class SMSMethods {
    getSmsRequest(message = fixtureData.data.message, phone = fixtureData.data.phone, sender = fixtureData.data.sender){
        return {
            async: true,
            crossDomain: true,
            url: `/sms`,
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                data: {body: message,to : phone,from: sender}
            },
            failOnStatusCode: false
        };
    };
    verifySMSValid() {
        cy.request(smsRequest).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq(fixtureData.data.queuedStatus);
            expect(response.body.from).to.eq(fixtureData.data.message);
            expect(response.body.to).to.eq(fixtureData.data.phone);
            expect(response.body.body).to.eq(fixtureData.data.sender);
        })
    };

    verifySMSWithInvalidBalance() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(fixtureData.data.incorrectBalanceCode);
            expect(response.body.developerMessage).to.eq(fixtureData.data.incorrectBalanceMessage);
        });
    };

    verifySMSWithInvalidToken() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.error).to.eq(fixtureData.data.incorrectTokenMessage);
        });
    };

    verifySMSWithInvalidField() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(fixtureData.data.incorrectFieldCode);
        });
    };

    verifySMSSendInvalidSender() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.code).to.not.eq(fixtureData.data.incorrectSenderCode);
        });
    };
};