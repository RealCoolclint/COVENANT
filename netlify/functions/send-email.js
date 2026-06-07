const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const body = JSON.parse(event.body || '{}');
    const { pdfBase64, filename, interviewe, format, date, journaliste, statut } = body;

    if (!pdfBase64 || !filename) {
      throw new Error('pdfBase64 and filename are required');
    }

    const statutLabel = statut === 'mineur' ? 'Mineur' : 'Majeur';
    const subject = 'COVENANT — ' + format + ' — ' + interviewe + ' — ' + date;

    const html = `
      <h2>Autorisation COVENANT</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Statut</strong></td><td>${statutLabel}</td></tr>
        <tr><td><strong>Interviewé</strong></td><td>${interviewe || ''}</td></tr>
        <tr><td><strong>Format</strong></td><td>${format || ''}</td></tr>
        <tr><td><strong>Date</strong></td><td>${date || ''}</td></tr>
        <tr><td><strong>Journaliste</strong></td><td>${journaliste || ''}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['mpavloff@letudiant.fr'],
        subject,
        html,
        attachments: [
          {
            filename,
            content: pdfBase64
          }
        ]
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(errBody || 'Resend API error');
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message || 'Unknown error' })
    };
  }
};
