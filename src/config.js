export const SqlServerConfig = {
    userName: 'sa',
    password: '****',
    server: '127.0.0.1',
    options: {
        truestedConnection: true,
        port: 1433,
        database: 'PackageTracker',
        instancename: 'SQLEXPRESS'
    }
    // If you're on Windows Azure, you will need this:
    //options: { encrypt: true }
};