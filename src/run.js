
import { PackageDataAccess } from './package-data-access';

let packageDataAccess = new PackageDataAccess();

let dummyData = [];

for (let i = 1; i <= 1000; i++) {
    dummyData.push(
        {
            packageNo: "PKG" + i,
            company: "Company ABC " + i,
            shippingAgentCode: "DHL " + i,
            externalTrackingNo: "TRK " + i,
        }
    );
}

packageDataAccess.insertPackage(dummyData[0]).then(d => {
    console.log(d);
}, e => {
    console.log(e);
})

packageDataAccess.insertPackages(dummyData).then(d => {
    console.log(d);
}, e => {
    console.log(e);
})

packageDataAccess.getAll().then(d => {
    console.log(d);
}, e => {
    console.log(e);
});
