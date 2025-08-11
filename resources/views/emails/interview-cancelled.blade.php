<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Cancelled</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #dc2626;
        }
        .logo {
            color: #00193f;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .title {
            color: #dc2626;
            font-size: 20px;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
        }
        .interview-details {
            background-color: #fef2f2;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #dc2626;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #fee2e2;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #991b1b;
        }
        .value {
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
        }
        .highlight {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .company-info {
            background-color: #e3f2fd;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .cancellation-notice {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .cancellation-notice h3 {
            color: #dc2626;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">HireLink</div>
            <div class="title">Interview Cancelled</div>
            <div class="subtitle">Your interview has been cancelled</div>
        </div>

        <p>Dear <strong>{{ $candidate->name }}</strong>,</p>

        <div class="cancellation-notice">
            <h3>⚠️ Interview Cancellation Notice</h3>
            <p>We regret to inform you that your scheduled interview has been cancelled.</p>
        </div>

        <p>Please review the details of the cancelled interview below:</p>

        <div class="interview-details">
            <div class="detail-row">
                <span class="label">Interview Title:</span>
                <span class="value">{{ $interview->title }}</span>
            </div>
            <div class="detail-row">
                <span class="label">Scheduled Date & Time:</span>
                <span class="value">{{ $interview->scheduled_at->format('l, F j, Y \a\t g:i A') }}</span>
            </div>
            <div class="detail-row">
                <span class="label">Duration:</span>
                <span class="value">{{ $interview->duration }} minutes</span>
            </div>
            <div class="detail-row">
                <span class="label">Type:</span>
                <span class="value">{{ ucfirst($interview->type) }}</span>
            </div>
            @if($interview->type === 'in-person' && $interview->location)
            <div class="detail-row">
                <span class="label">Location:</span>
                <span class="value">{{ $interview->location }}</span>
            </div>
            @endif
            @if($interview->type === 'online' && $interview->meeting_link)
            <div class="detail-row">
                <span class="label">Meeting Link:</span>
                <span class="value">{{ $interview->meeting_link }}</span>
            </div>
            @endif
        </div>

        <div class="company-info">
            <h3 style="margin-top: 0; color: #00193f;">Job Details</h3>
            <div class="detail-row">
                <span class="label">Position:</span>
                <span class="value">{{ $job->title }}</span>
            </div>
            <div class="detail-row">
                <span class="label">Company:</span>
                <span class="value">{{ $job->company_name }}</span>
            </div>
            <div class="detail-row">
                <span class="label">Recruiter:</span>
                <span class="value">{{ $recruiter->name }}</span>
            </div>
        </div>

        @if($interview->description)
        <div class="highlight">
            <h4 style="margin-top: 0; color: #00193f;">Interview Description</h4>
            <p>{{ $interview->description }}</p>
        </div>
        @endif

        @if($interview->notes)
        <div class="highlight">
            <h4 style="margin-top: 0; color: #00193f;">Additional Notes</h4>
            <p>{{ $interview->notes }}</p>
        </div>
        @endif

        <div class="highlight">
            <h4 style="margin-top: 0; color: #00193f;">What This Means</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Your interview has been cancelled and will not take place as scheduled</li>
                <li>You may be contacted for rescheduling at a later date</li>
                <li>Your application is still under consideration</li>
                <li>You will be notified if a new interview is scheduled</li>
            </ul>
        </div>

        <p>If you have any questions about this cancellation or would like to discuss rescheduling, please don't hesitate to contact us.</p>

        <p>We apologize for any inconvenience this may have caused.</p>

        <p>Best regards,<br>
        <strong>The HireLink Team</strong></p>

        <div class="footer">
            <p>This email was sent from HireLink - Your trusted recruitment platform</p>
            <p>© {{ date('Y') }} HireLink. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
