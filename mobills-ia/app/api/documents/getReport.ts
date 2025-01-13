import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const reportUrl = 'http://localhost/ReportServer?/public/MCOM7F&rs:Format=PDF'

  try {
    const response = await fetch(reportUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
        // Adicione cabeçalhos de autenticação, se necessário:
        // 'Authorization': 'Basic ' + Buffer.from('usuario:senha').toString('base64'),
      },
    })

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Erro ao obter o relatório' })
    }

    const pdfBuffer = await response.arrayBuffer()
    res.setHeader('Content-Type', 'application/pdf')
    res.send(Buffer.from(pdfBuffer))
  } catch (error) {
    console.error('Erro ao obter o relatório:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
