<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Scheduled</title>
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
            border-bottom: 2px solid #00193f;
        }
        .logo {
            color: #00193f;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .title {
            color: #202b61;
            font-size: 20px;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
        }
        .interview-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #00193f;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #00193f;
        }
        .value {
            color: #333;
        }
        .meeting-link {
            background-color: #00193f;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
            font-weight: 600;
        }
        .meeting-link:hover {
            background-color: #202b61;
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
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">HireLink</div>
            <div class="title">Interview Scheduled</div>
            <div class="subtitle">Your interview has been successfully scheduled</div>
        </div>

        <p>Dear <strong>{{ $candidate->name }}</strong>,</p>

        <p>Great news! Your interview has been scheduled. Please review the details below:</p>

        <div class="interview-details">
            <div class="detail-row">
                <span class="label">Interview Title:</span>
                <span class="value">{{ $interview->title }}</span>
            </div>
            <div class="detail-row">
                <span class="label">Date & Time:</span>
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
                <span class="value">
                    <a href="{{ $interview->meeting_link }}" class="meeting-link">Join Meeting</a>
                </span>
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
            <h4 style="margin-top: 0; color: #00193f;">Important Reminders</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Please arrive 5-10 minutes early for your interview</li>
                <li>Have your resume and portfolio ready</li>
                <li>Test your equipment if it's an online interview</li>
                <li>Prepare questions to ask about the role and company</li>
            </ul>
        </div>

        <p>If you need to reschedule or have any questions, please contact us as soon as possible.</p>

        <p>Good luck with your interview!</p>

        <p>Best regards,<br>
        <strong>The HireLink Team</strong></p>

        <div class="footer">
            <p>This email was sent from HireLink - Your trusted recruitment platform</p>
            <p>© {{ date('Y') }} HireLink. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
