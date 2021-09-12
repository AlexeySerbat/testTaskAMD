import {assessRequest, base64Token, setTokenAccess, setBase64Token} from "./mainMethods";
import {FixtureData} from "../helpers/helper";

const fixtureData = new FixtureData();

export class AccessMethods {
    accessRequest() {
        return {
            async: true,
            crossDomain: true,
            url: "https://auth.routee.net/oauth/token",
            method: "POST",
            headers: {
                authorization: `Basic ${base64Token}`,
                "content-type": "application/x-www-form-urlencoded"
            },
            body: {
                grant_type: "client_credentials"
            },
            failOnStatusCode: false
        };
    };
    getToken()  {
        setBase64Token(fixtureData.data.token);
        const tokenRequest = this.accessRequest();
        cy.request(tokenRequest).then((response) => {
            setTokenAccess(response.body.access_token);
        });
    };
    verifyAccessValid() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property(fixtureData.data.tokenAccessMessage)
            expect(response.body.token_type).to.eq(fixtureData.data.tokenType)
        });
    };
    verifyAccessInvalidToken() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.error).to.eq(fixtureData.data.incorrectBase64TokenError)
            expect(response.body.message).to.eq(fixtureData.data.incorrectBase64TokenMessage)
        });
    };
};