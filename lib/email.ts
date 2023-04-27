const emailApiKey = process.env.EMAIL_API_KEY

type EmailMessage = {
  to: string
  from: string
  subject: string
  text: string
  html?: string | null
}

async function sendEmail({to, from, subject, text, html}: EmailMessage) {
  html = text

  const body = JSON.stringify({
    personalizations: [
      {
        to: [
          {
            email: to,
            // name: 'John Doe',
          },
        ],
        subject,
      },
    ],
    content: [
      {
        type: 'text/plain',
        value: text,
      },
    ],
    from: {
      email: from,
      name: 'PinPon',
    },
  })

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'post',
    body,
    headers: {
      Authorization: `Bearer ${emailApiKey}`,
      'Content-Type': 'application/json',
    },
  })
}

export {sendEmail}
