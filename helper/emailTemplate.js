function emailTemplate(ticketStatus, woStatus, company, trouble, client, sender) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #3498db;
                color: white;
                text-align: center;
                padding: 20px;
                border-bottom: 2px solid #2980b9;
            }
            .content {
                padding: 20px;
            }
            .info-item {
                margin-bottom: 20px;
            }
            .info-label {
                font-weight: bold;
                display: block;
                margin-bottom: 5px;
                color: #333;
            }
            .info-value {
                font-size: 18px;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h2>Status Change Information</h2>
            </div>
            <div class="content">
                <div >
                    <h3>
                        A work order and ticket was updated by ${sender || 'someone'}
                    </h3>
                </div>
                <div class="info-item">
                    <span class="info-label">Ticket Status:</span>
                    <span class="info-value">${ticketStatus}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Work Order Status:</span>
                    <span class="info-value">${woStatus}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Company:</span>
                    <span class="info-value">${company}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Trouble:</span>
                    <span class="info-value">${trouble}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Client:</span>
                    <span class="info-value">${client}</span>
                </div>
            </div>
        </div>
    </body>
    </html>    
    `
}

module.exports = emailTemplate