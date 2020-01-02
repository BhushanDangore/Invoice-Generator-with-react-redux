const PDFDocument = require("pdfkit");
const fs = require('fs');
function createInvoice(invoice, stream) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc, invoice);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc, invoice);
    doc.end();
    doc.pipe(stream);
}

const footerPosition = 780;
function generateHeader(doc, invoice) {
    doc
        // .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(21)
        .text(invoice.retailer.name, 50, 50, { align: "center" })
        .fontSize(12)
        .text(invoice.retailer.addressLine1, 50, 80, { align: "center" })
        .text(invoice.retailer.addressLine2, 50, 95, { align: "center" })
        .text(invoice.retailer.contact, 50, 110, { align: "center" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(21)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(11)
        .font("Helvetica-Bold")

        .text(invoice.nameOfCustomer, 50, customerInformationTop)
        .font("Helvetica")
        .text(
            invoice.customer.address + ", " +
            invoice.customer.city + ", " +
            invoice.customer.state + ", " +
            invoice.customer.country,
            {
                height: customerInformationTop ,
                lineGap: 4,
                width: 250, 
            },
        )

        .text("Invoice Number:", 350, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoice_nr, 450, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 350, customerInformationTop + 18)
        .text(formatDate(invoice.date), 450, customerInformationTop + 18)
        .text("Payable:", 350, customerInformationTop + 18 * 2)
        .text(
            formatCurrency(invoice.total, invoice.currency),
            450,
            customerInformationTop + 18 * 2
        )

        .moveDown();

    generateHr(doc, 268);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 290;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            formatCurrency(item.cost, invoice.currency),
            item.quantity,
            formatCurrency(item.total, invoice.currency)
        );

        generateHr(doc, position + 20);
    }

    let subtotalPosition = invoiceTableTop + (i + 1) * 30;

    invoice.tax.forEach(tax => {
        generateTableRow(
            doc,
            subtotalPosition,
            "",
            tax.taxName,
            tax.taxValue + "%",
            formatCurrency(tax.totalTax, invoice.currency)
        );
        subtotalPosition = subtotalPosition + 30;
    })

    const paidToDatePosition = subtotalPosition;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "Round Off",
        "",
        formatCurrency(invoice.roundOff, invoice.currency)
    );

    const totalPosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        totalPosition,
        "",
        "Total",
        "",
        formatCurrency(invoice.total, invoice.currency)
    );
    doc.font("Helvetica");

    generateHr(doc, totalPosition + 30);
}

function generateFooter(doc, invoice) {

    if(invoice.retailer.accDetails){
        doc
        .fontSize(15)
        .fillColor("#444444")
        .text(
            "Account Details",
            50,
            footerPosition - 200
        )
        .fontSize(11)
        .text(
            "Account Number:",
            100,
            footerPosition - 15 * 11
        )
        .text(
            invoice.retailer.accDetails.accNo,
            200,
            footerPosition - 15 * 11
        )
        .text(
            "Bank Name:",
            100,
            footerPosition - 15 * 10
        )
        .text(
            invoice.retailer.accDetails.bankName,
            200,
            footerPosition - 15 * 10
        )
        .text(
            invoice.retailer.accDetails.bankCodeName,
            100,
            footerPosition - 15 * 9
        )
        .text(
            invoice.retailer.accDetails.bankCode,
            200,
            footerPosition  - 15 * 9
        )
    }
    doc
        .text(
            invoice.retailer.name,
            50,
            footerPosition - 75,
            { align: "right" }
        )
        .text(
            "Authorised Signatory",
            50,
            footerPosition - 20,
            { align: "right" }
        )
        .fontSize(10)
        .text(
            "Thank you for your business.",
            50,
            footerPosition,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(unitCost, 305, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents, currency) {
    return currency + cents;
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day + " /" + month + " /" + year;
}

module.exports = {
    createInvoice
};
