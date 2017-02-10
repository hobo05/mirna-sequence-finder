var Excel = require('exceljs');
var MicroRNASequenceInfo = require("./MicroRNASequenceInfo");

// read from a file
function readExcel(filename) {
	let workbook = new Excel.Workbook();
	return workbook.xlsx.readFile(filename)
	    .then(function() {
	        
	        // Take the first worksheet and gather all the micro RNA sequences
	        let sequenceInfoArray = [];
			let worksheet = workbook.getWorksheet(1);
			worksheet.eachRow((row, rowNumber) => {
				let miRNANameCell = row.getCell(1);
				// console.log(`miRNANameCell.value=${miRNANameCell.value}`);

				// If the value is null or the value doesn't start with mir, then skip this row
				if (miRNANameCell.value === null || !miRNANameCell.value.match(/^mir/i)) {
					return;
				}
				// console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));

				// Create new sequence and add it to the array
				let id = row.getCell(2).value;
				let sequence = row.getCell(3).value;
				sequenceInfoArray.push(new MicroRNASequenceInfo(id, miRNANameCell.value, sequence));

			});

			return sequenceInfoArray;
	    });
}

module.exports = readExcel;