const emailApiKey = process.env.EMAIL_API_KEY

type EmailMessage = {
  to: string
  from: string
  subject: string
  text?: string
  html?: string | null
  template?: {
    data: {
      signInURL: string
    }
    id: string
  }
}

async function sendEmail({to, from, subject, template}: EmailMessage) {
  const body = JSON.stringify({
    ...(template ? {template_id: template.id} : {}),
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
        subject,
        ...(template ? {dynamic_template_data: template.data} : {}),
      },
    ],
    from: {
      email: from,
      name: 'Pimpon App',
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
