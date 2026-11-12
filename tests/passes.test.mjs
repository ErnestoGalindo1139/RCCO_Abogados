import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import {
  passToken,
  eventConfig,
  ticketLines,
} from '../src/TiendaOnline/passes/pass.ts';

const token = 'AB'.repeat(32);
test('frontend accepts manual tokens, arbitrary HTTP URLs and HashRouter URLs', () => {
  for (const value of [
    ` ${token.toLowerCase()} `,
    `https://another.example/any?qr=${token}`,
    `http://localhost/#/admin?qr=${token}`,
  ])
    assert.equal(passToken(value), token);
  for (const value of [
    '',
    'ABC',
    'G'.repeat(64),
    'A'.repeat(65),
    'https://example.com/',
  ])
    assert.throws(() => passToken(value), /64 caracteres/);
});
test('frontend generates a PNG encoding only the validated token', async () => {
  const content = passToken(token.toLowerCase());
  assert.equal(content, token);
  const data = await QRCode.toDataURL(content, {
    width: 720,
    margin: 4,
    errorCorrectionLevel: 'M',
  });
  assert.match(data, /^data:image\/png;base64,/);
});

test('event configuration uses Mazatlan date and separates event information from pass', () => {
  const pass = {
    nb_Persona: 'Ana Pérez',
    nb_Evento: 'Simposio',
    fh_Evento: '2027-01-22T00:00:00-07:00',
    nu_PasesAsignados: 1,
    nu_PasesConfirmados: 1,
    nb_TokenQR: token,
    nu_Folio: 'SIM27-0001',
    nu_AnioEvento: 2027,
  };
  assert.equal(eventConfig(pass).fecha, '22 y 23 de enero de 2027');
  assert.equal(eventConfig(pass).hora, 'Horario por confirmar');
  assert.ok(ticketLines(pass).includes('Folio QR: ABABABAB'));
  assert.ok(ticketLines(pass).includes('Accesos confirmados: 1'));
});
