// utils/generatePDF.js
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (data) => {
    const documentDefinition = {
        pageOrientation: 'landscape',  // Set the page orientation to landscape
        content: [
            {
                text: 'Université des Sciences et de la Technologie Houari Boumediene\nVice Rectorat chargé de la Scolarité et de la pédagogie\nEmplois du temps de la 2ème année ING.INFO.2 Section A\nAnnée Universitaire: 2023/2024 Semestre: 2 Date: 09/02/24\n',
                style: 'header'
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [70, '*', '*', '*', '*', '*', '*'],
                    body: [
                        [{ text: 'Time', style: 'tableHeader' }, { text: 'Saturday', style: 'tableHeader' }, { text: 'Sunday', style: 'tableHeader' }, { text: 'Monday', style: 'tableHeader' }, { text: 'Tuesday', style: 'tableHeader' }, { text: 'Wednesday', style: 'tableHeader' }, { text: 'Thursday', style: 'tableHeader' }],
                        ['08:00 - 09:30', '', 'G1:TD (457) TH Graph, abdelli\nG2:TD (455) Intro BD, BERGHOUT\nG3:TD (451) TH Lang', 'Intro Syst Info\ncours(R2)\nBENALI', 'G1:TP (TP128) POO2, MEKAHLIA\nG2:TD (261) TH Graph, BENKAOUHA', 'G2:TD (462) TH Lang, BELHADI\nG3:TD (TP.C9) Intro Syst Info, BENALI', ''],
                        ['09:40 - 11:10', '', 'G1:TD (457) Intro BD, BERGHOUT\nG2:TD (455) Intro Réseau\nG3:TD (453) TH Lang\nG4:TD (453) TH Lang', 'TH Lang\nBELHADI', 'G2:TP (TP128) POO2, MEKAHLIA\nG3:TD (267) TH Graph, BENKAOUHA', 'G3:TD (124) Intro Réseau\nG4:TD (122) Intro Syst Info, BENALI', ''],
                        ['11:20 - 12:50', '', '', 'TH Lang\nBELHADI', 'Intro Réseau\ncours(I)\nMEKAHLIA', 'G4:TP (TP128) POO2, MEKAHLIA', 'G1:TD (437) Intro Réseau'],
                        ['13:00 - 14:30', '', 'TH Graph\ncours(P)\nBENKAOUHA', 'Intro Réseau\ncours(P)\nBENKAOUHA', '', 'POO2\ncours(I)\nMEKAHLIA', 'Intro BD\ncours(C)\nBERGHOUT'],
                        ['14:40 - 16:10', '', '', '', 'Intro BD\ncours(C)\nBERGHOUT', '', ''],
                        ['16:20 - 17:50', '', '', '', '', '', '']
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 12,
                alignment: 'center',
                margin: [0, 10, 0, 5]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black'
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableCell: {
                margin: [0, 5, 0, 5]
            }
        }
    };

    pdfMake.createPdf(documentDefinition).download('Timetable.pdf');
};

export default generatePDF;
