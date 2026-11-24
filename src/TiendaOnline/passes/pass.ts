export type Pass = {
  nb_Persona: string;
  nb_Evento: string;
  fh_Evento: string | null;
  nu_PasesAsignados: number;
  nu_PasesConfirmados: number;
  nb_TokenQR: string;
  nu_Folio: string;
  nu_AnioEvento: number;
  fh_Entrada?: string | null;
};

export const passToken = (value: string): string => {
  let token = value.trim();
  if (/^https?:\/\//i.test(token)) {
    try {
      const url = new URL(token);
      // Accept both ordinary URLs and the existing application's HashRouter URLs.
      token =
        url.searchParams.get('qr') ||
        new URLSearchParams(url.hash.split('?')[1] || '').get('qr') ||
        '';
    } catch {
      throw new Error(
        'El QR debe contener un token hexadecimal de 64 caracteres.'
      );
    }
  }
  if (!/^[a-f\d]{64}$/i.test(token))
    throw new Error(
      'El QR debe contener un token hexadecimal de 64 caracteres.'
    );
  return token.toUpperCase();
};

export const eventConfig = (pass: Pass) =>
  pass.nu_AnioEvento === 2027
    ? {
        fecha: pass.fh_Evento
          ? new Intl.DateTimeFormat('es-MX', {
              day: 'numeric',
              timeZone: 'America/Mazatlan',
            }).format(new Date(pass.fh_Evento)) + ' y 23 de enero de 2027'
          : '22 y 23 de enero de 2027',
        lugar: 'Hotel Fiesta Inn en Plaza Isla Tres, Mazatlán, Sinaloa',
        hora: 'Horario por confirmar',
      }
    : {
        fecha: 'Edición 2026',
        lugar: 'Consultar con RCCO',
        hora: 'Consultar con RCCO',
      };

export const ticketLines = (pass: Pass) => {
  const event = eventConfig(pass);
  return [
    pass.nb_Evento,
    pass.nb_Persona,
    event.fecha,
    event.lugar,
    event.hora,
    `Accesos confirmados: ${pass.nu_PasesConfirmados}`,
    `Registro: ${pass.nu_Folio}`,
    `Folio QR: ${pass.nb_TokenQR.slice(-8).toUpperCase()}`,
  ];
};

export async function passPng(pass: Pass, qrDataUrl: string): Promise<Blob> {
  const image = new Image();
  image.src = qrDataUrl;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('El navegador no permite exportar el pase.');
  const wrapped = ticketLines(pass).map((text, index) => {
    ctx.font = index < 2 ? 'bold 44px Georgia' : '30px Arial';
    const lines: string[] = [];
    let line = '';
    // Character wrapping also handles exceptionally long unbroken names.
    for (const character of text) {
      if (ctx.measureText(line + character).width > 912 && line) {
        lines.push(line.trim());
        line = '';
      }
      line += character;
    }
    if (line) lines.push(line.trim());
    return lines;
  });
  canvas.height =
    560 +
    wrapped.reduce(
      (height, lines, index) =>
        height + lines.length * (index < 2 ? 58 : 42) + 22,
      0
    );
  ctx.fillStyle = '#fffaf0';
  ctx.fillRect(0, 0, 1080, canvas.height);
  ctx.fillStyle = '#27413e';
  ctx.fillRect(0, 0, 1080, 32);
  ctx.fillRect(0, canvas.height - 32, 1080, 32);
  ctx.strokeStyle = '#b99a69';
  ctx.lineWidth = 3;
  ctx.strokeRect(32, 48, 1016, canvas.height - 96);
  let y = 110;
  wrapped.forEach((lines, index) => {
    ctx.font = index < 2 ? 'bold 44px Georgia' : '30px Arial';
    ctx.fillStyle = index < 2 ? '#27413e' : '#796e5c';
    for (const line of lines) {
      ctx.fillText(line, 84, y);
      y += index < 2 ? 58 : 42;
    }
    y += 22;
  });
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(32, y + 8);
  ctx.lineTo(1048, y + 8);
  ctx.stroke();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 370, y + 38, 340, 340);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error('No se pudo exportar PNG.')),
      'image/png'
    )
  );
}
