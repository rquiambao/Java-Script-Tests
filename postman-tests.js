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
