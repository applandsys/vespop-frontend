import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { imageToBase64 } from "./imageToBase64";

export const generateInvoicePdf = async (order, company) => {
    const doc = new jsPDF("p", "mm", "a4");

    const BRAND_COLOR = [34, 197, 94];
    const MARGIN_X = 14;

    /* ================= LOGO ================= */
    if (company?.logo) {
        const logoBase64 = await imageToBase64(company.logo);
        doc.addImage(logoBase64, "PNG", MARGIN_X, 15, 40, 18);
    }

    /* ================= COMPANY INFO ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(company.site_name || "", 200, 20, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(company.address || "", 200, 26, { align: "right" });
    doc.text(`Phone: ${company.phone}`, 200, 31, { align: "right" });
    doc.text(`Email: ${company.email}`, 200, 36, { align: "right" });

    /* ================= INVOICE META ================= */
    doc.setDrawColor(...BRAND_COLOR);
    doc.line(MARGIN_X, 45, 200, 45);

    doc.setFontSize(18);
    doc.text("INVOICE", MARGIN_X, 58);

    doc.setFontSize(10);
    doc.text(`Invoice #: ${order.id}`, MARGIN_X, 66);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, MARGIN_X, 72);
    doc.text(`Status: ${order.status}`, MARGIN_X, 78);

    /* ================= BILLING & SHIPPING ================= */
    const startY = 88;

    doc.setFont("helvetica", "bold");
    doc.text("Billing Address", MARGIN_X, startY);
    doc.text("Shipping Address", 110, startY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const drawAddress = (addr, x, y) => {
        if (!addr) {
            doc.text("N/A", x, y);
            return;
        }

        let line = y;
        addr.name && doc.text(addr.name, x, line += 5);
        addr.phone && doc.text(`Phone: ${addr.phone}`, x, line += 5);
        addr.address && doc.text(addr.address, x, line += 5);
        addr.city && doc.text(addr.city, x, line += 5);
        addr.country && doc.text(addr.country, x, line += 5);
    };

    drawAddress(order.billingAddress, MARGIN_X, startY);
    drawAddress(order.shippingAddress, 110, startY);

    /* ================= ITEMS TABLE ================= */
    const tableY = startY + 35;

    const tableBody = order.orderItems.map((item, i) => [
        i + 1,
        item.product?.name,
        item.quantity,
        `৳${item.price.toFixed(2)}`,
        `৳${(item.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
        startY: tableY,
        head: [["#", "Product", "Qty", "Unit Price", "Total"]],
        body: tableBody,
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: BRAND_COLOR, textColor: 255 },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: "auto" },
                2: { cellWidth: 18, halign: "right" },

                // Unit Price → moved left
                3: {
                    cellWidth: 34,
                    halign: "right",
                    cellPadding: { right: 15, top: 2 }
                },

                // Total → moved left
                4: {
                    cellWidth: 34,
                    halign: "right",
                    cellPadding: { right: 15, top: 2 }
                },
            },
        margin: { left: MARGIN_X, right: MARGIN_X },
    });

    /* ================= TOTALS ================= */
    const subTotal = order.orderItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    const discount = order.discount || 0;
    const VAT_PERCENT = 5;
    const vat = ((subTotal - discount) * VAT_PERCENT) / 100;
    const grandTotal = subTotal - discount + vat;

    let y = doc.lastAutoTable.finalY + 10;

    const row = (label, val, bold = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.text(label, 140, y);
        doc.text(`৳${val.toFixed(2)}`, 185, y, { align: "right" });
        y += 6;
    };

    row("Subtotal", subTotal);
    if (discount > 0) row("Discount", -discount);
    row(`VAT (${VAT_PERCENT}%)`, vat);
    row("Grand Total", grandTotal, true);

    /* ================= FOOTER ================= */
    doc.setDrawColor(220);
    doc.line(MARGIN_X, 270, 200, 270);

    doc.setFontSize(9);
    doc.text(`Thank you for shopping with ${company.site_name}`, MARGIN_X, 278);
    doc.text(
        `${company.phone} | ${company.email} | ${company.whatsapp}`,
        200,
        278,
        { align: "right" }
    );

    doc.save(`invoice-${order.id}.pdf`);
};