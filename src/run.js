import { MsSqlConnection, MsSqlRequest } from './ms-sql-adapter';
import { SqlServerConfig } from './config';
import { TYPES } from 'tedious';

let connection = new MsSqlConnection(SqlServerConfig);

connection.connect().then(conn => {
    let req = new MsSqlRequest('SELECT * FROM TrackingInfo', conn)
        .onComplete((result, rowCount) => {
            console.log(result);
        })
        .onError(e => {
            console.log(e);
        })
        .execute();
}, err => {
    console.log(err);
})


connection.connect().then(conn => {
    let req = new MsSqlRequest('INSERT INTO TrackingInfo VALUES(@PackageNo, @Company, @ShippingAgentCode, @ExternalTrackingNo)', conn)
        .addParam("PackageNo", TYPES.VarChar, "PKG005")
        .addParam("Company", TYPES.VarChar, "Company ABC")
        .addParam("ShippingAgentCode", TYPES.VarChar, "DHL")
        .addParam("ExternalTrackingNo", TYPES.VarChar, "587569")
        .onComplete((result) => {
            console.log(result);
        })
        .onError(e => {
            console.log(e);
        })
        .execute();
}, err => {
    console.log(err);
})