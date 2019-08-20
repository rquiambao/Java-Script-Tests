//1. Count words/text from response
var responseObject = pm.response.json();
    var schools = responseObject.entities.schools;
    var edLevelArray = schools.map(x => x.educationLevels);
    var count = (edLevelArray.join("").match(/P/ig) || []).length;
    pm.expect(count).to.be.eql(24)
    console.log(count);

//2. Count Occurrences of string values
var responseObject = pm.response.json();
    var schools = responseObject.entities.schools;
    var edLevelArray = schools.map(x => x.educationLevels);
    var counts = {};
    for (var i = 0; i < edLevelArray.length; i++) {
        if(!counts[edLevelArray[i]])
            counts[edLevelArray[i]] =0;
        ++counts[edLevelArray[i]];
    console.log(counts);

//3. Sorting
var _ = require('lodash');
pm.test('Data is sorted Ascending', () => {
   const responseObject = pm.response.json();
   const expectedSortedOrder = _.orderBy(responseObject.data, ['displayName'], ['asc']);
   pm.expect(responseObject.data).to.eql(expectedSortedOrder);
});

//4. Generate authentication/authorization using hmac512 and base64 encoding
//To get and format date
const moment = require('moment');

//Provide API users SecretKey
const secretkey = pm.environment.get("secretkey");

//Construct cononical_string
var method = request.method;
const apiCall = '/listings';
var requestBody = CryptoJS.MD5('');
var date = moment().format("MMDDYYYY");
var requestString = method.concat('',apiCall,requestBody,date);

//Generate Signature
var hmacHexString = CryptoJS.HmacSHA512(requestString, secretkey);
var buff = new Buffer(hmacHexString.toString());
var signatureKey = buff.toString('base64');
console.log('hmac = '+ hmacHexString);
console.log('signatureKey = '+ signatureKey);

//Set signatureKey in Params
pm.environment.set("signatureKey", signatureKey);

//5. Checking for property value with key notation if property is with hyphens
pm.test("Customer Reputation Product is REPSOCCR3", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData['customer-reputation-product']).to.be.eql('REPSOCCR3');

//6. Checking for properties if response is in array
pm.test("Address and contact details present", function () {
    var jsonData = pm.response.json();
    var arrayResp = jsonData[0];

    //Property details will at least have these fields
    pm.expect(arrayResp.hasOwnProperty('product-id')).to.be.true;
    pm.expect(arrayResp.hasOwnProperty('description')).to.be.true;
    pm.expect(arrayResp.hasOwnProperty('start-date')).to.be.true;

//7. If JSON Object response is random, assign object to a variable.
var jsonResponse = pm.response.json();
dateSlot = pm.globals.get("availDate");
var availDate2 = jsonResponse[dateSlot];
var timeslot = availDate2[0];
pm.globals.set("timeslot", timeslot);

//8. Access nested json object key/values
pm.test("Required Fields are missing", function () {
    var jsonData = pm.response.json()
    var errorMessage = jsonData.errors;
    pm.expect(errorMessage.length).to.be.gt(0);

    var errorReason = errorMessage[3];
    pm.expect(errorReason.hasOwnProperty('name')).to.be.true;
    pm.expect(errorReason.hasOwnProperty('reason')).to.be.true;

    var message = errorReason.reason
    pm.expect(message).to.be.eql("can't be blank")
});

e.g.
{
    "errors": [
        {
            "name": "firstName",
            "reason": "can't be blank"
        },
        {
            "name": "lastName",
            "reason": "can't be blank"
        },
        {
            "name": "moveInDate",
            "reason": "can't be blank"
        },
        {
            "name": "preferredMethod",
            "reason": "can't be blank"
        },
        {
            "name": "timeslot",
            "reason": "is invalid"
        }
    ]
}