import { Connection, Request, TYPES } from 'tedious';

export class MsSqlConnection {
    constructor(config) {
        this.config = config;
    }
    connect() {
        return new Promise((resolve, reject) => {
            let conn = new Connection(this.config);
            conn.on('connect', err => {
                err ? reject(err) : resolve(conn);
            });
        });
    }
}

export class MsSqlRequest {
    constructor(sql, connection) {
        this.connection = connection;
        this.sql = sql;
        this.params = [];
        this.result = [];
        this.onCompleteHandler = null;
        this.onErrorHandler = null;
    }

    addParam(key, type, value) {
        this.params.push({ key: key, type: type, value: value });
        return this;
    }

    onComplete(func) {
        this.onCompleteHandler = func;
        return this;
    }

    onError(func) {
        this.onErrorHandler = func;
        return this;
    }

    execute() {
        let request = new Request(this.sql, (err, rowCount, rows) => {
            err ? this.onErrorHandler(err) : this.onCompleteHandler({ rowCount, data: this.result });
        });

        this.params.forEach(p => {
            request.addParameter(p.key, p.type, p.value);
        })

        request.on('row', columns => {
            let item = {};
            columns.forEach(column => {
                item[column.metadata.colName] = column.value;
            });
            this.result.push(item);
        });

        this.connection.execSql(request);
        return request;
    }
}