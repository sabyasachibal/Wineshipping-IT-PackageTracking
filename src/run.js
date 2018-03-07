
import { PackageDataAccess } from './package-data-access';

let packageDataAccess = new PackageDataAccess();

let pkg = {
    packageNo: "PKG005",
    company: "Company ABC",
    shippingAgentCode: "DHL",
    externalTrackingNo: "587569",
}

packageDataAccess.insertPackage(pkg).then(d => {
    console.log(d);
}, e => {
    console.log(e);
})

packageDataAccess.getAll().then(d => {
    console.log(d);
}, e => {
    console.log(e);
});