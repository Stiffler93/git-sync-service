const info = require('./logger').info;
const debug = require('./logger').debug;
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

function prepare(config) {
    info('Prepare Data from Excel');
    if (!fs.existsSync(config.DataSource)) quitProcess(config);

    config.proceed(7);

    const files = fs.readdirSync(config.DataSource);

    if (files.length === 0) quitProcess(config);

    for (const file of files) {
        if (!file.endsWith('.xlsx')) continue;

        const fromPath = path.join(config.DataSource, file);
        const fileNameMappings = config.CSV.fileNameMappings;
        const newFileName = fileNameMappings[file] ? fileNameMappings[file] : file.replace('.xlsx', '.csv');
        const toPath = path.join(config.DataSource, newFileName);

        const content = parse(fromPath, config);
        fs.writeFileSync(toPath, content);
    }

    config.proceed(11);

    info('Data successfully prepared.');
}

function quitProcess(config) {
    info('There is no data (XLSX) to update. Terminate Script.');
    config.finish();
    process.exit(1);
}

function parse(file, config) {
    info('Process ' + file);
    const parsedFile = xlsx.parse(file);
    debug(JSON.stringify(parsedFile));

    const csvData = parsedFile[0]['data'];
    const values = config.CSV.values;
    const indices = [];

    values.forEach(value => {
        const index = csvData[0].indexOf(value);
        if (index >= 0) indices.push(index);
    });

    let content = '';
    csvData.forEach(row => {
        content += (row.filter((value, index) => indices.includes(index))
            .map(value => prepareValue(value)).join(',') + '\n');
    });

    info('Content: >' + content + '<');

    return content;
}

function prepareValue(str) {
    if (typeof str !== 'string')
        return str;

    return '"' + str.trim().split(/\s+/).join(' ') + '"';
}


module.exports.prepare = prepare;