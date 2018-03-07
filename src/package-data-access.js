import { MsSqlConnection, MsSqlRequest } from './ms-sql-adapter';
import { SqlServerConfig } from './config';
import { TYPES } from 'tedious';

export class PackageDataAccess {

    constructor() {
        this.connection = new MsSqlConnection(SqlServerConfig);
    }

    insertPackage(packageInfo) {
        return new Promise((resolve, reject) => {
            this.connection.connect().then(conn => {
                let req = new MsSqlRequest('INSERT INTO TrackingInfo VALUES(@PackageNo, @Company, @ShippingAgentCode, @ExternalTrackingNo)', conn)
                    .addParam("PackageNo", TYPES.VarChar, packageInfo.packageNo)
                    .addParam("Company", TYPES.VarChar, packageInfo.company)
                    .addParam("ShippingAgentCode", TYPES.VarChar, packageInfo.shippingAgentCode)
                    .addParam("ExternalTrackingNo", TYPES.VarChar, packageInfo.externalTrackingNo)
                    .onComplete(result => {
                        resolve(result);
                    })
                    .onError(error => {
                        reject(error);
                    })
                    .execute();
            }, error => {
                reject(error);
            })
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.connect().then(conn => {
                let req = new MsSqlRequest('SELECT * FROM TrackingInfo', conn)
                    .onComplete(result => {
                        resolve(result);
                    })
                    .onError(error => {
                        reject(error);
                    })
                    .execute();
            }, error => {
                reject(error);
            })
        })
    }
}