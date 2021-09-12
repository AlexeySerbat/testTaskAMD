import { AccessMethods } from "../support/methods/accessMethods";
import { setAssessRequest, setBase64Token } from "../support/methods/mainMethods";
import { FixtureData } from "../support/helpers/helper";

const fixtureData = new FixtureData();
const accessMethods = new AccessMethods();

describe("Access Tests",() => {

    beforeEach(() => {
        accessMethods.getToken();
    })

    it("Valid token", () => {
        setBase64Token(fixtureData.data.token);
        setAssessRequest(accessMethods.accessRequest());
        accessMethods.verifyAccessValid();
    });

    it("Invalid token", () => {
        setBase64Token(fixtureData.data.emptyString);
        setAssessRequest(accessMethods.accessRequest());
        accessMethods.verifyAccessInvalidToken();
    });
})